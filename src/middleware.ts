import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

export default async function middleware(request: NextRequest) {
  const handleI18nRouting = createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'ko'],
    // Used when no locale matches
    defaultLocale: 'ko',
  });

  const response = handleI18nRouting(request);
  response.headers.set('next-url', request.nextUrl.pathname);
  response.headers.set('search', request.nextUrl.search);

  return response;
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
