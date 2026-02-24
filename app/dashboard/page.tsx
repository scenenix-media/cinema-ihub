import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user?.email) {
    redirect('/sign-in')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      projects: {
        take: 3,
        orderBy: { updatedAt: 'desc' },
        include: {
          _count: {
            select: { generations: true }
          }
        }
      },
      generations: {
        take: 10,
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  if (!user) {
    redirect('/sign-in')
  }

  // Calculate stats
  const totalGenerations = await prisma.generation.count({
    where: { userId: user.id }
  })

  const storageUsed = 0 // TODO: Calculate from video file sizes when implemented
  const watchTime = totalGenerations * 8 // Rough estimate: avg 8 seconds per video

  const stats = [
    { label: 'Total Videos',  value: totalGenerations.toString(), sub: `${user.plan} plan` },
    { label: 'Storage Used',  value: `${storageUsed} GB`, sub: 'of 200 GB' },
    { label: 'Watch Time',    value: `${Math.round(watchTime / 60)} min`, sub: 'all projects' },
    { label: 'Credits Left',  value: user.credits.toString(), sub: 'resets monthly' },
  ]

  // Get current hour for greeting
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="p-8">

      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-white text-2xl font-light">
          {greeting}, {user.name?.split(' ')[0] || 'there'}
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          {totalGenerations === 0 
            ? "Ready to create your first video?" 
            : `You've created ${totalGenerations} video${totalGenerations === 1 ? '' : 's'} so far.`
          }
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-4 gap-4 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-sm p-5 hover:border-zinc-600 transition-colors">
            <div className="text-zinc-400 text-xs tracking-widest uppercase mb-3">{stat.label}</div>
            <div className="text-white text-3xl font-light mb-1">{stat.value}</div>
            <div className="text-zinc-600 text-xs">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* RECENT PROJECTS */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-sm tracking-widest uppercase">Recent Projects</h2>
          <button className="text-zinc-400 text-xs border border-zinc-700 px-3 py-1.5 rounded-sm hover:border-zinc-500 hover:text-white transition-colors">
            New Project
          </button>
        </div>

        {user.projects.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-12 text-center">
            <p className="text-zinc-500 text-sm mb-4">No projects yet</p>
            <a href="/generate">
              <button className="bg-yellow-600 text-black text-xs tracking-widest uppercase px-6 py-2 rounded-sm font-medium hover:bg-yellow-500 transition-colors">
                Create Your First Project
              </button>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {user.projects.map((project) => (
              <div key={project.id} className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden hover:border-zinc-600 transition-colors cursor-pointer">
                <div className="aspect-video bg-linear-to-br from-zinc-800 to-zinc-900" />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-white text-sm font-medium">{project.name}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-sm ${
                      project.status === 'complete'
                        ? 'bg-green-900/50 text-green-400 border border-green-800'
                        : project.status === 'in_progress'
                        ? 'bg-blue-900/50 text-blue-400 border border-blue-800'
                        : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 text-xs">{project._count.generations} videos</span>
                    <span className="text-zinc-600 text-xs">
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* GENERATION HISTORY */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-sm tracking-widest uppercase">Generation History</h2>
        </div>

        {user.generations.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-12 text-center">
            <p className="text-zinc-500 text-sm mb-4">No generations yet</p>
            <a href="/generate">
              <button className="bg-yellow-600 text-black text-xs tracking-widest uppercase px-6 py-2 rounded-sm font-medium hover:bg-yellow-500 transition-colors">
                Generate Your First Video
              </button>
            </a>
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden">
            {/* TABLE HEADER */}
            <div className="grid grid-cols-5 px-5 py-3 border-b border-zinc-800 bg-zinc-800/50">
              {['Prompt', 'Style', 'Duration', 'Engine', 'Status'].map(h => (
                <div key={h} className="text-zinc-500 text-xs tracking-widest uppercase">{h}</div>
              ))}
            </div>
            {/* TABLE ROWS */}
            {user.generations.map((gen) => (
              <div
                key={gen.id}
                className="grid grid-cols-5 px-5 py-4 border-b border-zinc-800 last:border-0 hover:bg-zinc-800/30 transition-colors cursor-pointer items-center"
              >
                <div className="text-white text-sm truncate pr-4">
                  {gen.prompt.length > 50 ? gen.prompt.substring(0, 50) + '...' : gen.prompt}
                </div>
                <div className="text-zinc-400 text-sm">{gen.style}</div>
                <div className="text-zinc-400 text-sm">{gen.duration}s</div>
                <div className="text-zinc-400 text-sm capitalize">{gen.engine}</div>
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
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}