import { User as NextAuthUser } from "next-auth";

// Extend the built-in types of NextAuth
declare module "next-auth" {
  /**
   * The shape of the user object returned in the JWT and session callbacks.
   */
  interface User extends NextAuthUser {
    role?: string; // Your custom field
  }
}

import NextAuth ,{ DefaultSession }from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      role?: string
    } & DefaultSession["user"]
  }
}