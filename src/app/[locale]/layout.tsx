import { noto_sans_kr } from '@/app/fonts';
import Providers from '@/app/providers';

import type { LocaleTypes } from '@/utils/localization/settings';

export default function RootLayout({
  params,
  children,
}: Readonly<{
  params: { locale: LocaleTypes };
  children: React.ReactNode;
}>) {
  return (
    <html lang={params.locale} className={noto_sans_kr.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
