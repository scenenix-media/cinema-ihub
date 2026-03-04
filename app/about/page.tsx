import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <div className="px-12 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-white text-6xl font-light mb-6">
            Where Vision<br />
            <span className="text-yellow-600 italic">Becomes Cinema</span>
          </h1>
          <p className="text-zinc-400 text-xl leading-relaxed">
            Cinema iHub is redefining how creators bring their cinematic visions to life 
            through the power of artificial intelligence.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="px-12 py-20 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-white text-4xl font-light mb-6">Our Mission</h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-4">
                We believe that every creator deserves access to professional-grade 
                cinematography tools. Cinema iHub democratizes video production by 
                combining cutting-edge AI technology with the artistry of professional 
                cinematographers.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Our curated style library ensures that you don't just generate videos — 
                you create cinema.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-yellow-600 text-sm tracking-widest uppercase mb-2">Vision</h3>
                  <p className="text-white text-lg">
                    To become the world's leading platform for AI-powered cinematic creation
                  </p>
                </div>
                <div>
                  <h3 className="text-yellow-600 text-sm tracking-widest uppercase mb-2">Values</h3>
                  <ul className="text-zinc-400 space-y-2">
                    <li>• Quality over quantity</li>
                    <li>• Artistic integrity</li>
                    <li>• Accessibility for all creators</li>
                    <li>• Continuous innovation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Section */}
      <section className="px-12 py-20 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white text-4xl font-light mb-8 text-center">About Scenenix Media</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-8">
            <p className="text-zinc-400 text-lg leading-relaxed mb-6">
              Cinema iHub is developed and operated by <strong className="text-white">Scenenix Media 
              Broadcasting Private Limited</strong>, an innovative technology company based in 
              Hyderabad, Telangana, India.
            </p>
            <p className="text-zinc-400 text-lg leading-relaxed mb-6">
              Founded with the vision of transforming media production through artificial intelligence, 
              Scenenix Media combines deep technical expertise with a passion for cinematic storytelling.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-yellow-600 text-3xl font-light mb-2">2026</div>
                <div className="text-zinc-500 text-sm">Founded</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-600 text-3xl font-light mb-2">50+</div>
                <div className="text-zinc-500 text-sm">Cinematic Styles</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-600 text-3xl font-light mb-2">Global</div>
                <div className="text-zinc-500 text-sm">Creator Community</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="px-12 py-20 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white text-4xl font-light mb-12 text-center">Our Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-6">
              <div className="w-12 h-12 rounded-full bg-yellow-600/10 border border-yellow-600/20 flex items-center justify-center mb-4">
                <span className="text-yellow-600 text-xl">🎨</span>
              </div>
              <h3 className="text-white text-xl font-medium mb-3">DP-Curated Styles</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Every cinematic style is crafted by professional cinematographers, 
                ensuring reference-quality color grading and camera movements.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-6">
              <div className="w-12 h-12 rounded-full bg-yellow-600/10 border border-yellow-600/20 flex items-center justify-center mb-4">
                <span className="text-yellow-600 text-xl">⚡</span>
              </div>
              <h3 className="text-white text-xl font-medium mb-3">State-of-the-Art AI</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Powered by cutting-edge AI models from Runway ML, Pika Labs, and other 
                leading providers for the highest quality output.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-6">
              <div className="w-12 h-12 rounded-full bg-yellow-600/10 border border-yellow-600/20 flex items-center justify-center mb-4">
                <span className="text-yellow-600 text-xl">🔒</span>
              </div>
              <h3 className="text-white text-xl font-medium mb-3">Secure & Private</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Your creations and data are protected with enterprise-grade security. 
                You retain full ownership of all generated content.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-12 py-32 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white text-5xl font-light mb-6">
            Ready to Create<br />
            <span className="text-yellow-600 italic">Your Masterpiece?</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-12">
            Join creators worldwide using Cinema iHub to bring their visions to life
          </p>
          <a href="/sign-up">
            <button className="bg-yellow-600 text-black text-sm tracking-widest uppercase px-10 py-4 rounded-sm font-medium hover:bg-yellow-500 transition-all hover:scale-105">
              Start Creating Free
            </button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}