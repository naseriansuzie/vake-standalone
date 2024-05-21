import { noto_sans_kr } from '@/app/fonts';
import Providers from '@/app/providers';

import KakaoScript from '@/utils/sdk/Kakaoscript';
import type { LocaleTypes } from '@/utils/localization/settings';
import { CSSProperties } from 'styled-components';

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
        <Providers>
          <div style={containerStyle}>
            <div style={overlayStyle}>
              <span style={comingSoonStyle}>Coming Soon</span>
              <div style={additionalTextContainerStyle}>
                <span style={additionalTextStyle}>2024년 6월</span>
                <span style={additionalTextStyle}>초대기능이 오픈됩니다</span>
              </div>
            </div>
            {children}
          </div>
        </Providers>
      </body>
      <KakaoScript />
    </html>
  );
}

const containerStyle: CSSProperties = {
  position: 'relative',
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
};

const overlayStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const comingSoonStyle: CSSProperties = {
  color: 'white',
  fontSize: '3em',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const additionalTextContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const additionalTextStyle: CSSProperties = {
  color: 'white',
  fontSize: '1.5em',
};
