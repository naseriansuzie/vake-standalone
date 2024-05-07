'use client';

import Image from 'next/image';
import { redirect, useParams, useSearchParams } from 'next/navigation';
import styled from 'styled-components';

import useCommunityShares from '@/queries/useCommunityShares';

import { useTranslation } from '@/utils/localization/client';

import MessageIcon from '@/assets/share_icon.png';

import type { LocaleTypes } from '@/utils/localization/settings';

const ShareInformation = () => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation('shares');

  const searchParams = useSearchParams();
  const communityId = searchParams.get('id');

  const { data } = useCommunityShares(communityId);

  if (data && data.locale !== locale) {
    redirect(`/${data.locale}/shares${communityId ? `?id=${communityId}` : ''}`);
  }

  return (
    <StyledInformation>
      <StyledIcon src={MessageIcon.src} alt="share icon" width={50} height={50} />
      <StyledMsgContainer>
        <StyledMainMsg>
          {t('invitation_description', {
            moim_name: data?.name || (locale !== 'ko' ? 'Your Action' : ''),
          })}
        </StyledMainMsg>
        <StyledSuggestionMsg>{t('invitation_suggestion')}</StyledSuggestionMsg>
      </StyledMsgContainer>
      <StyledBanner
        src={data?.banner?.data.url || ''}
        alt={`${data?.name} banner`}
        sizes="317px"
        width={317}
        height={105}
        quality={30}
        priority
      />
    </StyledInformation>
  );
};

const StyledInformation = styled.article`
  position: relative;
  background: #fff;
  text-align: center;
  border-radius: 23px;
  padding: 36px 18px 18px;
  margin: 0 20px;
`;

const StyledIcon = styled(Image)`
  position: absolute;
  top: -25px;
  left: calc(50% - 25px);
`;

const StyledMsgContainer = styled.div`
  padding: 0 13px;
`;

const StyledMainMsg = styled.h1`
  color: #4a64ff;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  word-break: keep-all;
`;

const StyledSuggestionMsg = styled.p`
  color: rgba(0, 0, 0, 0.8);
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  word-break: keep-all;
  margin: 0 45px 24px;

  @media only screen and (min-width: 768px) {
    margin-left: 100px;
    margin-right: 100px;
  }
`;

export const StyledBanner = styled(Image)`
  width: 100% !important;
  height: auto !important;
  aspect-ratio: 317 / 105;
  border-radius: 10px;
  object-fit: cover;
`;

export default ShareInformation;
