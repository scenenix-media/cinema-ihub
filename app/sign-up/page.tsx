'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleEmailSignUp(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Create account
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        setLoading(false)
        return
      }

      // Sign in automatically after signup
      const signInResult = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (signInResult?.error) {
        setError('Account created but sign-in failed. Please try signing in.')
        setLoading(false)
        return
      }

      router.push('/dashboard')
      router.refresh()

    } catch (err) {
      setError('Something went wrong')
      setLoading(false)
    }
  }

  async function handleGoogleSignUp() {
    await signIn('google', { callbackUrl: '/dashboard' })
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* LOGO */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-10 h-10 bg-yellow-600 rounded-sm flex items-center justify-center">
            <span className="text-black font-bold">C</span>
          </div>
          <div>
            <div className="text-white text-base font-medium tracking-wider">CINEMA</div>
            <div className="text-yellow-600 text-xs tracking-widest">iHUB</div>
          </div>
        </div>

        {/* CARD */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
          
          <h1 className="text-white text-2xl font-light mb-2">Create your account</h1>
          <p className="text-zinc-400 text-sm mb-6">Start generating cinematic videos with AI</p>

          {/* GOOGLE BUTTON */}
          <button
            onClick={handleGoogleSignUp}
            className="w-full bg-white text-black py-3 rounded-sm text-sm font-medium hover:bg-zinc-100 transition-colors flex items-center justify-center gap-3 mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-zinc-700" />
            <span className="text-zinc-500 text-xs uppercase">Or</span>
            <div className="flex-1 h-px bg-zinc-700" />
          </div>

          {/* EMAIL/PASSWORD FORM */}
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            
            {error && (
              <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-sm text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="text-zinc-400 text-xs tracking-wider uppercase block mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-yellow-600 transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="text-zinc-400 text-xs tracking-wider uppercase block mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-yellow-600 transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="text-zinc-400 text-xs tracking-wider uppercase block mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-yellow-600 transition-colors"
                placeholder="At least 8 characters"
                minLength={8}
              />
              <p className="text-zinc-600 text-xs mt-1">Must be at least 8 characters</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-600 text-black py-3 rounded-sm text-sm font-medium tracking-wider uppercase hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="text-zinc-500 text-xs text-center mt-6">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-yellow-500 hover:text-yellow-400 transition-colors">
              Sign in
            </Link>
          </p>

          <p className="text-zinc-600 text-xs text-center mt-4 leading-relaxed">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}