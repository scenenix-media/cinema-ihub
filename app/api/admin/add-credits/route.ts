// app/api/admin/add-credits/route.ts

import { isAdmin } from '@/lib/admin'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { userId, amount } = await request.json()

  await prisma.user.update({
    where: { id: userId },
    data: {
      credits: {
        increment: amount
      }
    }
  })

  return NextResponse.json({ success: true })
}