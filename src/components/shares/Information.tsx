'use client';

import Image from 'next/image';
import { redirect, useParams, useSearchParams } from 'next/navigation';
import styled from 'styled-components';

import useCommunityShares from '@/queries/useCommunityShares';

import { useTranslation } from '@/utils/localization/client';

import DefaultBannerImage from '@/assets/default_share_banner.png';
import MessageIcon from '@/assets/icons/share_icon.png';

import type { LocaleTypes } from '@/utils/localization/settings';

const ShareInformation = () => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation('shares');

  const searchParams = useSearchParams();
  const communityId = searchParams.get('communityid');
  const ticket = searchParams.get('ticket');

  const { data } = useCommunityShares(communityId, ticket);

  if (data?.locale && !data.locale.toLocaleLowerCase().includes(locale)) {
    redirect(`/${data.locale}/shares${communityId ? `?communityid=${communityId}` : ''}`);
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
        src={data?.banner?.data.url || DefaultBannerImage.src}
        alt={`${data?.name || ''} banner`}
      />
    </StyledInformation>
  );
};

const StyledInformation = styled.article`
  position: relative;
  padding: 36px 18px 18px;
  border-radius: 23px;
  margin: 0 20px;
  background: #ffffff;
  text-align: center;
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
  margin: 0 45px 24px;
  color: rgba(0, 0, 0, 0.8);
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  word-break: keep-all;

  @media only screen and (min-width: 768px) {
    margin-right: 100px;
    margin-left: 100px;
  }
`;

export const StyledBanner = styled.img`
  width: 100% !important;
  height: auto !important;
  border-radius: 10px;
  aspect-ratio: 317 / 105;
  object-fit: cover;
`;

export default ShareInformation;
