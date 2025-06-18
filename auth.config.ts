import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  trustHost: true,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isHome = nextUrl.pathname === '/';

      // Block unauthenticated users from dashboard
      if (isDashboard) {
        return isLoggedIn;
      }

      // Redirect authenticated users away from home page to dashboard
      if (isHome && isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      // Allow everyone else (including unauthenticated users) to access home and login
      return true;
    },
  },
  providers: [],
};
