// app/dashboard/page.tsx

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.email) {
    redirect('/sign-in')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      _count: {
        select: {
          generations: true,
          projects: true
        }
      },
      generations: {
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          prompt: true,
          status: true,
          videoUrl: true,
          createdAt: true,
          engine: true,
          duration: true
        }
      }
    }
  })

  if (!user) {
    redirect('/sign-in')
  }

  const completedCount = await prisma.generation.count({
    where: { userId: user.id, status: 'complete' }
  })

  const processingCount = await prisma.generation.count({
    where: { userId: user.id, status: 'processing' }
  })

  return (
    <div className="p-8">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white text-3xl font-light mb-2">
          Welcome back, {user.name || 'Creator'}!
        </h1>
        <p className="text-zinc-500">Here's your creative overview</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        
        <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-6">
          <p className="text-zinc-500 text-xs mb-2">Available Credits</p>
          <p className="text-white text-3xl font-light mb-1">{user.credits}</p>
          <p className="text-zinc-600 text-xs">of {user.monthlyLimit} this month</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-6">
          <p className="text-zinc-500 text-xs mb-2">Total Generations</p>
          <p className="text-white text-3xl font-light mb-1">{user._count.generations}</p>
          <p className="text-zinc-600 text-xs">{completedCount} completed</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-6">
          <p className="text-zinc-500 text-xs mb-2">Active Projects</p>
          <p className="text-white text-3xl font-light mb-1">{user._count.projects}</p>
          <p className="text-zinc-600 text-xs">across all projects</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-6">
          <p className="text-zinc-500 text-xs mb-2">Processing</p>
          <p className="text-white text-3xl font-light mb-1">{processingCount}</p>
          <p className="text-zinc-600 text-xs">videos in queue</p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-white text-xl font-light mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <Link href="/dashboard/studio">
            <div className="bg-yellow-600 hover:bg-yellow-500 p-6 rounded-sm cursor-pointer transition-colors group">
              <span className="text-3xl mb-3 block">🎬</span>
              <p className="text-black text-lg font-medium mb-1">Create New Video</p>
              <p className="text-black/70 text-sm">Start generating with AI</p>
            </div>
          </Link>

          <Link href="/dashboard/templates">
            <div className="bg-zinc-900 border border-zinc-800 hover:border-yellow-600/50 p-6 rounded-sm cursor-pointer transition-all group">
              <span className="text-3xl mb-3 block">📋</span>
              <p className="text-white text-lg font-medium mb-1">Browse Templates</p>
              <p className="text-zinc-500 text-sm">Pre-made prompts</p>
            </div>
          </Link>

          <Link href="/dashboard/billing">
            <div className="bg-zinc-900 border border-zinc-800 hover:border-yellow-600/50 p-6 rounded-sm cursor-pointer transition-all group">
              <span className="text-3xl mb-3 block">💎</span>
              <p className="text-white text-lg font-medium mb-1">Upgrade Plan</p>
              <p className="text-zinc-500 text-sm">Get more credits</p>
            </div>
          </Link>

        </div>
      </div>

      {/* Recent Generations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-light">Recent Generations</h2>
          <Link href="/dashboard/history" className="text-yellow-600 hover:text-yellow-500 text-sm">
            View All →
          </Link>
        </div>

        {user.generations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {user.generations.map(gen => (
              <div key={gen.id} className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden hover:border-yellow-600/50 transition-all">
                {gen.videoUrl ? (
                  <video
                    src={gen.videoUrl}
                    className="w-full aspect-video object-cover"
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <div className="w-full aspect-video bg-zinc-800 flex items-center justify-center">
                    <span className="text-zinc-600 text-sm">
                      {gen.status === 'processing' ? '⏳ Processing...' : '🎬'}
                    </span>
                  </div>
                )}
                <div className="p-3">
                  <p className="text-white text-xs line-clamp-2 mb-2">{gen.prompt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-600 text-xs">{gen.engine}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-sm ${
                      gen.status === 'complete' ? 'bg-green-900/20 text-green-400' :
                      gen.status === 'processing' ? 'bg-yellow-900/20 text-yellow-400' :
                      'bg-red-900/20 text-red-400'
                    }`}>
                      {gen.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-12 text-center">
            <p className="text-zinc-500 mb-4">No generations yet</p>
            <Link href="/dashboard/studio">
              <button className="bg-yellow-600 text-black text-sm tracking-widest uppercase px-6 py-2 rounded-sm font-medium hover:bg-yellow-500">
                Create Your First Video
              </button>
            </Link>
          </div>
        )}
      </div>

    </div>
  )
}