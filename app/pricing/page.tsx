import Navbar from '@/components/Navbar'

const plans = [
  {
    name: "Free",
    price: 0,
    desc: "Start creating with no commitment.",
    credits: "10 generations/mo",
    features: ["720p resolution", "Pika Labs engine", "10 style presets", "3 projects", "2GB storage", "Community gallery"],
    cta: "Start Free",
    featured: false,
  },
  {
    name: "Studio",
    price: 39,
    desc: "For independent filmmakers and creators.",
    credits: "100 generations/mo",
    features: ["1080p HD exports", "Runway + Pika engines", "50 style presets", "Unlimited projects", "50GB storage", "Email support"],
    cta: "Start Studio",
    featured: false,
  },
  {
    name: "Director",
    price: 89,
    desc: "For professional studios and agencies.",
    credits: "500 generations/mo",
    features: ["4K Ultra HD exports", "All AI engines", "200+ style presets", "Custom LUT import", "200GB storage", "API access", "Client review portal", "Priority support"],
    cta: "Start Director",
    featured: true,
  },
  {
    name: "Enterprise",
    price: null,
    desc: "Custom plans for large productions.",
    credits: "Unlimited generations",
    features: ["Everything in Director", "Custom model training", "White-label options", "99.9% SLA", "Dedicated support", "On-premise option"],
    cta: "Contact Sales",
    featured: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-6xl mx-auto px-8 py-20">

        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-yellow-600/30 bg-yellow-600/10 text-yellow-500 text-xs tracking-widest uppercase px-3 py-1.5 rounded-full mb-6">
            Transparent Pricing
          </div>
          <h1 className="text-5xl font-light text-white mb-4">
            Invest in Your
            <br />
            <span className="italic text-yellow-500">Creative Vision</span>
          </h1>
          <p className="text-zinc-400 text-base max-w-md mx-auto leading-relaxed">
            All plans include access to the full generation studio. Upgrade or cancel anytime.
          </p>

          {/* BILLING TOGGLE */}
          <div className="inline-flex items-center bg-zinc-900 border border-zinc-800 rounded-sm p-1 mt-8 gap-1">
            <button className="text-xs px-5 py-2 rounded-sm text-zinc-400 hover:text-white transition-colors">Monthly</button>
            <button className="text-xs px-5 py-2 rounded-sm bg-zinc-800 text-white flex items-center gap-2">
              Annual
              <span className="bg-yellow-600 text-black text-xs px-1.5 py-0.5 rounded-sm font-medium">−25%</span>
            </button>
          </div>
        </div>

        {/* PLAN CARDS */}
        <div className="grid grid-cols-4 gap-4 mb-20">
          {plans.map((plan, i) => (
            <div key={i} className={`relative rounded-sm p-8 flex flex-col ${
              plan.featured
                ? 'bg-zinc-900 border border-yellow-600/40'
                : 'bg-zinc-950 border border-zinc-800'
            }`}>

              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-600 text-black text-xs px-3 py-1 rounded-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <div className={`text-xs tracking-widest uppercase mb-3 ${plan.featured ? 'text-yellow-500' : 'text-zinc-400'}`}>
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-1 mb-3">
                  {plan.price !== null ? (
                    <>
                      <span className="text-white text-4xl font-light">${plan.price}</span>
                      <span className="text-zinc-500 text-sm">/mo</span>
                    </>
                  ) : (
                    <span className="text-white text-3xl font-light">Custom</span>
                  )}
                </div>
                <p className="text-zinc-500 text-xs leading-relaxed mb-4">{plan.desc}</p>
                <div className={`text-xs px-3 py-2 rounded-sm font-medium ${
                  plan.featured ? 'bg-yellow-600/20 text-yellow-400' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  ✦ {plan.credits}
                </div>
              </div>

              <div className="flex-1 mb-6">
                {plan.features.map((f, j) => (
                  <div key={j} className="flex items-start gap-2 mb-3">
                    <span className={`text-xs mt-0.5 ${plan.featured ? 'text-yellow-500' : 'text-zinc-600'}`}>◆</span>
                    <span className="text-zinc-400 text-xs leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-3 text-xs tracking-widest uppercase rounded-sm transition-colors ${
                plan.featured
                  ? 'bg-yellow-600 text-black font-medium hover:bg-yellow-500'
                  : 'border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* COMPARISON TABLE */}
        <div>
          <h2 className="text-white text-xl font-light text-center mb-8">Full Feature Comparison</h2>
          <div className="border border-zinc-800 rounded-sm overflow-hidden">
            <div className="grid grid-cols-5 bg-zinc-900 px-6 py-4 border-b border-zinc-800">
              {["Feature", "Free", "Studio", "Director", "Enterprise"].map((h, i) => (
                <div key={h} className={`text-xs tracking-widest uppercase ${i === 0 ? 'text-zinc-400' : 'text-center ' + (i === 3 ? 'text-yellow-500' : 'text-zinc-400')}`}>{h}</div>
              ))}
            </div>
            {[
              ["Video Resolution",     "720p",     "1080p",    "4K",         "8K+"],
              ["Monthly Generations",  "10",       "100",      "500",        "Unlimited"],
              ["Cinematic Styles",     "10+",      "50+",      "200+",       "Custom"],
              ["API Access",           "✗",        "✗",        "✓",          "✓"],
              ["Custom LUT Import",    "✗",        "✗",        "✓",          "✓"],
              ["Client Review Portal", "✗",        "✗",        "✓",          "✓"],
              ["Team Members",         "1",        "1",        "Up to 5",    "Unlimited"],
              ["White-label",          "✗",        "✗",        "✗",          "✓"],
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-5 px-6 py-4 border-b border-zinc-800 last:border-0 ${i % 2 === 0 ? 'bg-zinc-950' : 'bg-black'}`}>
                <div className="text-zinc-300 text-sm">{row[0]}</div>
                {[row[1], row[2], row[3], row[4]].map((val, j) => (
                  <div key={j} className={`text-sm text-center ${
                    val === '✗' ? 'text-zinc-700' :
                    j === 2 ? 'text-yellow-400 font-medium' : 'text-zinc-300'
                  }`}>{val}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}