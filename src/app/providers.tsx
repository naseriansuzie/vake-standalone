'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '@/styles/globalStyle';
import StyledComponentsRegistry from '@/styles/registry';
import theme from '@/styles/theme';

const Providers = ({ children }: React.PropsWithChildren) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
      },
    },
  });

  return (
    <StyledComponentsRegistry>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StyledComponentsRegistry>
  );
};

export default Providers;
