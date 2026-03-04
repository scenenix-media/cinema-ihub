import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative px-12 pt-32 pb-20 overflow-hidden">
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-yellow-600/5 via-transparent to-transparent" />
      
      <div className="relative max-w-5xl mx-auto text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-600/20 bg-yellow-600/10 mb-8">
          <span className="w-2 h-2 rounded-full bg-yellow-600 animate-pulse" />
          <span className="text-yellow-600 text-xs tracking-widest uppercase font-medium">
            Professional Grade AI Cinema
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-white text-7xl font-light mb-6 leading-tight">
          Where Vision<br />
          <span className="text-yellow-600 italic">Becomes Cinema</span>
        </h1>

        {/* Subheadline */}
        <p className="text-zinc-400 text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
          Generate cinematic-grade video with styles curated by professional cinematographers. 
          No complex tools. No guesswork. Just beautiful shots.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4">
          <Link href="/sign-up">
            <button className="bg-yellow-600 text-black text-sm tracking-widest uppercase px-8 py-4 rounded-sm font-medium hover:bg-yellow-500 transition-all hover:scale-105">
              Begin Creating →
            </button>
          </Link>
          <Link href="/gallery">
            <button className="text-white text-sm tracking-widest uppercase px-8 py-4 rounded-sm border border-zinc-700 hover:border-zinc-500 transition-colors">
              View Gallery
            </button>
          </Link>
        </div>

        {/* Social proof */}
        <div className="mt-12 flex items-center justify-center gap-8 text-zinc-600 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-yellow-600">✓</span>
            <span>50+ Cinematic Styles</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-600">✓</span>
            <span>Professional Color Grading</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-600">✓</span>
            <span>Studio-Quality Production</span>
          </div>
        </div>

      </div>
    </section>
  )
}