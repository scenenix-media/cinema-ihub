// app/dashboard/studio/page.tsx

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import StudioClient from './StudioClient'

export default async function StudioPage() {
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
      plan: true,
      credits: true,
      monthlyLimit: true,
      engines: true,
      resolution: true,
      stylePresetsLimit: true
    }
  })

  if (!user) {
    redirect('/sign-in')
  }

  return <StudioClient user={user} />
}