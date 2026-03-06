// app/api/settings/api-key/route.ts

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (!user.apiAccess) {
      return NextResponse.json(
        { error: 'API access not available on your plan' },
        { status: 403 }
      )
    }

    // Generate API key
    const apiKey = `ch_${crypto.randomBytes(32).toString('hex')}`

    // Store hashed version in database (would need to add apiKeyHash field to schema)
    // For now, just return the key
    // TODO: Implement proper API key storage and validation

    return NextResponse.json({ apiKey })

  } catch (error) {
    console.error('API key generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate API key' },
      { status: 500 }
    )
  }
}