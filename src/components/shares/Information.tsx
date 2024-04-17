'use client';

import styled from 'styled-components';
import { useTranslations } from 'next-intl';

const ShareInformation = () => {
  const t = useTranslations('Shares');

  return <StyledMain>{t('invitation_description', { moim_name: 'Vake' })}</StyledMain>;
};

const StyledMain = styled.main`
  color: purple;
`;

export default ShareInformation;
