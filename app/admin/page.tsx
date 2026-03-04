//app/admin/page.tsx

import { isAdmin } from '@/lib/admin'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export default async function AdminPage() {
  if (!await isAdmin()) {
    redirect('/')
  }

  // Get stats
  const totalUsers = await prisma.user.count()
  const totalGenerations = await prisma.generation.count()
  const completedGenerations = await prisma.generation.count({
    where: { status: 'complete' }
  })
  
  const totalCreditsIssued = await prisma.user.aggregate({
    _sum: { credits: true }
  })

  // Recent signups (last 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  
  const recentSignups = await prisma.user.count({
    where: {
      createdAt: { gte: sevenDaysAgo }
    }
  })

  // Recent users
  const recentUsers = await prisma.user.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      plan: true,
      credits: true,
      createdAt: true,
      _count: {
        select: { generations: true }
      }
    }
  })

  const stats = [
    { label: 'Total Users', value: totalUsers.toString(), color: 'blue' },
    { label: 'New This Week', value: recentSignups.toString(), color: 'green' },
    { label: 'Total Generations', value: totalGenerations.toString(), color: 'purple' },
    { label: 'Completed', value: completedGenerations.toString(), color: 'yellow' },
    { label: 'Credits Remaining', value: totalCreditsIssued._sum.credits?.toString() || '0', color: 'orange' },
  ]

  return (
    <div>
      
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-white text-3xl font-light mb-2">Admin Dashboard</h1>
        <p className="text-zinc-500 text-sm">Cinema iHub platform overview</p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-5 gap-4 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-zinc-900 border border-zinc-800 rounded-sm p-5 hover:border-zinc-600 transition-colors"
          >
            <div className="text-zinc-500 text-xs tracking-widest uppercase mb-3">
              {stat.label}
            </div>
            <div className="text-white text-4xl font-light">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* RECENT USERS */}
      <div>
        <h2 className="text-white text-xl font-light mb-4">Recent Signups</h2>
        <div className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden">
          
          {/* TABLE HEADER */}
          <div className="grid grid-cols-6 px-5 py-3 border-b border-zinc-800 bg-zinc-800/50">
            <div className="text-zinc-500 text-xs tracking-widest uppercase">Name</div>
            <div className="text-zinc-500 text-xs tracking-widest uppercase">Email</div>
            <div className="text-zinc-500 text-xs tracking-widest uppercase">Plan</div>
            <div className="text-zinc-500 text-xs tracking-widest uppercase">Credits</div>
            <div className="text-zinc-500 text-xs tracking-widest uppercase">Generations</div>
            <div className="text-zinc-500 text-xs tracking-widest uppercase">Joined</div>
          </div>

          {/* TABLE ROWS */}
          {recentUsers.map((user) => (
            <div
              key={user.id}
              className="grid grid-cols-6 px-5 py-4 border-b border-zinc-800 last:border-0 hover:bg-zinc-800/30 transition-colors items-center"
            >
              <div className="text-white text-sm">{user.name || '—'}</div>
              <div className="text-zinc-400 text-sm">{user.email}</div>
              <div>
                <span className={`text-xs px-2 py-1 rounded-sm ${
                  user.plan === 'free' 
                    ? 'bg-zinc-800 text-zinc-400'
                    : user.plan === 'studio'
                    ? 'bg-blue-900/40 text-blue-400'
                    : 'bg-purple-900/40 text-purple-400'
                }`}>
                  {user.plan}
                </span>
              </div>
              <div className="text-zinc-400 text-sm">{user.credits}</div>
              <div className="text-zinc-400 text-sm">{user._count.generations}</div>
              <div className="text-zinc-500 text-xs">
                {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}