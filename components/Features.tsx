// components/Features.tsx
export default function Features() {
  return (
    <section className="px-12 py-20 border-t border-zinc-900 bg-linear-to-b from-transparent to-zinc-950">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Feature 1 */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-yellow-600/10 border border-yellow-600/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-yellow-600 text-2xl">◈</span>
            </div>
            <h3 className="text-white text-xl font-medium mb-3">
              DP-Curated Styles
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Every style crafted by professional cinematographers. Reference-quality 
              color grading, lighting setups, and camera movements that actually look cinematic.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-yellow-600/10 border border-yellow-600/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-yellow-600 text-2xl">◆</span>
            </div>
            <h3 className="text-white text-xl font-medium mb-3">
              Professional Production
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Studio-quality output with dynamic camera work, proper color science, 
              and production values that rival traditional filmmaking.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-yellow-600/10 border border-yellow-600/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-yellow-600 text-2xl">◇</span>
            </div>
            <h3 className="text-white text-xl font-medium mb-3">
              Simple Interface
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              No complex timelines or confusing tools. Choose a style, describe your vision, 
              and get cinema-grade results in seconds.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}