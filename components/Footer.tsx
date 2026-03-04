// components/Footer.tsx

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 px-12 py-12 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-yellow-600 rounded-sm flex items-center justify-center">
                <span className="text-black font-bold text-sm">C</span>
              </div>
              <span className="text-white text-lg font-medium">Cinema iHub</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Professional-grade AI cinematography. Where vision becomes cinema.
            </p>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-white text-sm font-medium mb-4 tracking-wider uppercase">Product</h4>
            <ul className="space-y-3">
              <li><Link href="/generate" className="text-zinc-400 text-sm hover:text-white transition-colors">Generate</Link></li>
              <li><Link href="/gallery" className="text-zinc-400 text-sm hover:text-white transition-colors">Gallery</Link></li>
              <li><Link href="/pricing" className="text-zinc-400 text-sm hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/faq" className="text-zinc-400 text-sm hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white text-sm font-medium mb-4 tracking-wider uppercase">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-zinc-400 text-sm hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-zinc-400 text-sm hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-white text-sm font-medium mb-4 tracking-wider uppercase">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-zinc-400 text-sm hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-zinc-400 text-sm hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-sm">
            © 2026 Scenenix Media Broadcasting Private Limited. All rights reserved.
          </p>
          <div className="flex gap-6 text-zinc-600 text-sm">
            <a href="mailto:support@cinemaihub.com" className="hover:text-white transition-colors">
              support@cinemaihub.com
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}