// app/dashboard/settings/page.tsx

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import SettingsClient from './SettingsClient'

export default async function SettingsPage() {
  const session = await auth()
  if (!session?.user?.email) {
    redirect('/sign-in')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      phone: true,
      plan: true,
      apiAccess: true,
      createdAt: true,
    }
  })

  if (!user) {
    redirect('/sign-in')
  }

  return <SettingsClient user={user} />
}