// app/dashboard/layout.tsx

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { DashboardNav } from '@/components/DashboardSidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  if (!session?.user?.email) {
    redirect('/sign-in')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true,
      email: true,
      image: true,
      plan: true,
      credits: true,
      monthlyLimit: true,
      _count: {
        select: {
          generations: true
        }
      }
    }
  })

  if (!user) {
    redirect('/sign-in')
  }

  const navItems = [
    { href: '/dashboard', label: 'Overview', icon: '📊', exact: true },
    { href: '/dashboard/studio', label: 'Studio', icon: '🎬', exact: false },
    { href: '/dashboard/projects', label: 'Projects', icon: '📁', exact: false },
    { href: '/dashboard/templates', label: 'Templates', icon: '📋', exact: false },
    { href: '/dashboard/history', label: 'History', icon: '🎞️', exact: false },
    { href: '/dashboard/billing', label: 'Billing', icon: '💳', exact: false },
    { href: '/dashboard/settings', label: 'Settings', icon: '⚙️', exact: false },
  ]

  return (
    <div className="min-h-screen bg-black flex">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col">
        
        {/* Logo */}
        <div className="p-6 border-b border-zinc-800">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-600 rounded-sm flex items-center justify-center">
              <span className="text-black font-bold text-sm">C</span>
            </div>
            <span className="text-white text-lg font-medium">Cinema iHub</span>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            {user.image ? (
              <img src={user.image} alt={user.name || ''} className="w-10 h-10 rounded-full" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                <span className="text-white text-sm">{user.name?.[0] || user.email[0].toUpperCase()}</span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user.name || 'User'}</p>
              <p className="text-zinc-500 text-xs capitalize">{user.plan} Plan</p>
            </div>
          </div>
          
          {/* Credits */}
          <div className="bg-zinc-900 rounded-sm p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-zinc-500 text-xs">Credits</span>
              <span className="text-yellow-600 text-sm font-medium">{user.credits}</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5">
              <div 
                className="bg-yellow-600 h-1.5 rounded-full transition-all"
                style={{ width: `${Math.min((user.credits / user.monthlyLimit) * 100, 100)}%` }}
              />
            </div>
            <p className="text-zinc-600 text-xs mt-1">of {user.monthlyLimit} this month</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <DashboardNav items={navItems} />
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-zinc-800 space-y-2">
          <Link href="/gallery">
            <button className="w-full text-zinc-400 hover:text-white text-sm py-2 text-left px-4 rounded-sm hover:bg-zinc-800 transition-colors">
              🌐 Gallery
            </button>
          </Link>
          <Link href="/pricing">
            <button className="w-full text-zinc-400 hover:text-white text-sm py-2 text-left px-4 rounded-sm hover:bg-zinc-800 transition-colors">
              💎 Upgrade Plan
            </button>
          </Link>
          <form action="/api/auth/signout" method="POST">
            <button className="w-full text-red-400 hover:text-red-300 text-sm py-2 text-left px-4 rounded-sm hover:bg-zinc-800 transition-colors">
              🚪 Sign Out
            </button>
          </form>
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

    </div>
  )
}