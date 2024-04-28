import { NextIntlClientProvider, useLocale, useMessages } from 'next-intl';

import { noto_sans_kr } from '@/app/fonts';
import Providers from '@/app/providers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = useLocale();
  const messages = useMessages();

  return (
    <html lang={locale} className={noto_sans_kr.className}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
