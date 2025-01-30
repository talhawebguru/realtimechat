import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token');
  const { pathname } = req.nextUrl;

  // If user is not authenticated, redirect them to /login (but not if they are already there)
  if (!token && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If user is authenticated and tries to access /login, redirect them to /
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
