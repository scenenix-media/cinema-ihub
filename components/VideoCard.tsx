'use client'

import { useState } from 'react'

type VideoCardProps = {
  video: {
    id: string
    prompt: string
    style: string
    duration: number
    videoUrl: string | null
    user: {
      name: string | null
      image: string | null
    }
  }
}

export default function VideoCard({ video }: VideoCardProps) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div
      className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden hover:border-zinc-600 transition-all cursor-pointer group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* VIDEO THUMBNAIL */}
      <div className="aspect-video bg-linear-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
        {video.videoUrl && (
          <video
            src={video.videoUrl}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            muted
            loop
            playsInline
            autoPlay={isHovering}
          />
        )}
        
        {/* OVERLAY ON HOVER */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-white text-xl">▶</span>
          </div>
        </div>
      </div>

      {/* INFO */}
      <div className="p-4">
        <div className="text-white text-sm font-medium mb-2 line-clamp-2">
          {video.prompt.length > 60 ? video.prompt.substring(0, 60) + '...' : video.prompt}
        </div>
        
        <div className="flex items-center justify-between text-xs text-zinc-500 mb-3">
          <span className="px-2 py-1 bg-zinc-800 rounded-sm">{video.style}</span>
          <span>{video.duration}s</span>
        </div>

        <div className="flex items-center gap-2">
          {video.user.image && (
            <img src={video.user.image} alt="" className="w-6 h-6 rounded-full" />
          )}
          <span className="text-zinc-400 text-xs">
            {video.user.name || 'Anonymous'}
          </span>
        </div>
      </div>
    </div>
  )
}