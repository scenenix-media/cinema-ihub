// app/admin/users/page.tsx

import { isAdmin } from '@/lib/admin'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import AddCreditsButton from './AddCreditsButton'

export default async function AdminUsersPage() {
  if (!await isAdmin()) {
    redirect('/')
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: {
          generations: true,
          projects: true
        }
      }
    }
  })

  return (
    <div>
      
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-white text-3xl font-light mb-2">User Management</h1>
        <p className="text-zinc-500 text-sm">{users.length} total users</p>
      </div>

      {/* USERS TABLE */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden">
        
        {/* TABLE HEADER */}
        <div className="grid grid-cols-8 px-5 py-3 border-b border-zinc-800 bg-zinc-800/50">
          <div className="text-zinc-500 text-xs tracking-widest uppercase">Name</div>
          <div className="text-zinc-500 text-xs tracking-widest uppercase col-span-2">Email</div>
          <div className="text-zinc-500 text-xs tracking-widest uppercase">Plan</div>
          <div className="text-zinc-500 text-xs tracking-widest uppercase">Credits</div>
          <div className="text-zinc-500 text-xs tracking-widest uppercase">Videos</div>
          <div className="text-zinc-500 text-xs tracking-widest uppercase">Joined</div>
          <div className="text-zinc-500 text-xs tracking-widest uppercase">Actions</div>
        </div>

        {/* TABLE ROWS */}
        {users.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-8 px-5 py-4 border-b border-zinc-800 last:border-0 hover:bg-zinc-800/30 transition-colors items-center"
          >
            <div className="text-white text-sm truncate">{user.name || '—'}</div>
            <div className="text-zinc-400 text-sm col-span-2 truncate">{user.email}</div>
            <div>
              <span className={`text-xs px-2 py-1 rounded-sm capitalize ${
                user.plan === 'free' 
                  ? 'bg-zinc-800 text-zinc-400'
                  : user.plan === 'studio'
                  ? 'bg-blue-900/40 text-blue-400'
                  : 'bg-purple-900/40 text-purple-400'
              }`}>
                {user.plan}
              </span>
            </div>
            <div className="text-zinc-400 text-sm font-medium">{user.credits}</div>
            <div className="text-zinc-400 text-sm">{user._count.generations}</div>
            <div className="text-zinc-500 text-xs">
              {new Date(user.createdAt).toLocaleDateString()}
            </div>
            <div>
              <AddCreditsButton userId={user.id} />
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}