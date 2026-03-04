import { prisma } from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import VideoCard from '@/components/VideoCard'

export default async function GalleryPage() {
  // Get all completed generations from all users
  const generations = await prisma.generation.findMany({
    where: {
      status: 'complete',
      videoUrl: {
        not: null
      }
    },
    include: {
      user: {
        select: {
          name: true,
          image: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 50
  })

  const styles = ['All', 'Cinematic', 'Film Noir', 'Epic Drama', 'Sci-Fi', 'Documentary', 'Horror', 'Western', 'Romance', 'Anime']

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="px-12 py-12">
        
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-white text-3xl font-light mb-2">Community Gallery</h1>
          <p className="text-zinc-500 text-sm">
            {generations.length} cinematic creations from the Cinema iHub community
          </p>
        </div>

        {/* FILTER BUTTONS */}
        <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
          {styles.map(style => (
            <button
              key={style}
              className="text-xs px-4 py-2 rounded-sm border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white transition-colors whitespace-nowrap"
            >
              {style}
            </button>
          ))}
        </div>

        {/* GALLERY GRID */}
        {generations.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full border border-zinc-800 flex items-center justify-center mx-auto mb-4">
              <span className="text-zinc-700 text-2xl">◈</span>
            </div>
            <p className="text-zinc-500 text-sm mb-4">No videos in gallery yet</p>
            <Link href="/generate">
              <button className="bg-yellow-600 text-black text-xs tracking-widest uppercase px-6 py-2 rounded-sm font-medium hover:bg-yellow-500 transition-colors">
                Create First Video
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {generations.map((gen) => (
              <VideoCard
                key={gen.id}
                video={{
                  id: gen.id,
                  prompt: gen.prompt,
                  style: gen.style,
                  duration: gen.duration,
                  videoUrl: gen.videoUrl,
                  user: {
                    name: gen.user.name,
                    image: gen.user.image
                  }
                }}
              />
            ))}
          </div>
        )}

      </div>
      <Footer />
    </div>
  )
}