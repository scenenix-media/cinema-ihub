import Link from 'next/link'
import { auth } from '@/auth'

export default async function Navbar() {
  const session = await auth()

  return (
    <nav className="flex items-center justify-between px-12 py-5 border-b border-zinc-800">
      <Link href="/" className="flex items-center gap-3">
        <div className="w-8 h-8 bg-yellow-600 rounded-sm flex items-center justify-center">
          <span className="text-black font-bold text-sm">C</span>
        </div>
        <div>
          <div className="text-white text-sm font-medium tracking-wider">CINEMA</div>
          <div className="text-yellow-600 text-xs tracking-widest">iHUB</div>
        </div>
      </Link>

      <div className="flex items-center gap-8">
        <Link href="/generate" className="text-zinc-400 text-xs tracking-widest uppercase hover:text-white transition-colors">Generate</Link>
        <Link href="/gallery" className="text-zinc-400 text-xs tracking-widest uppercase hover:text-white transition-colors">Gallery</Link>
        <Link href="/pricing" className="text-zinc-400 text-xs tracking-widest uppercase hover:text-white transition-colors">Pricing</Link>
        <Link href="/dashboard" className="text-zinc-400 text-xs tracking-widest uppercase hover:text-white transition-colors">Dashboard</Link>
      </div>

      <div className="flex items-center gap-3">
        {!session?.user ? (
          <>
            <Link href="/sign-in" className="text-zinc-400 text-xs tracking-widest uppercase px-5 py-2 border border-zinc-700 rounded-sm hover:border-zinc-500 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/sign-up" className="bg-yellow-600 text-black text-xs tracking-widest uppercase px-5 py-2 rounded-sm font-medium hover:bg-yellow-500 transition-colors">
              Start Free
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-3">
            {session.user.image && (
              <img src={session.user.image} alt="" className="w-8 h-8 rounded-full" />
            )}
            <span className="text-white text-sm">{session.user.name}</span>
            <form action={async () => {
              'use server'
              const { signOut } = await import('@/auth')
              await signOut()
            }}>
              <button type="submit" className="text-zinc-400 text-xs tracking-widest uppercase px-4 py-2 border border-zinc-700 rounded-sm hover:border-zinc-500 hover:text-white transition-colors">
                Sign Out
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  )
}