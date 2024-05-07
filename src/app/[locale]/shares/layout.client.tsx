'use client';

import { useEffect } from 'react';

import styled from 'styled-components';

const ClientSharesLayout = ({ children }: React.PropsWithChildren) => {
  const setVhVariable = () => {
    if (typeof window !== 'undefined') {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setVhVariable();
      window.addEventListener('resize', setVhVariable);
    }

    return () => {
      window.removeEventListener('resize', setVhVariable);
    };
  }, []);

  return (
    <StyledSharesPage>
      <StyledContent>{children}</StyledContent>
    </StyledSharesPage>
  );
};

const StyledSharesPage = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background: #f7f7f9;
  overflow: hidden;
  margin: 0 auto;

  @media only screen and (max-device-width: 375px) and (max-device-height: 667px) {
    padding-top: 80px;
  }
`;

const StyledContent = styled.section`
  display: flex;
  flex-direction: column;
  gap: 95px;
  max-width: 500px;
`;

export default ClientSharesLayout;
