'use client';

import { redirect, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import { getCommunityShares } from '@/api/shares';

const ShareInformation = () => {
  const t = useTranslations('Shares');
  const locale = useLocale();

  const searchParams = useSearchParams();
  const communityId = searchParams.get('id');

  const { data } = useQuery({
    queryKey: [communityId],
    queryFn: async () => getCommunityShares(communityId || ''),
    retry: 0,
    enabled: !!communityId,
  });

  if (data && data.locale !== locale) {
    redirect(`/${data.locale}/shares${communityId ? `?id=${communityId}` : ''}`);
  }

  return (
    <StyledMain>
      {t('invitation_description', {
        moim_name: data?.name || (locale !== 'ko' ? 'Action' : '액션'),
      })}
    </StyledMain>
  );
};

const StyledMain = styled.main`
  color: purple;
`;

export default ShareInformation;
