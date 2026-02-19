export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-8 text-center -mt-20">
      
      {/* BADGE */}
      <div className="inline-flex items-center gap-2 border border-yellow-600/30 bg-yellow-600/10 text-yellow-500 text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-10">
        <span>✦</span>
        <span>Professional Grade AI Cinema</span>
      </div>

      {/* HEADLINE */}
      <h1 className="text-7xl font-light text-white leading-tight mb-6 max-w-4xl">
        Where Vision
        <br />
        <span className="italic text-yellow-500">Becomes Cinema</span>
      </h1>

      {/* SUBHEADLINE */}
      <p className="text-zinc-400 text-lg max-w-xl leading-relaxed mb-10">
        Generate cinematic-grade video with professional color grading,
        dynamic camera work, and studio-quality production — powered by AI.
      </p>

      {/* CTA BUTTONS */}
      <div className="flex items-center gap-4">
        <button className="bg-yellow-600 text-black px-8 py-4 rounded-sm text-sm tracking-widest uppercase font-medium hover:bg-yellow-500 transition-colors">
          Begin Creating ↗
        </button>
        <button className="text-zinc-400 px-8 py-4 border border-zinc-700 rounded-sm text-sm tracking-widest uppercase hover:border-zinc-500 hover:text-white transition-colors">
          View Gallery
        </button>
      </div>

    </section>
  )
}