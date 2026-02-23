import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "./auth.config"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    ...authConfig.providers,
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" }
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })

        if (!user?.password) return null

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isValid) return null

        return { id: user.id, email: user.email, name: user.name, image: user.image }
      }
    })
  ],
  callbacks: {
    ...authConfig.callbacks,
    
    // CREATE USER IN DATABASE ON FIRST SIGN-IN
    async signIn({ user, account }) {
      // Only for OAuth providers (Google, etc)
      if (account?.provider === 'google') {
        if (!user.email) return false

        // Check if user exists
        let dbUser = await prisma.user.findUnique({
          where: { email: user.email }
        })

        // Create user if doesn't exist
        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
              credits: 10,
              plan: 'free',
            }
          })
          console.log('✅ New Google user created:', dbUser.email)
        }

        // Update user ID to database ID (important!)
        user.id = dbUser.id
      }

      return true
    },

    async jwt({ token, user, account }) {
      // On sign-in, get user from database
      if (account?.provider === 'google' && user.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email }
        })
        if (dbUser) {
          token.id = dbUser.id
        }
      }
      
      if (user) {
        token.id = user.id
      }
      
      return token
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})