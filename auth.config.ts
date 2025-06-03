import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user;
      const isLoggedIn = !!user;
      const isDashboardRoute = /^\/dashboard(\/|$)/.test(nextUrl.pathname);

      console.log('[Auth Middleware]', {
        pathname: nextUrl.pathname,
        isLoggedIn,
        user,
      });

      if (isDashboardRoute) {
        return isLoggedIn; 
      }

      return true; 
    },
  },
  providers: [],
};
