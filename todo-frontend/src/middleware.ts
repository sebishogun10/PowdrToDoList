import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token');
    const isAuthPage = request.nextUrl.pathname === '/login' || 
                      request.nextUrl.pathname === '/register';
    const isTodosPage = request.nextUrl.pathname === '/todos';

    if (!token && isTodosPage) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL('/todos', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/todos', '/login', '/register']
};
