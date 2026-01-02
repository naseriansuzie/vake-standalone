import '@/app/globals.css';
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

export default async function RootLayout(props: {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}) {
  const params = await props.params;
  const locale = params.locale as LocaleTypes;

  const { children } = props;

  return (
    <html lang={locale} className={`${noto_sans_kr.variable} ${noto_sans_kr.className}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
      <KakaoScript />
    </html>
  );
}
