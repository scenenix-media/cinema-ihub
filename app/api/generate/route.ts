// app/api/generate/route.ts

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getEngine, VideoEngine } from '@/lib/video-engines'

export async function POST(request: Request) {
  try {
    // 1. Auth
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // 3. Parse request
    const body = await request.json()
    const { prompt, style, aspectRatio, duration, engine } = body

    // 4. Validate prompt
    if (!prompt || prompt.trim().length < 10) {
      return NextResponse.json(
        { error: 'Prompt must be at least 10 characters' },
        { status: 400 }
      )
    }

    // 5. Determine engine (default to first available in user's plan)
    const selectedEngine: VideoEngine = engine || user.engines[0] || 'pika'
    
    // 6. Check user has access to this engine
    if (!user.engines.includes(selectedEngine)) {
      return NextResponse.json(
        { 
          error: `${selectedEngine} not available on ${user.plan} plan`,
          availableEngines: user.engines,
          upgrade: 'Upgrade to access more engines'
        },
        { status: 403 }
      )
    }

    // 7. Get engine adapter
    const engineAdapter = getEngine(selectedEngine)

    // 8. Validate duration for this engine
    const validDuration = Math.min(duration || 5, engineAdapter.maxDuration)

    // 9. Calculate credits
    const creditCost = Math.ceil(validDuration / 5) * 2

    // 10. Check credits
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

    console.log(`🎬 Starting ${selectedEngine} generation for ${user.email}`)
    console.log(`   Prompt: ${prompt.substring(0, 50)}...`)
    console.log(`   Duration: ${validDuration}s | Credits: ${creditCost}`)

    // 11. Call AI engine
    const task = await engineAdapter.generate({
      prompt,
      duration: validDuration,
      aspectRatio: aspectRatio || '16:9',
      style,
      resolution: user.resolution
    })

    console.log(`✅ ${selectedEngine} task created: ${task.id}`)

    // 12. Create generation record
    const generation = await prisma.generation.create({
      data: {
        prompt,
        engine: selectedEngine,
        style: style || 'Cinematic',
        aspectRatio: aspectRatio || '16:9',
        duration: validDuration,
        resolution: user.resolution,
        status: 'processing',
        credits: creditCost,
        userId: user.id,
        engineJobId: task.id,
      }
    })

    // 13. Deduct credits
    await prisma.user.update({
      where: { id: user.id },
      data: { credits: { decrement: creditCost } }
    })

    console.log(`   Credits remaining: ${user.credits - creditCost}`)

    // 14. Start polling in background
    pollTaskCompletion(generation.id, task.id, selectedEngine).catch(error => {
      console.error(`❌ Polling error for ${generation.id}:`, error)
    })

    return NextResponse.json({
      success: true,
      generationId: generation.id,
      taskId: task.id,
      engine: selectedEngine,
      creditsUsed: creditCost,
      creditsRemaining: user.credits - creditCost,
      estimatedTime: `${validDuration * 6}-${validDuration * 10} seconds`,
      message: `🎬 Generation started with ${selectedEngine}`
    })

  } catch (error: any) {
    console.error('❌ Generation API error:', error)
    
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

async function pollTaskCompletion(generationId: string, taskId: string, engineName: VideoEngine) {
  const maxAttempts = 80 // ~7 minutes max
  let attempts = 0

  const poll = async () => {
    try {
      attempts++
      
      const engine = getEngine(engineName)
      const task = await engine.getStatus(taskId)

      console.log(`📊 ${engineName} ${taskId}: ${task.status} (${attempts}/${maxAttempts})`)

      if (task.status === 'complete' && task.videoUrl) {
        await prisma.generation.update({
          where: { id: generationId },
          data: {
            status: 'complete',
            videoUrl: task.videoUrl,
            thumbnailUrl: task.thumbnailUrl
          }
        })
        
        console.log(`✅ ${engineName} generation ${generationId} complete!`)
        return
      }

      if (task.status === 'failed') {
        await prisma.generation.update({
          where: { id: generationId },
          data: {
            status: 'failed',
            errorMessage: task.error || 'Generation failed'
          }
        })
        
        console.error(`❌ ${engineName} generation ${generationId} failed:`, task.error)
        return
      }

      if (task.status === 'processing' || task.status === 'pending') {
        if (attempts >= maxAttempts) {
          throw new Error('Task timeout after 7 minutes')
        }
        
        // Poll every 5 seconds
        setTimeout(poll, 5000)
        return
      }

    } catch (error) {
      console.error(`❌ Polling error for ${generationId}:`, error)
      
      await prisma.generation.update({
        where: { id: generationId },
        data: {
          status: 'failed',
          errorMessage: error instanceof Error ? error.message : 'Unknown error'
        }
      })
    }
  }

  // Start polling
  poll()
}