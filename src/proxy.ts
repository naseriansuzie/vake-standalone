import { type NextRequest, NextResponse } from 'next/server';

import { fallbackLng, locales } from '@/utils/localization/settings';

export default async function proxy(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;

  const urlSearchParams = new URLSearchParams(request.nextUrl.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const urlParams = urlSearchParams ? `?${new URLSearchParams(params).toString()}` : '';

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    // We are on the default locale
    // Rewrite so Next.js understands

    // e.g. incoming request is /shares
    // it redirects to /ko/shares
    return NextResponse.redirect(new URL(`/${fallbackLng}${pathname}${urlParams}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/((?!api|.*\\..*|_next/static|_next/image|public/|assets|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)',
  ],
};
