import Link from 'next/link'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

const sidebarLinks = [
  { href: '/dashboard',          icon: '◈', label: 'Overview'       },
  { href: '/dashboard/projects', icon: '◫', label: 'My Projects'    },
  { href: '/dashboard/history',  icon: '◎', label: 'All Generations' },
  { href: '/generate',           icon: '+', label: 'New Generation'  },
]

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  if (!session?.user?.email) {
    redirect('/sign-in')
  }

  // Get user data from database
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      credits: true,
      plan: true,
    }
  })

  if (!user) {
    redirect('/sign-in')
  }

  // Calculate monthly credit limit based on plan
  const creditLimits: Record<string, number> = {
    free: 10,
    studio: 100,
    director: 500,
  }
  const monthlyLimit = creditLimits[user.plan] || 10

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">

      {/* TOP NAV */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-zinc-800 bg-zinc-950">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-7 h-7 bg-yellow-600 rounded-sm flex items-center justify-center">
            <span className="text-black font-bold text-xs">C</span>
          </div>
          <div>
            <div className="text-white text-xs font-medium tracking-wider">CINEMA</div>
            <div className="text-yellow-600 text-xs tracking-widest" style={{fontSize:'9px'}}>iHUB</div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {user.image && (
            <img 
              src={user.image} 
              alt={user.name || ''} 
              className="w-8 h-8 rounded-full"
            />
          )}
          <div>
            <div className="text-white text-xs font-medium">{user.name}</div>
            <div className="text-zinc-500 text-xs capitalize">{user.plan} Plan</div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1">

        {/* SIDEBAR */}
        <aside className="w-56 border-r border-zinc-800 bg-zinc-950 p-4 flex flex-col gap-1">

          {/* CREDITS BOX */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-3 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-zinc-400 text-xs">Monthly Credits</span>
              <span className="text-yellow-500 text-xs font-medium">
                {user.credits}/{monthlyLimit}
              </span>
            </div>
            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-linear-to-r from-yellow-600 to-yellow-400 rounded-full" 
                style={{ width: `${Math.min((user.credits / monthlyLimit) * 100, 100)}%` }} 
              />
            </div>
          </div>

          {/* NAV LINKS */}
          {sidebarLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors text-sm group"
            >
              <span className="text-zinc-600 group-hover:text-yellow-600 transition-colors text-xs">{link.icon}</span>
              {link.label}
            </Link>
          ))}

          <div className="h-px bg-zinc-800 my-2" />

          {/* UPGRADE BOX */}
          {user.plan === 'free' && (
            <div className="mt-auto bg-yellow-600/10 border border-yellow-600/20 rounded-sm p-3">
              <div className="text-yellow-500 text-xs font-medium mb-1">Upgrade to Studio</div>
              <div className="text-zinc-400 text-xs leading-relaxed mb-3">Get 100 credits/month & 1080p exports</div>
              <Link href="/pricing">
                <button className="w-full bg-yellow-600 text-black text-xs py-1.5 rounded-sm font-medium hover:bg-yellow-500 transition-colors">
                  Upgrade Now
                </button>
              </Link>
            </div>
          )}

        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  )
}