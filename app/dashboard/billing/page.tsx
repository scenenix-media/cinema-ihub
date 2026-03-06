// app/dashboard/billing/page.tsx

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import BillingClient from './BillingClient' 

export default async function BillingPage() {
  const session = await auth()
  if (!session?.user?.email) {
    redirect('/sign-in')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      invoices: {
        orderBy: { createdAt: 'desc' },
        take: 10
      }
    }
  })

  if (!user) {
    redirect('/sign-in')
  }

  return <BillingClient user={user} />
}