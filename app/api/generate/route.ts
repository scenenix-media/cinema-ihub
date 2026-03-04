import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// Sample cinematic stock videos (free to use)
const SAMPLE_VIDEOS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
]

export async function POST(request: Request) {
  try {
    // 1. Authenticate user
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // 3. Parse request body
    const body = await request.json()
    const { prompt, style, camera, aspectRatio, duration, engine } = body

    // 4. Validate prompt
    if (!prompt || prompt.trim().length < 10) {
      return NextResponse.json(
        { error: 'Prompt must be at least 10 characters' },
        { status: 400 }
      )
    }

    // 5. Calculate credit cost (2 credits per 5 seconds)
    const creditCost = Math.max(2, Math.ceil((duration || 8) / 5) * 2)

    // 6. Check credits
    if (user.credits < creditCost) {
      return NextResponse.json(
        { 
          error: 'Insufficient credits',
          required: creditCost,
          available: user.credits
        },
        { status: 402 }
      )
    }

    // 7. Create generation record
    const generation = await prisma.generation.create({
      data: {
        prompt,
        engine: engine || 'runway',
        style: style || 'Cinematic',
        aspectRatio: aspectRatio || '16:9',
        duration: duration || 8,
        resolution: user.plan === 'free' ? '720p' : user.plan === 'studio' ? '1080p' : '4K',
        status: 'processing',
        credits: creditCost,
        userId: user.id,
        engineJobId: `mock_${Date.now()}`, // Mock task ID
      }
    })

    // 8. Deduct credits
    await prisma.user.update({
      where: { id: user.id },
      data: { credits: { decrement: creditCost } }
    })

    console.log(`✅ Mock generation ${generation.id} started for ${user.email}`)
    console.log(`   Prompt: ${prompt}`)
    console.log(`   Credits used: ${creditCost} | Remaining: ${user.credits - creditCost}`)

    // 9. Simulate AI processing in background
    // In a real app, this would be a queue job. For mock, we use setTimeout
    setTimeout(async () => {
      try {
        // Pick a random sample video
        const sampleVideo = SAMPLE_VIDEOS[Math.floor(Math.random() * SAMPLE_VIDEOS.length)]
        
        await prisma.generation.update({
          where: { id: generation.id },
          data: {
            status: 'complete',
            videoUrl: sampleVideo
          }
        })
        
        console.log(`✅ Mock generation ${generation.id} completed`)
      } catch (error) {
        console.error(`❌ Mock generation ${generation.id} failed:`, error)
        await prisma.generation.update({
          where: { id: generation.id },
          data: {
            status: 'failed',
            errorMessage: 'Mock generation error'
          }
        })
      }
    }, 30000 + Math.random() * 20000) // Complete after 30-50 seconds (realistic timing)

    return NextResponse.json({
      success: true,
      generationId: generation.id,
      creditsUsed: creditCost,
      creditsRemaining: user.credits - creditCost,
      estimatedTime: '30-50 seconds',
      message: '🎬 Generation started (mock mode - using sample video)'
    })

  } catch (error) {
    console.error('❌ Generation API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}