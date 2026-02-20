import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  console.log('🔔 Webhook received')

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    console.error('❌ Missing CLERK_WEBHOOK_SECRET')
    return new Response('Error: Missing webhook secret', { status: 500 })
  }

  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('❌ Missing svix headers')
    return new Response('Error: Missing headers', { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)
  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
    console.log('✅ Webhook verified')
  } catch (err) {
    console.error('❌ Webhook verification failed:', err)
    return new Response('Error: Verification failed', { status: 400 })
  }

  const eventType = evt.type
  console.log(`📝 Event type: ${eventType}`)

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name } = evt.data

    console.log(`👤 Creating user: ${email_addresses[0].email_address}`)

    try {
      const user = await prisma.user.create({
        data: {
          clerkId: id,
          email: email_addresses[0].email_address,
          name: first_name && last_name ? `${first_name} ${last_name}` : first_name || last_name || null,
          plan: 'free',
          credits: 10,
        },
      })

      console.log(`✅ User created in database:`, user)
      return NextResponse.json({ success: true, userId: user.id })
    } catch (error) {
      console.error('❌ Database error:', error)
      return NextResponse.json({ 
        error: 'Database error', 
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}