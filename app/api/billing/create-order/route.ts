// app/api/billing/create-order/route.ts

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { createSubscriptionOrder, PLAN_PRICING } from '@/lib/cashfree'
import { NextResponse } from 'next/server'

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

    const body = await request.json()
    const { plan, billingCycle } = body

    if (!['studio', 'director'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    if (!['monthly', 'annual'].includes(billingCycle)) {
      return NextResponse.json({ error: 'Invalid billing cycle' }, { status: 400 })
    }

    // Get amount in paise
      const amount = PLAN_PRICING[plan as 'studio' | 'director'][billingCycle as 'monthly' | 'annual']

      if (!amount) {
        return NextResponse.json({ error: 'Invalid pricing' }, { status: 400 })
      }

      // Create Cashfree order (amount is already in paise)
      const order = await createSubscriptionOrder({
        userId: user.id,
        userEmail: user.email,
        userName: user.name || 'Cinema iHub User',
        userPhone: user.phone || '9999999999',
        plan,
        amount: amount // Pass paise directly
      })

    // Create invoice record
    await prisma.invoice.create({
      data: {
        userId: user.id,
        orderId: order.orderId,
        amount,
        currency: 'INR',
        status: 'pending',
        plan,
        billingCycle
      }
    })

    return NextResponse.json({
      orderId: order.orderId,
      paymentSessionId: order.paymentSessionId,
      paymentLink: order.paymentLink
    })

  } catch (error: any) {
    console.error('Create order error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    )
  }
}