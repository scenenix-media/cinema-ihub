// app/dashboard/history/page.tsx

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function HistoryPage() {
  const session = await auth()
  
  if (!session?.user?.email) {
    redirect('/sign-in')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      generations: {
        orderBy: { createdAt: 'desc' },
        include: {
          project: {
            select: {
              name: true
            }
          }
        }
      }
    }
  })

  if (!user) {
    redirect('/sign-in')
  }

  // Group by status
  const completed = user.generations.filter(g => g.status === 'complete')
  const processing = user.generations.filter(g => g.status === 'processing')
  const failed = user.generations.filter(g => g.status === 'failed')

  return (
    <div className="p-8">
      
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-white text-2xl font-light mb-1">Generation History</h1>
        <p className="text-zinc-500 text-sm">
          All your video generations in one place
        </p>
      </div>

      {/* STATS BAR */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-4">
          <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Total</div>
          <div className="text-white text-2xl font-light">{user.generations.length}</div>
        </div>
        <div className="bg-zinc-900 border border-green-900/30 rounded-sm p-4">
          <div className="text-green-600 text-xs uppercase tracking-wider mb-1">Completed</div>
          <div className="text-white text-2xl font-light">{completed.length}</div>
        </div>
        <div className="bg-zinc-900 border border-blue-900/30 rounded-sm p-4">
          <div className="text-blue-600 text-xs uppercase tracking-wider mb-1">Processing</div>
          <div className="text-white text-2xl font-light">{processing.length}</div>
        </div>
        <div className="bg-zinc-900 border border-red-900/30 rounded-sm p-4">
          <div className="text-red-600 text-xs uppercase tracking-wider mb-1">Failed</div>
          <div className="text-white text-2xl font-light">{failed.length}</div>
        </div>
      </div>

      {/* GENERATIONS TABLE */}
      {user.generations.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full border border-zinc-800 flex items-center justify-center mx-auto mb-4">
            <span className="text-zinc-700 text-2xl">◎</span>
          </div>
          <p className="text-zinc-500 text-sm mb-4">No generations yet</p>
          <Link href="/generate">
            <button className="bg-yellow-600 text-black text-xs tracking-widest uppercase px-6 py-2 rounded-sm font-medium hover:bg-yellow-500 transition-colors">
              Generate Your First Video
            </button>
          </Link>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden">
          
          {/* TABLE HEADER */}
          <div className="grid grid-cols-6 px-5 py-3 border-b border-zinc-800 bg-zinc-800/50">
            <div className="text-zinc-500 text-xs tracking-widest uppercase">Prompt</div>
            <div className="text-zinc-500 text-xs tracking-widest uppercase">Style</div>
            <div className="text-zinc-500 text-xs tracking-widest uppercase">Duration</div>
            <div className="text-zinc-500 text-xs tracking-widest uppercase">Project</div>
            <div className="text-zinc-500 text-xs tracking-widest uppercase">Status</div>
            <div className="text-zinc-500 text-xs tracking-widest uppercase">Date</div>
          </div>

          {/* TABLE ROWS */}
          {user.generations.map((gen) => (
            <div
              key={gen.id}
              className="grid grid-cols-6 px-5 py-4 border-b border-zinc-800 last:border-0 hover:bg-zinc-800/30 transition-colors items-center group"
            >
              <div className="text-white text-sm truncate pr-4">
                {gen.prompt.length > 40 ? gen.prompt.substring(0, 40) + '...' : gen.prompt}
              </div>
              <div className="text-zinc-400 text-sm">{gen.style}</div>
              <div className="text-zinc-400 text-sm">{gen.duration}s</div>
              <div className="text-zinc-400 text-sm">
                {gen.project?.name || '—'}
              </div>
              <span className={`text-xs px-2 py-1 rounded-sm w-fit ${
                gen.status === 'complete'
                  ? 'bg-green-900/40 text-green-400 border border-green-800'
                  : gen.status === 'processing'
                  ? 'bg-blue-900/40 text-blue-400 border border-blue-800'
                  : gen.status === 'failed'
                  ? 'bg-red-900/40 text-red-400 border border-red-800'
                  : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
              }`}>
                {gen.status}
              </span>
              <div className="text-zinc-500 text-xs flex items-center justify-between">
                <span>{new Date(gen.createdAt).toLocaleDateString()}</span>
                {gen.videoUrl && (
                  <a 
                    href={gen.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-yellow-600 hover:text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    View →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
