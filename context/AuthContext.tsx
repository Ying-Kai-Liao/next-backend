"use client"

import { SessionProvider } from "next-auth/react" 

type AuthConetextProps = {
    children: React.ReactNode
}

export default function AuthContext ({
    children
}: AuthConetextProps) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}