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

export default async function RootLayout(
  props: Readonly<{
    params: { locale: LocaleTypes };
    children: React.ReactNode;
  }>,
) {
  const params = await props.params;

  const { children } = props;

  return (
    <html lang={params.locale} className={noto_sans_kr.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
      <KakaoScript />
    </html>
  );
}
