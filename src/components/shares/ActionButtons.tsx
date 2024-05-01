'use client';

import Image, { StaticImageData } from 'next/image';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import styled from 'styled-components';

import { getCommunityShares } from '@/api/shares';

import detectMobileDevice from '@/helpers/detectMobileDevice';
import { useTranslation } from '@/utils/localization/client';
import useCopyToClipboard from '@/utils/useCopyClipboard';

import FacebookIcon from '@/assets/facebook.png';
import KakaoIcon from '@/assets/kakao.png';
import MessageIcon from '@/assets/message.png';
import LinkIcon from '@/assets/link.png';

import type { LocaleTypes } from '@/utils/localization/settings';

const VAKE_URL = 'https://vake.io' as const;

const ActionButtons = () => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, 'shares');

  const { push } = useRouter();
  const searchParams = useSearchParams();
  const communityId = searchParams.get('id');

  const [state, copyToClipboard] = useCopyToClipboard();

  const { data } = useQuery({
    queryKey: [communityId],
    queryFn: async () => getCommunityShares(communityId || ''),
    retry: 0,
    enabled: !!communityId,
  });

  const buttons: {
    icon: StaticImageData;
    title: string;
    handleClickButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
  }[] = [
    {
      icon: FacebookIcon,
      title: t('by_facebook'),
      handleClickButton: () => {
        // TODO: Facebook share interface 연결
      },
    },
    {
      icon: MessageIcon,
      title: t('by_message'),
      handleClickButton: () => {
        const shareMessage = `${t('sms_share_message', {
          moim_name: data?.name || (locale !== 'ko' ? 'Your Action' : ''),
        })} ${data?.url || VAKE_URL}`;

        if (detectMobileDevice() === 'ios') {
          push(`sms:&body=${shareMessage}`);
          return;
        }
        if (detectMobileDevice() === 'android') {
          push(`sms:?body=${shareMessage}`);
          return;
        }
      },
    },
    {
      icon: LinkIcon,
      title: t('by_copy_link'),
      handleClickButton: () => {
        copyToClipboard(data?.url || VAKE_URL);
      },
    },
  ];

  const handleClickKakao = () => {
    // TODO: Kakao share interface 연결
  };

  return (
    <StyledActionButtonContainer>
      <StyledKakaoButton onClick={handleClickKakao}>
        <StyledKakaoIcon src={KakaoIcon.src} alt="kakao_icon" width={31.25} height={28.64} />
        <StyledKakaoMsg>{t('invite_by_kakao')}</StyledKakaoMsg>
      </StyledKakaoButton>
      <StyledButtons>
        {buttons.map((button) => (
          <StyledButton key={button.title} onClick={button.handleClickButton}>
            <StyledButtonIcon src={button.icon.src} alt={button.title} width={50} height={50} />
            <p>{button.title}</p>
          </StyledButton>
        ))}
      </StyledButtons>
    </StyledActionButtonContainer>
  );
};

export default ActionButtons;

const StyledActionButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin: 0 20px;
`;

const StyledKakaoButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffeb3b;
  border-radius: 30px;
  padding: 5px 0;
`;

const StyledKakaoIcon = styled(Image)`
  padding: 12.1px 9.37px 9.26px;
`;

const StyledKakaoMsg = styled.p`
  color: #3e2723;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.9px;
  padding: 15px 0;
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
`;

const StyledButton = styled.button`
  color: rgba(0, 0, 0, 0.8);
  text-align: center;
  font-size: 13px;
  font-weight: 300;
  line-height: normal;
`;

const StyledButtonIcon = styled(Image)`
  margin-bottom: 8px;
`;
