import NextAuth, { AuthOptions } from "next-auth"; 
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/lib/prismadb";


export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
      }),
      // FacebookProvider({
      //   clientId: process.env.FACEBOOK_ID as string,
      //   clientSecret: process.env.FACEBOOK_SECRET as string,
      // }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        // Initial sign in
        if (user) {
          token.role = user.role; // Assuming 'role' is a field on your user object
        }
        return token;
      },
      async session({ session, token }) {
        // Send properties to the client, like an access_token and user id from a provider
        session.user.role = token.role as string;
        
        return session
    }
    },
    debug: process.env.NODE_ENV === "development",
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_URL,
  };

  export const handler = NextAuth(authOptions)