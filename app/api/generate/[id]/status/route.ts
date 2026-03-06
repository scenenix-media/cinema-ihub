// app/api/generate/[id]/status/route.ts

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getEngine, VideoEngine } from '@/lib/video-engines'

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const params = await context.params
    const generation = await prisma.generation.findUnique({
      where: { id: params.id }
    })

    if (!generation) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    // If still processing, try to get live status from engine
    if (generation.status === 'processing' && generation.engineJobId) {
      try {
        const engine = getEngine(generation.engine as VideoEngine)
        const task = await engine.getStatus(generation.engineJobId)
        
        return NextResponse.json({
          status: task.status,
          videoUrl: task.videoUrl,
          progress: task.progress,
          error: task.error,
          engine: generation.engine
        })
      } catch (error) {
        console.error('Error fetching live status:', error)
        // Fall through to return DB status
      }
    }

    // Return status from database
    return NextResponse.json({
      status: generation.status,
      videoUrl: generation.videoUrl,
      error: generation.errorMessage,
      engine: generation.engine
    })

  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json({ error: 'Status check failed' }, { status: 500 })
  }
}