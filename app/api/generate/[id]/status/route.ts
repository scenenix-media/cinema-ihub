// app/api/generate/[id]/status/route.ts

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // IMPORTANT: Await params before accessing properties
    const params = await context.params
    const generationId = params.id

    const generation = await prisma.generation.findUnique({
      where: { id: generationId }
    })

    if (!generation) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    // Calculate mock progress based on time elapsed
    const createdAt = new Date(generation.createdAt).getTime()
    const now = Date.now()
    const elapsed = now - createdAt
    const estimatedTotal = 40000 // 40 seconds average
    const progress = Math.min(95, Math.floor((elapsed / estimatedTotal) * 100))

    return NextResponse.json({
      status: generation.status,
      progress: generation.status === 'processing' ? progress : 100,
      videoUrl: generation.videoUrl,
      error: generation.errorMessage
    })

  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json({ error: 'Status check failed' }, { status: 500 })
  }
}