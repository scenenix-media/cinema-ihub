// app/privacy/page.tsx 

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-12 py-20">
        <h1 className="text-white text-4xl font-light mb-2">Privacy Policy</h1>
        <p className="text-zinc-500 text-sm mb-12">Last updated: March 2, 2026</p>

        <div className="prose prose-invert prose-zinc max-w-none">
          
          <section className="mb-8">
            <h2 className="text-white text-2xl font-light mb-4">1. Introduction</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Cinema iHub ("we," "our," or "us") is operated by Scenenix Media Broadcasting Private Limited. 
              We are committed to protecting your personal information and your right to privacy. This Privacy 
              Policy explains how we collect, use, disclose, and safeguard your information when you use our 
              AI video generation platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white text-2xl font-light mb-4">2. Information We Collect</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">We collect information that you provide directly to us:</p>
            <ul className="text-zinc-400 space-y-2 mb-4">
              <li>• <strong className="text-white">Account Information:</strong> Name, email address, password</li>
              <li>• <strong className="text-white">Profile Information:</strong> Profile picture (if using Google OAuth)</li>
              <li>• <strong className="text-white">Content Data:</strong> Video generation prompts, settings, and generated content</li>
              <li>• <strong className="text-white">Payment Information:</strong> Processed securely through Stripe (coming soon)</li>
              <li>• <strong className="text-white">Usage Data:</strong> How you interact with our platform, features used, generation history</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-white text-2xl font-light mb-4">3. How We Use Your Information</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">We use your information to:</p>
            <ul className="text-zinc-400 space-y-2 mb-4">
              <li>• Provide, maintain, and improve our AI video generation services</li>
              <li>• Process your video generation requests and manage your account</li>
              <li>• Send you technical notices, updates, and support messages</li>
              <li>• Respond to your comments and questions</li>
              <li>• Monitor and analyze usage patterns to improve user experience</li>
              <li>• Detect, prevent, and address technical issues and security threats</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-white text-2xl font-light mb-4">4. Data Storage and Security</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Your data is stored securely using industry-standard encryption. We use Vercel's infrastructure 
              for hosting and Vercel Postgres for database storage. Generated videos are processed through 
              third-party AI services (Runway ML, Pika Labs) and stored temporarily during generation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white text-2xl font-light mb-4">5. Data Sharing</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">We do not sell your personal information. We may share your information with:</p>
            <ul className="text-zinc-400 space-y-2 mb-4">
              <li>• <strong className="text-white">Service Providers:</strong> Third-party AI generation services (Runway ML, Pika Labs) to process your video requests</li>
              <li>• <strong className="text-white">Payment Processors:</strong> Stripe for payment processing (when implemented)</li>
              <li>• <strong className="text-white">Legal Requirements:</strong> If required by law or to protect our rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-white text-2xl font-light mb-4">6. Your Rights</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">You have the right to:</p>
            <ul className="text-zinc-400 space-y-2 mb-4">
              <li>• Access, update, or delete your personal information</li>
              <li>• Export your data in a machine-readable format</li>
              <li>• Object to processing of your personal data</li>
              <li>• Withdraw consent at any time</li>
              <li>• Lodge a complaint with a supervisory authority</li>
            </ul>
            <p className="text-zinc-400 leading-relaxed">
              To exercise these rights, contact us at <a href="mailto:privacy@cinemaihub.com" className="text-yellow-600 hover:text-yellow-500">privacy@cinemaihub.com</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white text-2xl font-light mb-4">7. Data Retention</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              We retain your personal information for as long as your account is active or as needed to provide 
              you services. Generated videos are stored indefinitely unless you request deletion. You can delete 
              your account and all associated data at any time from your dashboard settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white text-2xl font-light mb-4">8. International Data Transfers</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Your information may be transferred to and processed in countries other than your country of 
              residence. We ensure appropriate safeguards are in place to protect your information in accordance 
              with this Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white text-2xl font-light mb-4">9. Changes to This Policy</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white text-2xl font-light mb-4">10. Contact Us</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <div className="text-zinc-400 space-y-1">
              <p>Email: <a href="mailto:privacy@cinemaihub.com" className="text-yellow-600 hover:text-yellow-500">privacy@cinemaihub.com</a></p>
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