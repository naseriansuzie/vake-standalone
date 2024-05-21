import { noto_sans_kr } from '@/app/fonts';
import Providers from '@/app/providers';

import KakaoScript from '@/utils/sdk/Kakaoscript';
import type { LocaleTypes } from '@/utils/localization/settings';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

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
      <KakaoScript />
    </html>
  );
}
