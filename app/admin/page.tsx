'use client'

import { signOut } from "next-auth/react";

export default function AdminPage () {
    return (
        <>
            <div className="h-screen w-screen flex flex-col items-center justify-center">
                Hello Admin
                <button onClick={()=> signOut()}>Logout</button>
            </div>
        </>
    )
}