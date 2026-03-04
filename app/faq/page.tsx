// app/faq/page.tsx

"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

type FAQ = {
  category: string
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    category: "Getting Started",
    question: "What is Cinema iHub?",
    answer:
      "Cinema iHub is an AI-powered cinematic video generation platform that allows creators to produce professional-quality videos using text prompts and curated film-style presets.",
  },
  {
    category: "Getting Started",
    question: "How do I get started?",
    answer:
      "Create a free account at cinemaihub.com. Once registered you will receive free credits to begin generating AI cinematic videos instantly.",
  },
  {
    category: "Getting Started",
    question: "Do I need video editing experience?",
    answer:
      "No. Cinema iHub is designed for creators of all levels. Simply describe your scene and select a cinematic style. The AI handles the video generation automatically.",
  },

  {
    category: "Credits & Pricing",
    question: "How do credits work?",
    answer:
      "Credits are used to generate videos. The number of credits consumed depends on the video duration and quality settings selected.",
  },
  {
    category: "Credits & Pricing",
    question: "Do unused credits roll over?",
    answer:
      "No. Credits reset at the start of each billing cycle according to your subscription plan.",
  },
  {
    category: "Credits & Pricing",
    question: "Can I change my subscription plan?",
    answer:
      "Yes. You can upgrade or downgrade your plan anytime from the dashboard settings.",
  },

  {
    category: "Video Generation",
    question: "How long does it take to generate a video?",
    answer:
      "Most videos are generated within 30–60 seconds depending on complexity and duration.",
  },
  {
    category: "Video Generation",
    question: "What format are generated videos?",
    answer:
      "Videos are delivered in MP4 format with H.264 encoding which is supported by all major platforms.",
  },
  {
    category: "Video Generation",
    question: "What resolutions are supported?",
    answer:
      "Free plan supports 720p. Higher plans unlock Full HD and Ultra HD video generation.",
  },

  {
    category: "Styles & Quality",
    question: "What are cinematic styles?",
    answer:
      "Cinematic styles are curated presets that replicate film aesthetics such as color grading, lighting, camera movement, and visual mood.",
  },
  {
    category: "Styles & Quality",
    question: "Can I create custom styles?",
    answer:
      "Advanced plans allow users to build custom cinematic styles and reusable prompt presets.",
  },

  {
    category: "Account & Privacy",
    question: "Who owns the generated videos?",
    answer:
      "You retain full ownership and usage rights for videos generated using your account.",
  },
  {
    category: "Account & Privacy",
    question: "Is my data secure?",
    answer:
      "Yes. Cinema iHub uses secure infrastructure and encryption to protect user data and generated content.",
  },

  {
    category: "Technical",
    question: "Which browsers are supported?",
    answer:
      "Cinema iHub works on Chrome, Firefox, Safari, and Edge. Chrome is recommended for best performance.",
  },
  {
    category: "Technical",
    question: "Is there a mobile app?",
    answer:
      "Not yet. However the platform is fully responsive and works on mobile browsers.",
  },
]

const categories = [
  "All",
  "Getting Started",
  "Credits & Pricing",
  "Video Generation",
  "Styles & Quality",
  "Account & Privacy",
  "Technical",
] as const

export default function FAQPage() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("All")

  const [openQuestion, setOpenQuestion] = useState<string | null>(null)

  const filteredFAQs = useMemo(() => {
    if (activeCategory === "All") return faqs
    return faqs.filter((f) => f.category === activeCategory)
  }, [activeCategory])

  function toggle(question: string) {
    setOpenQuestion(openQuestion === question ? null : question)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-zinc-400 text-lg">
            Everything you need to know about Cinema iHub
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat)
                setOpenQuestion(null)
              }}
              className={`px-4 py-2 text-xs border rounded-sm transition-colors ${
                activeCategory === cat
                  ? "bg-yellow-600 border-yellow-600 text-black"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.map((faq) => {
            const isOpen = openQuestion === faq.question

            return (
              <div
                key={faq.question}
                className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden"
              >
                <button
                  onClick={() => toggle(faq.question)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <div>
                    <span className="text-yellow-600 text-xs uppercase tracking-wider block mb-1">
                      {faq.category}
                    </span>
                    <span className="text-lg font-medium">
                      {faq.question}
                    </span>
                  </div>

                  <span
                    className={`text-yellow-500 text-2xl transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Support CTA */}
        <div className="mt-20 text-center bg-zinc-900 border border-zinc-800 rounded-sm p-12">
          <h2 className="text-3xl font-light mb-4">
            Still have questions?
          </h2>

          <p className="text-zinc-400 mb-8">
            Our support team is ready to help you.
          </p>

          <Link
            href="/contact"
            className="inline-block bg-yellow-600 text-black px-8 py-3 text-sm uppercase tracking-wider rounded-sm font-medium hover:bg-yellow-500 transition-colors"
          >
            Contact Support
          </Link>
        </div>

      </div>

      <Footer />
    </div>
  )
}