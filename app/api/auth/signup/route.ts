// app/api/auth/signup/route.ts

import { getPlanLimits } from '@/lib/planLimits'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    if (typeof password !== 'string' || password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      )
    }

    // Hash password FIRST
    const hashedPassword = await bcrypt.hash(password, 10)

    // Apply plan limits
    const planLimits = getPlanLimits('free')

    // Create user ONCE
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,

        plan: 'free',
        credits: planLimits.credits,
        monthlyLimit: planLimits.monthlyLimit,

        storageUsed: 0,
        storageLimit: planLimits.storageLimit,

        resolution: planLimits.resolution,
        engines: [...planLimits.engines],

        stylePresetsLimit: planLimits.stylePresetsLimit,
        projectsLimit: planLimits.projectsLimit,

        apiAccess: planLimits.apiAccess,
        customLUTImport: planLimits.customLUTImport,
        reviewPortal: planLimits.reviewPortal,
        prioritySupport: planLimits.prioritySupport,

        teamSeats: planLimits.teamSeats,
        whiteLabel: planLimits.whiteLabel,
      }
    })

    console.log('✅ New user registered:', user.email)

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}