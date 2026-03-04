// app/dashboard/projects/page.tsx

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function ProjectsPage() {
  const session = await auth()
  
  if (!session?.user?.email) {
    redirect('/sign-in')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      projects: {
        include: {
          _count: {
            select: { generations: true }
          },
          generations: {
            take: 3,
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              prompt: true,
              status: true,
              videoUrl: true,
              createdAt: true
            }
          }
        },
        orderBy: { updatedAt: 'desc' }
      }
    }
  })

  if (!user) {
    redirect('/sign-in')
  }

  return (
    <div className="p-8">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-white text-2xl font-light mb-1">My Projects</h1>
          <p className="text-zinc-500 text-sm">
            Organize your video generations into projects
          </p>
        </div>
        <button className="bg-yellow-600 text-black text-xs tracking-widest uppercase px-5 py-2 rounded-sm font-medium hover:bg-yellow-500 transition-colors">
          + New Project
        </button>
      </div>

      {/* PROJECTS GRID */}
      {user.projects.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full border border-zinc-800 flex items-center justify-center mx-auto mb-4">
            <span className="text-zinc-700 text-2xl">◫</span>
          </div>
          <p className="text-zinc-500 text-sm mb-4">No projects yet</p>
          <p className="text-zinc-600 text-xs mb-6">Projects help you organize your video generations</p>
          <Link href="/generate">
            <button className="bg-yellow-600 text-black text-xs tracking-widest uppercase px-6 py-2 rounded-sm font-medium hover:bg-yellow-500 transition-colors">
              Generate Your First Video
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.projects.map((project) => (
            <div 
              key={project.id} 
              className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden hover:border-zinc-600 transition-colors"
            >
              {/* PROJECT PREVIEW */}
              <div className="aspect-video bg-linear-to-br from-zinc-800 to-zinc-900 relative">
                {project.generations[0]?.videoUrl ? (
                  <video
                    src={project.generations[0].videoUrl}
                    className="w-full h-full object-cover"
                    muted
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-zinc-700 text-4xl">◫</span>
                  </div>
                )}
              </div>

              {/* PROJECT INFO */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-white text-base font-medium mb-1">
                      {project.name}
                    </h3>
                    {project.description && (
                      <p className="text-zinc-500 text-xs line-clamp-2">
                        {project.description}
                      </p>
                    )}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-sm ${
                    project.status === 'complete'
                      ? 'bg-green-900/50 text-green-400 border border-green-800'
                      : project.status === 'in_progress'
                      ? 'bg-blue-900/50 text-blue-400 border border-blue-800'
                      : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-500 mb-4">
                  <span>{project._count.generations} video{project._count.generations !== 1 ? 's' : ''}</span>
                  <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                </div>

                {/* RECENT VIDEOS PREVIEW */}
                {project.generations.length > 0 && (
                  <div>
                    <div className="text-zinc-600 text-xs uppercase tracking-wider mb-2">
                      Recent
                    </div>
                    <div className="space-y-2">
                      {project.generations.slice(0, 2).map((gen) => (
                        <div 
                          key={gen.id}
                          className="flex items-center gap-2 text-xs"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            gen.status === 'complete' ? 'bg-green-500' : 'bg-yellow-500'
                          }`} />
                          <span className="text-zinc-400 flex-1 truncate">
                            {gen.prompt.length > 35 ? gen.prompt.substring(0, 35) + '...' : gen.prompt}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button className="w-full mt-4 text-zinc-400 text-xs tracking-widest uppercase py-2 border border-zinc-700 rounded-sm hover:border-zinc-500 hover:text-white transition-colors">
                  Open Project
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}