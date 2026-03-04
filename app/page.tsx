// app/page.tsx

import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import StatsBar from '@/components/StatsBar'
import StyleLibrary from '@/components/StyleLibrary'
import Features from '@/components/Features'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <StyleLibrary />
      <Features />
      
      {/* CTA Section */}
      <section className="px-12 py-32 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white text-5xl font-light mb-6">
            Start Creating<br />
            <span className="text-yellow-600 italic">Cinematic Stories</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-12 max-w-2xl mx-auto">
            Join creators using Cinema iHub to bring their visions to life 
            with professional-grade AI cinematography.
          </p>
          <a href="/sign-up">
            <button className="bg-yellow-600 text-black text-sm tracking-widest uppercase px-10 py-4 rounded-sm font-medium hover:bg-yellow-500 transition-all hover:scale-105 mb-4">
              Start Free — 10 Credits
            </button>
          </a>
          <p className="text-zinc-600 text-xs">
            No credit card required · Full style library access
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}