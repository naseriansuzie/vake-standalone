'use client';

import { ThemeProvider } from 'styled-components';

import GlobalStyle from '@/src/styles/globalStyle';
import StyledComponentsRegistry from '@/src/styles/Registry';
import theme from '@/src/styles/theme';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle />
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
