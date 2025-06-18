import { auth } from './src/auth';
import { NextResponse } from 'next/server';
 
export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isDashboardRoute = /^\/dashboard(\/|$)/.test(req.nextUrl.pathname);

  console.log('[Auth Middleware]', {
    pathname: req.nextUrl.pathname,
    isLoggedIn,
    user: req.auth?.user,
  });

  if (isDashboardRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  return NextResponse.next();
});
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};