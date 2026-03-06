// app/dashboard/templates/page.tsx

import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import TemplatesClient from './TemplatesClient'

export default async function TemplatesPage() {
  const session = await auth()
  if (!session?.user?.email) {
    redirect('/sign-in')
  }

  return <TemplatesClient />
}