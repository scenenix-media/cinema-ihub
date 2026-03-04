// app/terms/page.tsx

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-12 py-20">
        <h1 className="text-white text-4xl font-light mb-2">Terms of Service</h1>
        <p className="text-zinc-500 text-sm mb-12">Last updated: March 2, 2026</p>

        <div className="prose prose-invert prose-zinc max-w-none">
          
          <section className="mb-8">
            <h2 className="text-white text-2xl font-light mb-4">1. Acceptance of Terms</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              By accessing and using Cinema iHub ("Service"), operated by Scenenix Media Broadcasting Private 
              Limited ("Company," "we," "us," or "our"), you accept and agree to be bound by these Terms of 
              Service. If you do not agree to these terms, please do not use our Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white text-2xl font-light mb-4">2. Description of Service</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Cinema iHub is an AI-powered video generation platform that allows users to create cinematic-grade 
              videos using artificial intelligence. The Service includes:
            </p>
            <ul className="text-zinc-400 space-y-2 mb-4">
              <li>• Text-to-video generation with curated cinematic styles</li>
              <li>• Professional color grading and camera movement presets</li>
              <li>• Credit-based usage system</li>
              <li>• User dashboard and generation management</li>
              <li>• Community gallery features</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-white text-2xl font-light mb-4">3. Account Registration</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              To use Cinema iHub, you must create an account. You agree to:
            </p>
            <ul className="text-zinc-400 space-y-2 mb-4">
              <li>• Provide accurate, current, and complete information</li>
              <li>• Maintain and update your information</li>
              <li>• Maintain the security of your password</li>
              <li>• Accept responsibility for all activities under your account</li>
              <li>• Notify us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-white text-2xl font-light mb-4">4. Credits and Pricing</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Cinema iHub operates on a credit-based system:
            </p>
            <ul className="text-zinc-400 space-y-2 mb-4">
              <li>• Free Plan: 10 credits per month</li>
              <li>• Studio Plan: 100 credits per month ($29/month)</li>
              <li>• Director Plan: 500 credits per month ($99/month)</li>
              <li>• Credits are non-refundable and expire at the end of each billing cycle</li>
              <li>• Unused credits do not roll over to the next month</li>
              <li>• Pricing is subject to change with 30 days notice</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-white text-2xl font-light mb-4">5. Acceptable Use Policy</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">You agree NOT to use Cinema iHub to:</p>
            <ul className="text-zinc-400 space-y-2 mb-4">
              <li>• Generate illegal, harmful, or offensive content</li>
              <li>• Create deepfakes or misleading content impersonating real people</li>
              <li>• Violate intellectual property rights</li>
              <li>• Generate content depicting minors in any inappropriate context</li>
              <li>• Create spam, malware, or fraudulent content</li>
              <li>• Attempt to reverse-engineer or abuse our AI systems</li>
              <li>• Share accounts or resell access to the Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-white text-2xl font-light mb-4">6. Intellectual Property Rights</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              <strong className="text-white">Your Content:</strong> You retain all ownership rights to content 
              you generate using Cinema iHub. By using our Service, you grant us a limited license to process, 
              store, and display your generations as necessary to provide the Service.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-4">
              <strong className="text-white">Our Platform:</strong> Cinema iHub, including all code, designs, 
              styles, and documentation, is owned by Scenenix Media Broadcasting Private Limited and protected 
              by copyright and intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white text-2xl font-light mb-4">7. Content Guidelines</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              All content generated through Cinema iHub must comply with our content guidelines. We reserve 
              the right to remove any content that violates these terms or applicable laws. Repeated violations 
              may result in account suspension or termination.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white text-2xl font-light mb-4">8. Disclaimers and Limitations</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. We do not guarantee:
            </p>
            <ul className="text-zinc-400 space-y-2 mb-4">
              <li>• Uninterrupted or error-free operation</li>
              <li>• Specific quality or accuracy of generated videos</li>
              <li>• That generated content will meet your requirements</li>
              <li>• That the Service will always be available</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-white text-2xl font-light mb-4">9. Limitation of Liability</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, Scenenix Media Broadcasting Private Limited SHALL NOT 
              BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS 
              OF PROFITS OR REVENUES.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white text-2xl font-light mb-4">10. Termination</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              We reserve the right to suspend or terminate your account at any time for violations of these 
              Terms. You may cancel your account at any time through your dashboard settings. Upon termination, 
              your right to use the Service will immediately cease.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white text-2xl font-light mb-4">11. Changes to Terms</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              We may modify these Terms at any time. We will notify users of material changes via email or 
              through the Service. Continued use after changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white text-2xl font-light mb-4">12. Governing Law</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              These Terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive 
              jurisdiction of the courts in Hyderabad, Telangana, India.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white text-2xl font-light mb-4">13. Contact Information</h2>
            <div className="text-zinc-400 space-y-1">
              <p>For questions about these Terms, contact us:</p>
              <p>Email: <a href="mailto:legal@cinemaihub.com" className="text-yellow-600 hover:text-yellow-500">legal@cinemaihub.com</a></p>
              <p>Company: Scenenix Media Broadcasting Private Limited</p>
              <p>Address: Hyderabad, Telangana, India</p>
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  )
}