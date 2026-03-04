// app/admin/layout.tsx

import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const ADMIN_EMAILS = [
  'admin@cinemaihub.com',
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  // Check if user is logged in
  if (!session?.user?.email) {
    console.log('🔐 No session - redirecting to sign-in')
    redirect('/sign-in?callbackUrl=/admin')
  }

  // Check if user is admin
  const isAdmin = ADMIN_EMAILS.includes(session.user.email)
  
  if (!isAdmin) {
    console.log('❌ Not admin - redirecting to dashboard')
    redirect('/dashboard')
  }

  const navLinks = [
    { href: '/admin', label: 'Overview' },
    { href: '/admin/users', label: 'Users' },
    { href: '/admin/analytics', label: 'Analytics' },
  ]

  return (
    <div className="min-h-screen bg-black">
      
      {/* ADMIN HEADER */}
      <div className="border-b border-zinc-800 bg-zinc-950">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-yellow-600 rounded-sm flex items-center justify-center">
                <span className="text-black font-bold text-xs">C</span>
              </div>
              <span className="text-white text-sm font-medium">Cinema iHub</span>
            </Link>
            
            <div className="flex gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-zinc-400 text-xs tracking-wider uppercase px-4 py-2 hover:text-white hover:bg-zinc-800 rounded-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-zinc-500 text-xs">{session.user.email}</span>
            <div className="px-3 py-1 bg-red-900/20 border border-red-800 rounded-sm">
              <span className="text-red-400 text-xs tracking-wider uppercase">Admin Mode</span>
            </div>
          </div>
        </div>
      </div>

      {/* ADMIN CONTENT */}
      <div className="p-8">
        {children}
      </div>
    </div>
  )
}