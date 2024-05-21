'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import styled, { css } from 'styled-components';

import useCommunityShares from '@/queries/useCommunityShares';

import { useTranslation } from '@/utils/localization/client';

import DefaultBannerImage from '@/assets/default_share_banner.png';
import Close from '@/assets/icons/close.png';
import KakaoIcon from '@/assets/icons/kakao.png';
import InvalidKakaoIcon from '@/assets/icons/kakao_invalid.png';
import SmallVakeLogo from '@/assets/icons/vake_logo_small.png';

import { Dialog, DialogClose, DialogContainer, DialogTitle } from '@/components/common/Dialog';
import { StyledKakaoIcon as StyledSendKakaoIcon, StyledKakaoMsg } from './ActionButtons';
import { StyledBanner as Banner } from './Information';
import InvitationTextarea from './InvitationTextarea';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const VAKE_URL = 'https://vake.io' as const;

const KakaoShareDialog = ({ open, onClose }: Props) => {
  const { locale } = useParams();
  const { t } = useTranslation('shares');

  const searchParams = useSearchParams();
  const communityId = searchParams.get('communityid');
  const ticket = searchParams.get('ticket');

  const { data } = useCommunityShares(communityId, ticket);

  const [message, setMessage] = useState(t('default_share_message'));
  const [isMessageValid, setIsMessageValid] = useState(true);

  const handleClickSendButton = () => {
    if (!isMessageValid) {
      return;
    }
    const title = t('sms_share_message', {
      moim_name: data?.name || (locale !== 'ko' ? 'Your Action' : ''),
    });
    const finalInvitationMessage = message.trim();

    try {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title,
          description: finalInvitationMessage,
          imageUrl: data?.banner.data.url || '',
          link: {
            mobileWebUrl: data?.url,
            webUrl: data?.url,
          },
        },
        buttons: [
          {
            title: t('go_to_action'),
            link: {
              mobileWebUrl: data?.url,
              webUrl: data?.url,
            },
          },
        ],
      });
    } catch (error) {
      console.error('Failed to send Kakao message', error);
    }
  };

  return (
    <Dialog defaultOpen={open}>
      <StyledDialogContainer fullDialog onClickOutSide={onClose}>
        <StyledDialogClose asChild onClick={onClose}>
          <Image src={Close.src} alt="close" width={16} height={16} />
        </StyledDialogClose>
        <DialogTitle asChild>
          <StyledDialogTitleWrapper>
            <StyledKakaoIcon src={KakaoIcon.src} alt="kakao_icon" width={19.38} height={17.76} />
            <StyledHeaderTitle>{t('invite_by_kakao')}</StyledHeaderTitle>
          </StyledDialogTitleWrapper>
        </DialogTitle>

        <StyledInfoArea>
          <div>
            <StyledCommunityIcon
              src={data?.icon?.data.url || DefaultBannerImage.src}
              alt={`${data?.name || ''} 아이콘`}
              width={30}
              height={30}
              objectFit="cover"
            />
          </div>
          <StyledCommunityName>{data?.name}</StyledCommunityName>
          <StyledCommunityDescription>{t('to_invite_action')}</StyledCommunityDescription>
        </StyledInfoArea>

        <StyledBannerArea>
          <Image src={SmallVakeLogo.src} alt="vake_logo" width={80} height={26.29} />
          <StyledBanner src={data?.banner.data.url || ''} alt={`${data?.name} banner`} />
        </StyledBannerArea>
        <InvitationTextarea
          message={message}
          setMessage={setMessage}
          setIsMessageValid={setIsMessageValid}
        />
        <StyledKakaoButton
          id="kakaotalk-sharing-btn"
          $isInvalid={!isMessageValid}
          onClick={handleClickSendButton}
        >
          <StyledSendKakaoIcon
            src={isMessageValid ? KakaoIcon.src : InvalidKakaoIcon.src}
            alt="kakao_icon"
            width={31.25}
            height={28.64}
          />
          <StyledKakaoMsg>{t('send_by_kakao')}</StyledKakaoMsg>
        </StyledKakaoButton>
      </StyledDialogContainer>
    </Dialog>
  );
};

const StyledDialogContainer = styled(DialogContainer)`
  width: calc(100% - 60px) !important;
  padding: 5px 30px 30px;
`;

const StyledDialogClose = styled(DialogClose)`
  position: absolute;
  top: 30px;
  right: 30px;
`;

const StyledDialogTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 17px;
`;

const StyledKakaoIcon = styled(Image)`
  padding: 7.5px 5.81px 5.74px 5.81px;
`;

const StyledHeaderTitle = styled.p`
  margin: 7px 0 5px -2px;
  color: #3e2723;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.75px;
  line-height: normal;
  text-align: center;
`;

const StyledInfoArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 78px;
  margin-bottom: 30px;
`;

const StyledCommunityIcon = styled(Image)`
  border-radius: 5px;
  margin-bottom: 8px;
  outline: 1px solid #d9d9d9;
`;

const StyledCommunityName = styled.div`
  color: rgba(0, 0, 0, 0.9);
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -1.2px;
  line-height: 34px;
  text-align: center;
`;

const StyledCommunityDescription = styled.div`
  color: rgba(0, 0, 0, 0.9);
  font-size: 24px;
  font-weight: 350;
  letter-spacing: -1.2px;
  line-height: 34px;
  text-align: center;
`;

const StyledBannerArea = styled.div`
  position: relative;
  display: flex;
  max-width: 500px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 14px 10px 5.5px;
  border-radius: 13px;
  margin: 30px auto 14.5px;
  background: #ffffff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  gap: 13.71px;

  @media screen and (min-width: 768px) {
    padding-bottom: 14px;
  }
`;

const StyledBanner = styled(Banner)`
  object-fit: contain;
`;

const StyledKakaoButton = styled.button<{ $isInvalid: boolean }>`
  display: flex;
  width: 100%;
  max-width: 500px;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  border-radius: 30px;
  margin: 0 auto;
  background: #ffeb3b;

  ${({ $isInvalid }) =>
    $isInvalid &&
    css`
      background: #eeeeee;

      > p {
        color: rgba(0, 0, 0, 0.3);
      }
    `}
`;

export default KakaoShareDialog;
