// components/StyleLibrary.tsx

import Link from 'next/link'
import { cinematicStyles } from '@/lib/styles'

export default function StyleLibrary() {
  const featuredStyles = cinematicStyles.slice(0, 6)
  
  return (
    <section className="px-12 py-20 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-white text-4xl font-light mb-4">
            Curated Cinematic Styles
          </h2>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
            Every style crafted with reference-quality cinematography. 
            From DP-approved color grading to camera movement presets.
          </p>
        </div>

        {/* Style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredStyles.map((style) => (
            <div
              key={style.id}
              className="group bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden hover:border-yellow-600/50 transition-all cursor-pointer"
            >
              {/* Style Preview */}
              <div 
                className="aspect-video relative overflow-hidden"
                style={{ background: style.thumbnail }}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-yellow-600 text-xs rounded-sm border border-yellow-600/30">
                    {style.category}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent">
                  <h3 className="text-white text-lg font-medium mb-1">
                    {style.name}
                  </h3>
                  {style.referenceFilm && (
                    <p className="text-zinc-400 text-xs">
                      Inspired by {style.referenceFilm}
                    </p>
                  )}
                </div>
              </div>

              {/* Style Details */}
              <div className="p-5">
                <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                  {style.description}
                </p>
                
                {/* Technical Details */}
                <div className="space-y-2 text-xs">
                  <div className="flex gap-2">
                    <span className="text-zinc-600">Camera:</span>
                    <span className="text-zinc-500 line-clamp-1">{style.cameraStyle}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-zinc-600">Grade:</span>
                    <span className="text-zinc-500 line-clamp-1">{style.colorGrade}</span>
                  </div>
                </div>

                <Link href="/generate">
                  <button className="w-full mt-4 text-yellow-600 text-xs tracking-widest uppercase py-2 border border-zinc-800 rounded-sm hover:border-yellow-600/50 hover:bg-yellow-600/5 transition-colors">
                    Use This Style
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/generate">
            <button className="text-white text-sm tracking-widest uppercase px-8 py-3 border border-zinc-700 rounded-sm hover:border-zinc-500 transition-colors">
              Explore All {cinematicStyles.length} Styles →
            </button>
          </Link>
        </div>

      </div>
    </section>
  )
}