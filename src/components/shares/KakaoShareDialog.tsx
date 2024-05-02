'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import styled, { css } from 'styled-components';

import useCommunityShares from '@/queries/useCommunityShares';

import { useTranslation } from '@/utils/localization/client';

import Close from '@/assets/close.png';
import KakaoIcon from '@/assets/kakao.png';
import InvalidKakaoIcon from '@/assets/kakao_invalid.png';
import SmallVakeLogo from '@/assets/vake_logo_small.png';

import { Dialog, DialogClose, DialogContainer, DialogTitle } from '@/components/common/Dialog';
import { StyledKakaoIcon as StyledSendKakaoIcon, StyledKakaoMsg } from './ActionButtons';
import { StyledBanner } from './Information';
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
  const communityId = searchParams.get('id');

  const { data } = useCommunityShares(communityId);

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
              src={data?.icon?.data.url || ''}
              alt={`${data?.name} 아이콘`}
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
          <StyledBanner
            src={data?.banner.data.url || ''}
            alt={`${data?.name} banner`}
            sizes="317px"
            width={318}
            height={105}
            quality={30}
            priority
          />
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
  padding: 0 30px;
`;

const StyledDialogClose = styled(DialogClose)`
  position: absolute;
  top: 10px;
  right: 15px;
`;

const StyledDialogTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 7px;
`;

const StyledKakaoIcon = styled(Image)`
  padding: 7.5px 5.81px 5.74px 5.81px;
`;

const StyledHeaderTitle = styled.p`
  color: #3e2723;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.75px;
  margin: 7px 0 5px -2px;
`;

const StyledInfoArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 78px;
  margin-bottom: 30px;
`;

const StyledCommunityIcon = styled(Image)`
  border-radius: 5px;
  outline: 1px solid #d9d9d9;
  margin-bottom: 8px;
`;

const StyledCommunityName = styled.div`
  color: rgba(0, 0, 0, 0.9);
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  line-height: 34px;
  letter-spacing: -1.2px;
`;

const StyledCommunityDescription = styled.div`
  color: rgba(0, 0, 0, 0.9);
  text-align: center;
  font-size: 24px;
  font-weight: 350;
  line-height: 34px;
  letter-spacing: -1.2px;
`;

const StyledBannerArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 13.71px;
  border-radius: 13px;
  background: #fff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  padding: 14px 5px 5.5px;
  margin: 30px auto 14.5px;

  @media screen and (min-width: 768px) {
    padding-bottom: 14px;
  }
`;

const StyledKakaoButton = styled.button<{ $isInvalid: boolean }>`
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffeb3b;
  border-radius: 30px;
  padding: 5px 0;
  margin: 0 auto;

  ${({ $isInvalid }) =>
    $isInvalid &&
    css`
      background: #eee;

      > p {
        color: rgba(0, 0, 0, 0.3);
      }
    `}
`;

export default KakaoShareDialog;
