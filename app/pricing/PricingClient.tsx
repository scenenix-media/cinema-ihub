// app/pricing/PricingClient.tsx

'use client'

import Link from 'next/link'
import { useState } from 'react'

const plans = [
  {
    id: 'free',
    name: 'FREE',
    monthlyPrice: 0,
    annualPrice: 0,
    label: null,
    description: 'Perfect for trying out Cinema iHub',
    generations: '10 generations/mo',
    features: [
      '720p resolution',
      'Pika Labs engine',
      '10 style presets',
      '3 projects',
      '2GB storage',
      'Community gallery'
    ],
    cta: 'Start Free',
    ctaLink: '/sign-up',
    highlighted: false
  },
  {
    id: 'studio',
    name: 'STUDIO',
    monthlyPrice: 2999,
    annualPrice: 2249,
    label: 'Most Popular',
    description: 'For serious creators and agencies',
    generations: '100 generations/mo',
    features: [
      '1080p HD exports',
      'Runway + Pika engines',
      '50+ style presets',
      'Unlimited projects',
      '50GB storage',
      'Email support'
    ],
    cta: 'Start Studio',
    ctaLink: '/sign-up',
    highlighted: true
  },
  {
    id: 'director',
    name: 'DIRECTOR',
    monthlyPrice: 7999,
    annualPrice: 5999,
    label: null,
    description: 'For professional studios and agencies',
    generations: '500 generations/mo',
    features: [
      '4K Ultra HD exports',
      'All AI engines',
      '200+ style presets',
      'Custom LUT import',
      '200GB storage',
      'API access',
      'Client review portal',
      'Priority support'
    ],
    cta: 'Start Director',
    ctaLink: '/sign-up',
    highlighted: false
  },
  {
    id: 'enterprise',
    name: 'ENTERPRISE',
    monthlyPrice: null,
    annualPrice: null,
    label: null,
    description: 'Custom plans for large productions',
    generations: 'Unlimited generations',
    features: [
      '8K+ resolution',
      'Everything in Director',
      'Custom model training',
      'White-label options',
      '99.9% SLA',
      'Dedicated support',
      'On-premise option'
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact',
    highlighted: false
  }
]

const comparisonFeatures = [
  { name: 'Video Resolution', free: '720p', studio: '1080p', director: '4K', enterprise: '8K+' },
  { name: 'Monthly Generations', free: '10', studio: '100', director: '500', enterprise: 'Unlimited' },
  { name: 'Cinematic Styles', free: '10+', studio: '50+', director: '200+', enterprise: 'Custom' },
  { name: 'API Access', free: false, studio: false, director: true, enterprise: true },
  { name: 'Custom LUT Import', free: false, studio: false, director: true, enterprise: true },
  { name: 'Client Review Portal', free: false, studio: false, director: true, enterprise: true },
  { name: 'Team Members', free: '1', studio: '1', director: 'Up to 5', enterprise: 'Unlimited' },
  { name: 'White-label', free: false, studio: false, director: false, enterprise: true },
]

export default function PricingClient() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <div className="px-12 py-20">
      
      {/* HEADER */}
      <div className="text-center mb-12">
        <div className="inline-block px-4 py-1 bg-yellow-600/10 border border-yellow-600/30 rounded-full mb-6">
          <span className="text-yellow-600 text-xs tracking-widest uppercase">Transparent Pricing</span>
        </div>
        <h1 className="text-white text-5xl font-light mb-4">
          Invest in Your<br />
          <span className="text-yellow-600 italic">Creative Vision</span>
        </h1>
        <p className="text-zinc-500 text-lg max-w-2xl mx-auto mb-8">
          All plans include access to the full generation studio. Upgrade or cancel anytime.
        </p>

        {/* BILLING TOGGLE */}
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-zinc-500'}`}>Monthly</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-16 h-8 bg-zinc-800 rounded-full border border-zinc-700 transition-colors hover:border-zinc-600"
          >
            <div className={`absolute top-1 left-1 w-6 h-6 bg-yellow-600 rounded-full transition-transform ${
              isAnnual ? 'translate-x-8' : ''
            }`} />
          </button>
          <span className={`text-sm ${isAnnual ? 'text-white' : 'text-zinc-500'}`}>
            Annual
            <span className="ml-2 px-2 py-0.5 bg-yellow-600 text-black text-xs rounded-sm font-medium">-25%</span>
          </span>
        </div>
      </div>

      {/* PRICING CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-zinc-900 rounded-sm overflow-hidden relative ${
              plan.highlighted 
                ? 'border-2 border-yellow-600 shadow-lg shadow-yellow-600/20' 
                : 'border border-zinc-800'
            }`}
          >
              {plan.label && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-3 py-1 bg-yellow-600 text-black text-xs tracking-wider uppercase rounded-sm font-medium shadow-lg">
                    {plan.label}
                  </span>
                </div>
              )}

            <div className={`p-6 ${plan.label ? 'pt-8' : ''}`}>
              {/* PLAN NAME */}
              <h3 className="text-zinc-500 text-xs tracking-widest uppercase mb-2">{plan.name}</h3>
              
              {/* PRICE */}
              <div className="mb-3">
                {plan.monthlyPrice === null ? (
                  <span className="text-white text-4xl font-light">Custom</span>
                ) : (
                  <>
                    <span className="text-white text-4xl font-light">
                      ₹{isAnnual ? plan.annualPrice.toLocaleString('en-IN') : plan.monthlyPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-zinc-500 text-sm ml-1">/mo</span>
                  </>
                )}
              </div>

              {/* GENERATIONS */}
              <p className="text-yellow-600 text-sm mb-6">{plan.generations}</p>

              {/* CTA BUTTON */}
              <Link href={plan.ctaLink}>
                <button className={`w-full text-xs tracking-widest uppercase py-3 rounded-sm font-medium mb-6 transition-colors ${
                  plan.highlighted
                    ? 'bg-yellow-600 text-black hover:bg-yellow-500'
                    : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700'
                }`}>
                  {plan.cta}
                </button>
              </Link>

              {/* FEATURES LIST */}
              <div className="space-y-3">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-yellow-600 text-sm mt-0.5">✦</span>
                    <span className="text-zinc-400 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* COMPARISON TABLE */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-3xl font-light text-center mb-10">Full Feature Comparison</h2>
        
        <div className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden">
          {/* TABLE HEADER */}
          <div className="grid grid-cols-5 border-b border-zinc-800 bg-zinc-800/50">
            <div className="px-6 py-4 text-zinc-500 text-xs tracking-widest uppercase">Feature</div>
            <div className="px-6 py-4 text-zinc-500 text-xs tracking-widest uppercase text-center">Free</div>
            <div className="px-6 py-4 text-zinc-500 text-xs tracking-widest uppercase text-center">Studio</div>
            <div className="px-6 py-4 text-yellow-600 text-xs tracking-widest uppercase text-center font-medium">Director</div>
            <div className="px-6 py-4 text-zinc-500 text-xs tracking-widest uppercase text-center">Enterprise</div>
          </div>

          {/* TABLE ROWS */}
          {comparisonFeatures.map((feature, i) => (
            <div
              key={i}
              className="grid grid-cols-5 border-b border-zinc-800 last:border-0 hover:bg-zinc-800/30 transition-colors"
            >
              <div className="px-6 py-4 text-white text-sm">{feature.name}</div>
              <div className="px-6 py-4 text-zinc-400 text-sm text-center">
                {typeof feature.free === 'boolean' ? (
                  feature.free ? <span className="text-green-500">✓</span> : <span className="text-zinc-700">✗</span>
                ) : (
                  feature.free
                )}
              </div>
              <div className="px-6 py-4 text-zinc-400 text-sm text-center">
                {typeof feature.studio === 'boolean' ? (
                  feature.studio ? <span className="text-green-500">✓</span> : <span className="text-zinc-700">✗</span>
                ) : (
                  feature.studio
                )}
              </div>
              <div className="px-6 py-4 text-yellow-600 text-sm text-center font-medium">
                {typeof feature.director === 'boolean' ? (
                  feature.director ? <span className="text-yellow-600">✓</span> : <span className="text-zinc-700">✗</span>
                ) : (
                  feature.director
                )}
              </div>
              <div className="px-6 py-4 text-zinc-400 text-sm text-center">
                {typeof feature.enterprise === 'boolean' ? (
                  feature.enterprise ? <span className="text-green-500">✓</span> : <span className="text-zinc-700">✗</span>
                ) : (
                  feature.enterprise
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="text-center mt-20 max-w-3xl mx-auto">
        <p className="text-zinc-500 text-sm mb-4">
          All plans include access to our community gallery, regular AI model updates, and standard support.
        </p>
        <p className="text-zinc-600 text-xs">
          Need something custom? <Link href="/contact" className="text-yellow-600 hover:text-yellow-500">Contact us</Link> for enterprise pricing.
        </p>
      </div>

    </div>
  )
}