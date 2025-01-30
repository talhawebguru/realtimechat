import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token');
  const { pathname } = req.nextUrl;

  // Allow access to login and signup pages without authentication
  if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
    return NextResponse.next();
  }

  // If user is not authenticated, redirect them to /login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};