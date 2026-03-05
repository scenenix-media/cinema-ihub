// app/faq/FAQClient.tsx

'use client'

import { useState } from 'react'

const faqs = [
  // Getting Started
  {
    category: 'Getting Started',
    question: 'What is Cinema iHub?',
    answer: 'Cinema iHub is a professional AI-powered video generation platform that allows you to create cinematic-grade videos using text prompts and curated cinematographic styles.'
  },
  {
    category: 'Getting Started',
    question: 'How do I get started?',
    answer: 'Simply sign up for a free account at cinemaihub.com. You\'ll receive 10 free credits to start generating videos immediately. No credit card required for the free tier.'
  },
  {
    category: 'Getting Started',
    question: 'Do I need any video editing experience?',
    answer: 'No! Cinema iHub is designed to be simple and accessible. Just choose a cinematic style, describe your vision, and our AI handles the rest. No complex timelines or editing required.'
  },
  
  // Credits & Pricing
  {
    category: 'Credits & Pricing',
    question: 'How does the credit system work?',
    answer: 'Each video generation costs credits based on duration. Generally, 2 credits are used per 5 seconds of video. Your plan determines how many credits you receive each month.'
  },
  {
    category: 'Credits & Pricing',
    question: 'What happens to unused credits?',
    answer: 'Credits reset at the beginning of each billing cycle and do not roll over. Make sure to use your monthly allocation before it resets.'
  },
  {
    category: 'Credits & Pricing',
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes! You can change your plan at any time from your dashboard. Upgrades take effect immediately, while downgrades take effect at the start of your next billing cycle.'
  },
  {
    category: 'Credits & Pricing',
    question: 'Do you offer refunds?',
    answer: 'Due to the computational costs of AI generation, credits are non-refundable once used. However, if you experience technical issues preventing you from using the service, contact our support team.'
  },
  
  // Video Generation
  {
    category: 'Video Generation',
    question: 'What video formats are supported?',
    answer: 'Videos are generated in MP4 format with H.264 encoding, compatible with all major platforms and devices.'
  },
  {
    category: 'Video Generation',
    question: 'How long does it take to generate a video?',
    answer: 'Most videos are generated in 30-60 seconds, depending on duration and complexity. You\'ll see real-time progress updates during generation.'
  },
  {
    category: 'Video Generation',
    question: 'What resolutions are available?',
    answer: 'Free plan: 720p | Studio plan: 1080p HD | Director plan: 4K Ultra HD. Resolution is automatically set based on your subscription tier.'
  },
  {
    category: 'Video Generation',
    question: 'Can I generate videos from images?',
    answer: 'Image-to-video generation is coming soon! Currently, we support text-to-video with our curated cinematic styles.'
  },
  
  // Styles & Quality
  {
    category: 'Styles & Quality',
    question: 'What are cinematic styles?',
    answer: 'Our cinematic styles are professionally curated presets that include specific color grading, camera movements, and lighting setups inspired by real films and cinematographers.'
  },
  {
    category: 'Styles & Quality',
    question: 'Can I create my own custom styles?',
    answer: 'Custom style creation is currently available on the Director plan. Community-submitted styles marketplace is coming soon!'
  },
  {
    category: 'Styles & Quality',
    question: 'How can I improve my results?',
    answer: 'Be specific in your prompts, use descriptive language about lighting and camera movement, and experiment with different cinematic styles to find what works best for your vision.'
  },
  
  // Account & Privacy
  {
    category: 'Account & Privacy',
    question: 'Who owns the videos I create?',
    answer: 'You own all rights to videos you generate using Cinema iHub. You can use them commercially without attribution (though we appreciate it!).'
  },
  {
    category: 'Account & Privacy',
    question: 'Is my data secure?',
    answer: 'Yes. We use enterprise-grade encryption and security. Your account data is stored securely, and we never sell your personal information. See our Privacy Policy for details.'
  },
  {
    category: 'Account & Privacy',
    question: 'Can I delete my account?',
    answer: 'Yes, you can delete your account anytime from your dashboard settings. This will permanently remove all your data and generated content.'
  },
  
  // Technical
  {
    category: 'Technical',
    question: 'What browsers are supported?',
    answer: 'Cinema iHub works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend Chrome for the best experience.'
  },
  {
    category: 'Technical',
    question: 'Is there a mobile app?',
    answer: 'Not yet, but our web platform is fully mobile-responsive. You can use Cinema iHub from any mobile browser. Native apps are on our roadmap!'
  },
  {
    category: 'Technical',
    question: 'Do you have an API?',
    answer: 'API access is available on the Director plan for developers who want to integrate Cinema iHub into their applications.'
  }
]

const categories = ['All', 'Getting Started', 'Credits & Pricing', 'Video Generation', 'Styles & Quality', 'Account & Privacy', 'Technical']

export default function FAQClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredFAQs = activeCategory === 'All' 
    ? faqs 
    : faqs.filter(f => f.category === activeCategory)

  return (
    <div className="max-w-5xl mx-auto px-12 py-20">
      
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-white text-5xl font-light mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-zinc-400 text-lg">
          Everything you need to know about Cinema iHub
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs px-4 py-2 rounded-sm border transition-colors ${
              activeCategory === cat
                ? 'bg-yellow-600 border-yellow-600 text-black font-medium'
                : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {filteredFAQs.map((faq, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden hover:border-zinc-700 transition-colors"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left"
            >
              <div className="flex-1">
                <span className="text-yellow-600 text-xs tracking-wider uppercase block mb-1">
                  {faq.category}
                </span>
                <span className="text-white text-lg font-medium">
                  {faq.question}
                </span>
              </div>
              <span className={`text-yellow-600 text-2xl transition-transform ${
                openIndex === index ? 'rotate-45' : ''
              }`}>
                +
              </span>
            </button>
            
            {openIndex === index && (
              <div className="px-6 pb-5 pt-2">
                <p className="text-zinc-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Still Have Questions */}
      <div className="mt-20 text-center bg-zinc-900 border border-zinc-800 rounded-sm p-12">
        <h2 className="text-white text-3xl font-light mb-4">
          Still Have Questions?
        </h2>
        <p className="text-zinc-400 mb-8">
          Can't find the answer you're looking for? Our support team is here to help.
        </p>
        <a href="/contact">
          <button className="bg-yellow-600 text-black text-sm tracking-widest uppercase px-8 py-3 rounded-sm font-medium hover:bg-yellow-500 transition-colors">
            Contact Support
          </button>
        </a>
      </div>

    </div>
  )
}