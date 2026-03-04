// app/pricing/page.tsx

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    credits: '10 credits/month',
    features: [
      '10 video generations per month',
      '720p resolution',
      '8 second max duration',
      'Community gallery access',
      'Watermarked exports',
    ],
    cta: 'Get Started',
    ctaLink: '/sign-up',
    popular: false,
  },
  {
    name: 'Studio',
    price: '$29',
    period: 'per month',
    credits: '100 credits/month',
    features: [
      '100 video generations per month',
      '1080p HD resolution',
      '30 second max duration',
      'Priority processing queue',
      'No watermarks',
      'Download in multiple formats',
      'Project organization',
    ],
    cta: 'Coming Soon',
    ctaLink: '#',
    popular: true,
  },
  {
    name: 'Director',
    price: '$99',
    period: 'per month',
    credits: '500 credits/month',
    features: [
      '500 video generations per month',
      '4K Ultra HD resolution',
      'Unlimited duration',
      'Fastest processing (GPU priority)',
      'API access',
      'Bulk operations',
      'Team collaboration (5 seats)',
      'Priority support',
      'Custom AI model training',
    ],
    cta: 'Coming Soon',
    ctaLink: '#',
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="px-12 py-20">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-white text-5xl font-light mb-4">
            Choose Your Plan
          </h1>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
            From hobbyists to professional studios, we have a plan that fits your creative vision
          </p>
        </div>

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-zinc-900 rounded-sm overflow-hidden relative ${
                plan.popular 
                  ? 'border-2 border-yellow-600 shadow-lg shadow-yellow-600/20' 
                  : 'border border-zinc-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-yellow-600 text-black text-xs tracking-widest uppercase text-center py-2 font-medium">
                  Most Popular
                </div>
              )}

              <div className={`p-8 ${plan.popular ? 'pt-14' : ''}`}>
                {/* PLAN NAME */}
                <h3 className="text-white text-xl font-medium mb-2">{plan.name}</h3>
                
                {/* PRICE */}
                <div className="mb-2">
                  <span className="text-white text-5xl font-light">{plan.price}</span>
                  <span className="text-zinc-500 text-sm ml-2">/ {plan.period}</span>
                </div>

                {/* CREDITS */}
                <p className="text-yellow-600 text-sm mb-6">{plan.credits}</p>

                {/* CTA BUTTON */}
                {plan.ctaLink === '#' ? (
                  <button
                    disabled
                    className="w-full bg-zinc-800 text-zinc-500 text-xs tracking-widest uppercase py-3 rounded-sm font-medium cursor-not-allowed mb-8"
                  >
                    {plan.cta}
                  </button>
                ) : (
                  <Link href={plan.ctaLink}>
                    <button className={`w-full text-xs tracking-widest uppercase py-3 rounded-sm font-medium mb-8 transition-colors ${
                      plan.popular
                        ? 'bg-yellow-600 text-black hover:bg-yellow-500'
                        : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700'
                    }`}>
                      {plan.cta}
                    </button>
                  </Link>
                )}

                {/* FEATURES LIST */}
                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-yellow-600 mt-0.5">✓</span>
                      <span className="text-zinc-400 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ / FOOTER */}
        <div className="text-center mt-16 max-w-3xl mx-auto">
          <p className="text-zinc-500 text-sm mb-4">
            All plans include access to our community gallery, regular AI model updates, and standard support.
          </p>
          <p className="text-zinc-600 text-xs">
            Need something custom? <Link href="/sign-up" className="text-yellow-600 hover:text-yellow-500">Contact us</Link> for enterprise pricing.
          </p>
        </div>

      </div>
      <Footer />
    </div>
  )
}