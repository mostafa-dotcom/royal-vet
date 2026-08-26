import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only run on /admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value;
    
    const isAuthenticated = token === 'authenticated'; // Simple check for now
    
    // If trying to access login page while authenticated, redirect to admin root
    if (pathname === '/admin/login' && isAuthenticated) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    
    // If trying to access admin pages (not login) while not authenticated, redirect to login
    if (pathname !== '/admin/login' && !isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
