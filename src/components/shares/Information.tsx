'use client';

// import { redirect } from 'next/navigation';
// import { useQuery } from '@tanstack/react-query';
import {
  // useLocale,
  useTranslations,
} from 'next-intl';
import styled from 'styled-components';

// import { getCommunityShares } from '@/api/shares';

const ShareInformation = () => {
  const t = useTranslations('Shares');
  // TODO: dynamic key 처리 후 redirect 처리 주석 해제
  // const locale = useLocale();

  // const { data } = useQuery({
  //   queryKey: ['G0IZUDWCL'],
  //   queryFn: async () => getCommunityShares('G0IZUDWCL'),
  //   retry: 0,
  // });

  // if (data && data.locale !== locale) {
  //   redirect(`/${data.locale}/shares`);
  // }

  return <StyledMain>{t('invitation_description', { moim_name: 'Vake' })}</StyledMain>;
};

const StyledMain = styled.main`
  color: purple;
`;

export default ShareInformation;
