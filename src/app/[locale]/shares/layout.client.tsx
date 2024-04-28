'use client';

import styled from 'styled-components';

const ClientSharesLayout = ({ children }: React.PropsWithChildren) => {
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
  height: 100vh;
  background: #f7f7f9;
  margin: 0 auto;
`;

const StyledContent = styled.section`
  max-width: 500px;
`;

export default ClientSharesLayout;
