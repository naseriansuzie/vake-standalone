import { type NextRequest, NextResponse } from 'next/server';

import { fallbackLng, locales } from '@/utils/localization/settings';

export default async function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;

  const urlSearchParams = new URLSearchParams(request.nextUrl.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const urlParams = urlSearchParams ? `?${new URLSearchParams(params).toString()}` : '';

  // Check if the default locale is in the pathname
  if (pathname.startsWith(`/${fallbackLng}/`) || pathname === `/${fallbackLng}`) {
    // e.g. incoming request is /ko/shares
    // The new URL is now /shares
    return NextResponse.redirect(
      new URL(
        `${pathname.replace(`/${fallbackLng}`, pathname === `/${fallbackLng}` ? '/' : '')}${urlParams}`,
        request.url,
      ),
    );
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    // We are on the default locale
    // Rewrite so Next.js understands

    // e.g. incoming request is /shares
    // Tell Next.js it should pretend it's /ko/shares
    return NextResponse.rewrite(new URL(`/${fallbackLng}${pathname}${urlParams}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/((?!api|.*\\..*|_next/static|_next/image|public/|assets|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)',
  ],
};
