// lib/cashfree.ts

import { Cashfree, CFEnvironment } from 'cashfree-pg'
import crypto from 'crypto'

const APP_ID = process.env.CASHFREE_APP_ID
const SECRET_KEY = process.env.CASHFREE_SECRET_KEY
const ENV = process.env.CASHFREE_ENV || 'PROD'

if (!APP_ID || !SECRET_KEY) {
  console.warn('⚠️ Cashfree credentials not configured')
}

// v5 SDK initialization
export const cashfree = new Cashfree(
  ENV === 'TEST' ? CFEnvironment.SANDBOX : CFEnvironment.PRODUCTION,
  APP_ID || '',
  SECRET_KEY || ''
)

/**
 * Plan pricing in INR (paise)
 */
export const PLAN_PRICING = {
  studio: {
    monthly: 299900,
    annual: 224900,
  },
  director: {
    monthly: 799900,
    annual: 599900,
  },
  enterprise: {
    monthly: null,
    annual: null,
  },
} as const

/**
 * Create a payment order for subscription
 */
export async function createSubscriptionOrder(params: {
  userId: string
  userEmail: string
  userName: string
  userPhone: string
  plan: 'studio' | 'director' | 'enterprise'
  amount: number // paise
}) {
  const orderId = `order_${params.userId}_${Date.now()}`

  const request = {
    order_amount: params.amount / 100, // Cashfree expects rupees as decimal amount
    order_currency: 'INR',
    order_id: orderId,
    customer_details: {
      customer_id: params.userId,
      customer_email: params.userEmail,
      customer_name: params.userName,
      customer_phone: params.userPhone,
    },
    order_meta: {
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?order_id=${orderId}`,
      notify_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/cashfree`,
    },
  }

  try {
    const response = await (Cashfree as any).PGCreateOrder(request)

    return {
      orderId: response.data.order_id,
      paymentSessionId: response.data.payment_session_id,
      paymentLink: response.data.payment_link ?? null,
    }
  } catch (error: any) {
    console.error('❌ Cashfree order creation error:', error?.response?.data || error)
    throw new Error(
      error?.response?.data?.message || error?.message || 'Failed to create payment order'
    )
  }
}

/**
 * Get order status from Cashfree
 */
export async function getOrderStatus(orderId: string) {
  try {
    const response = await (Cashfree as any).PGFetchOrder(orderId)
    return response.data
  } catch (error: any) {
    console.error('Error fetching order status:', error?.response?.data || error)
    throw new Error(
      error?.response?.data?.message || error?.message || 'Failed to fetch order status'
    )
  }
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  timestamp: string,
  rawBody: string,
  signature: string
): boolean {
  const secretKey = process.env.CASHFREE_WEBHOOK_SECRET

  if (!secretKey) {
    console.error('CASHFREE_WEBHOOK_SECRET not configured')
    return false
  }

  const expectedSignature = crypto
    .createHmac('sha256', secretKey)
    .update(timestamp + rawBody)
    .digest('base64')

  return expectedSignature === signature
}