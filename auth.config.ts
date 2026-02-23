import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const authConfig: NextAuthConfig = {
  trustHost: true,
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: "jwt"
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" }
      },
      // authorize intentionally left out — runs in Node only (in auth.ts)
      authorize: async () => null
    })
  ],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user
      const isProtected =
        request.nextUrl.pathname.startsWith('/dashboard') ||
        request.nextUrl.pathname.startsWith('/generate')

      if (isProtected && !isLoggedIn) return false
      return true
    },
  },
}