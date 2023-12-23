import { withAuth } from "next-auth/middleware"

export default withAuth({
    pages: {
        signIn: '/'
    },
    callbacks: {
        authorized: ({ req, token }) => {
            // Check if the user is trying to access an admin route
            if (req.nextUrl.pathname.startsWith('/admin')) {
                // Check if the user has the admin role
                return token?.role === 'admin';
            }

            // Allow access to non-admin routes
            return true;
        }
    }
})

export const config = {
    matchers: [
        "/admin/:path*"
    ]
}