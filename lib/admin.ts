// lib/admin.ts

import { auth } from '@/auth'

// Admin email - only this email can access admin dashboard
const ADMIN_EMAILS = [
  'admin@cinemaihub.com',
]

export async function isAdmin() {
  try {
    const session = await auth()
    console.log('🔐 Admin check - Session:', session?.user?.email)
    
    if (!session?.user?.email) {
      console.log('❌ No session found')
      return false
    }
    
    const hasAccess = ADMIN_EMAILS.includes(session.user.email)
    console.log('🔐 Admin access:', hasAccess)
    
    return hasAccess
  } catch (error) {
    console.error('❌ Admin auth error:', error)
    return false
  }
}