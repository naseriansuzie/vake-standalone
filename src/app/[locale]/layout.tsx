'use client';

import { useLocale } from 'next-intl';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '@/styles/globalStyle';
import StyledComponentsRegistry from '@/styles/Registry';
import theme from '@/styles/theme';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = useLocale();

  return (
    <html lang={locale}>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle />
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
