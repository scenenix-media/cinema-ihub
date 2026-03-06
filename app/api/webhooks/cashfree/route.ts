// app/api/webhooks/cashfree/route.ts

import { prisma } from '@/lib/prisma'
import { verifyWebhookSignature } from '@/lib/cashfree'
import { NextResponse } from 'next/server'
import { getPlanLimits } from '@/lib/planLimits'

export async function POST(request: Request) {
  try {
    // Get raw body for signature verification
    const rawBody = await request.text()
    const body = JSON.parse(rawBody)

    // Verify webhook signature
    const timestamp = request.headers.get('x-webhook-timestamp') || ''
    const signature = request.headers.get('x-webhook-signature') || ''

    const isValid = verifyWebhookSignature(timestamp, rawBody, signature)

    if (!isValid) {
      console.error('❌ Invalid webhook signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    console.log('📥 Cashfree webhook received:', body.type)

    // Handle different webhook events
    const eventType = body.type

    if (eventType === 'PAYMENT_SUCCESS_WEBHOOK') {
      const orderData = body.data.order
      const orderId = orderData.order_id
      const paymentData = body.data.payment

      console.log(`✅ Payment successful for order: ${orderId}`)

      // Find invoice
      const invoice = await prisma.invoice.findUnique({
        where: { orderId },
        include: { user: true }
      })

      if (!invoice) {
        console.error(`Invoice not found for order: ${orderId}`)
        return NextResponse.json({ received: true })
      }

      // Update invoice status
      await prisma.invoice.update({
        where: { id: invoice.id },
        data: {
          status: 'paid',
          paymentMethod: paymentData.payment_method,
          paidAt: new Date()
        }
      })

      // Update user subscription
      const planLimits = getPlanLimits(invoice.plan as any)
      const subscriptionEnd = new Date()
      
      if (invoice.billingCycle === 'annual') {
        subscriptionEnd.setFullYear(subscriptionEnd.getFullYear() + 1)
      } else {
        subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 1)
      }

      await prisma.user.update({
        where: { id: invoice.userId },
        data: {
          plan: invoice.plan,
          subscriptionStatus: 'active',
          billingCycle: invoice.billingCycle,
          subscriptionStart: new Date(),
          subscriptionEnd,
          credits: planLimits.credits,
          monthlyLimit: planLimits.monthlyLimit,
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

      console.log(`✅ User ${invoice.userId} upgraded to ${invoice.plan}`)

      // TODO: Send confirmation email to user

      return NextResponse.json({ received: true })
    }

    if (eventType === 'PAYMENT_FAILED_WEBHOOK') {
      const orderId = body.data.order.order_id
      
      console.log(`❌ Payment failed for order: ${orderId}`)

      await prisma.invoice.updateMany({
        where: { orderId },
        data: { status: 'failed' }
      })

      return NextResponse.json({ received: true })
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('❌ Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}