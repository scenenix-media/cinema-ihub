// app/contact/page.tsx

'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission (you can integrate with email service later)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setSubmitted(true)
    setLoading(false)
    setFormData({ name: '', email: '', subject: '', message: '' })

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-12 py-20">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-white text-5xl font-light mb-4">Get in Touch</h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Have questions about Cinema iHub? We're here to help. Send us a message 
            and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-8">
            <h2 className="text-white text-2xl font-light mb-6">Send us a Message</h2>
            
            {submitted && (
              <div className="bg-green-900/20 border border-green-800 text-green-400 px-4 py-3 rounded-sm mb-6 text-sm">
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="text-zinc-400 text-sm mb-2 block">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-yellow-600"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="text-zinc-400 text-sm mb-2 block">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-yellow-600"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="text-zinc-400 text-sm mb-2 block">Subject</label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-yellow-600"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="feature">Feature Request</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-zinc-400 text-sm mb-2 block">Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={6}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-yellow-600 resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-600 text-black text-sm tracking-widest uppercase py-3 rounded-sm font-medium hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>

            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            
            {/* Support Email */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-600/10 border border-yellow-600/20 flex items-center justify-center shrink-0">
                  <span className="text-yellow-600 text-xl">✉</span>
                </div>
                <div>
                  <h3 className="text-white text-lg font-medium mb-2">Email Support</h3>
                  <p className="text-zinc-400 text-sm mb-3">
                    For general inquiries and support questions
                  </p>
                  <a href="mailto:support@cinemaihub.com" className="text-yellow-600 hover:text-yellow-500 text-sm">
                    support@cinemaihub.com
                  </a>
                </div>
              </div>
            </div>

            {/* Business Email */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-600/10 border border-yellow-600/20 flex items-center justify-center shrink-0">
                  <span className="text-yellow-600 text-xl">💼</span>
                </div>
                <div>
                  <h3 className="text-white text-lg font-medium mb-2">Business Inquiries</h3>
                  <p className="text-zinc-400 text-sm mb-3">
                    For partnerships and enterprise solutions
                  </p>
                  <a href="mailto:business@cinemaihub.com" className="text-yellow-600 hover:text-yellow-500 text-sm">
                    business@cinemaihub.com
                  </a>
                </div>
              </div>
            </div>

            {/* Office Address */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-600/10 border border-yellow-600/20 flex items-center justify-center shrink-0">
                  <span className="text-yellow-600 text-xl">📍</span>
                </div>
                <div>
                  <h3 className="text-white text-lg font-medium mb-2">Office</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Scenenix Media Broadcasting Private Limited<br />
                    Hyderabad, Telangana<br />
                    India
                  </p>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-600/10 border border-yellow-600/20 flex items-center justify-center shrink-0">
                  <span className="text-yellow-600 text-xl">⏱</span>
                </div>
                <div>
                  <h3 className="text-white text-lg font-medium mb-2">Response Time</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    We typically respond within 24-48 hours during business days. 
                    For urgent technical issues, please include "URGENT" in your subject line.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      <Footer />
    </div>
  )
}