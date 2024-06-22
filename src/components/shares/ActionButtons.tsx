'use client';

import { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import styled, { css } from 'styled-components';

import useCommunityShares from '@/queries/useCommunityShares';

import detectMobileDevice from '@/utils/detectMobileDevice';
import { useTranslation } from '@/utils/localization/client';
import useCopyToClipboard from '@/utils/useCopyClipboard';

import FacebookIcon from '@/assets/icons/facebook.png';
import KakaoIcon from '@/assets/icons/kakao.png';
import MessageIcon from '@/assets/icons/message.png';
import LinkIcon from '@/assets/icons/link.png';

import ShareCompletedDialog from '@/components/shares/ShareCompletedDialog';
import KakaoShareDialog, { VAKE_URL } from '@/components/shares/KakaoShareDialog';

const ActionButtons = () => {
  const { locale } = useParams();
  const { t } = useTranslation('shares');

  const searchParams = useSearchParams();
  const currentCommunityId = searchParams.get('current_community_id') || '';
  const ticket = searchParams.get('ticket') || '';
  const baseCommunityId = searchParams.get('communityid') || '';

  const { data } = useCommunityShares({
    currentCommunityId,
    baseCommunityId,
    ticket,
  });
  const [, copyToClipboard] = useCopyToClipboard();

  const [openShareCompleted, setOpenShareCompleted] = useState(false);
  const [openKakaoShare, setOpenKakaoShare] = useState(false);
  const [messageHref, setMessageHref] = useState('');

  const items: (
    | {
        type: 'facebook' | 'link';
        icon: StaticImageData;
        title: string;
        handleClickButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
      }
    | {
        type: 'message';
        icon: StaticImageData;
        title: string;
      }
  )[] = [
    {
      type: 'facebook',
      icon: FacebookIcon,
      title: t('by_facebook'),
      handleClickButton: () => {
        const sendUrl = data?.url || VAKE_URL;
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(sendUrl)}`,
          'facebook',
          'toolbar=0,status=0,width=655,height=520',
        );
      },
    },
    {
      type: 'message',
      icon: MessageIcon,
      title: t('by_message'),
    },
    {
      type: 'link',
      icon: LinkIcon,
      title: t('by_copy_link'),
      handleClickButton: () => {
        copyToClipboard(data?.url || VAKE_URL);
        setOpenShareCompleted(true);
      },
    },
  ];

  const handleClickKakao = () => {
    setOpenKakaoShare(true);
  };

  const handleCloseKakaoShare = () => {
    setOpenKakaoShare(false);
  };

  const handleCloseShareCompleted = () => {
    setOpenShareCompleted(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const shareMessage = `${t('sms_share_message', {
        moim_name: data?.name || (locale !== 'ko' ? 'Your Action' : ''),
      })} ${data?.url || VAKE_URL}`;

      setMessageHref(
        detectMobileDevice() === 'ios' ? `sms:&body=${shareMessage}` : `sms:?body=${shareMessage}`,
      );
    }
  }, [data?.name, data?.url, locale]);

  return (
    <StyledActionButtonContainer>
      <StyledKakaoButton onClick={handleClickKakao}>
        <StyledKakaoIcon src={KakaoIcon.src} alt="kakao_icon" width={31.25} height={28.64} />
        <StyledKakaoMsg>{t('invite_by_kakao')}</StyledKakaoMsg>
      </StyledKakaoButton>
      <StyledButtons>
        {items.map((item) => {
          if (item.type === 'message') {
            return (
              <StyledAnchor key={item.title} href={messageHref}>
                <StyledButtonIcon src={item.icon.src} alt={item.title} width={50} height={50} />
                <p>{item.title}</p>
              </StyledAnchor>
            );
          }
          return (
            <StyledButton key={item.title} onClick={item.handleClickButton}>
              <StyledButtonIcon src={item.icon.src} alt={item.title} width={50} height={50} />
              <p>{item.title}</p>
            </StyledButton>
          );
        })}
      </StyledButtons>
      {openKakaoShare && <KakaoShareDialog open={openKakaoShare} onClose={handleCloseKakaoShare} />}
      {openShareCompleted && (
        <ShareCompletedDialog open={openShareCompleted} onClose={handleCloseShareCompleted} />
      )}
    </StyledActionButtonContainer>
  );
};

export default ActionButtons;

const StyledActionButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  margin: 0 20px;
  gap: 40px;
`;

const StyledKakaoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  border-radius: 30px;
  background: #ffeb3b;
`;

export const StyledKakaoIcon = styled(Image)`
  padding: 12.1px 9.37px 9.26px;
`;

export const StyledKakaoMsg = styled.p`
  padding: 15px 0;
  color: #3e2723;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.9px;
  line-height: normal;
  text-align: center;
`;

const StyledButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
`;

const iconStyle = css`
  color: rgba(0, 0, 0, 0.8);
  font-size: 13px;
  font-weight: 300;
  line-height: normal;
  text-align: center;
`;

const StyledButton = styled.button`
  ${iconStyle}
`;

const StyledAnchor = styled.a`
  display: inline-block;
  ${iconStyle}
`;

const StyledButtonIcon = styled(Image)`
  margin-bottom: 8px;
`;
