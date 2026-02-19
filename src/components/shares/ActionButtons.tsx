'use client';

import { useMemo, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';

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
  const messageHref = useMemo(() => {
    if (typeof window === 'undefined') return '';

    const shareMessage = `${t('sms_share_message', {
      moim_name: data?.name || (locale !== 'ko' ? 'Your Action' : ''),
    })} ${data?.url || VAKE_URL}`;

    return detectMobileDevice() === 'ios'
      ? `sms:&body=${shareMessage}`
      : `sms:?body=${shareMessage}`;
  }, [t, data?.name, data?.url, locale]);

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

  return (
    <div className="mx-5 flex flex-col gap-10 pb-10">
      <button
        className="flex items-center justify-center rounded-[30px] bg-[#ffeb3b] py-[5px]"
        onClick={handleClickKakao}
      >
        <KakaoIconWrapper src={KakaoIcon.src} alt="kakao_icon" width={31.25} height={28.64} />
        <KakaoMsg>{t('invite_by_kakao')}</KakaoMsg>
      </button>
      <div className="flex items-center justify-center gap-[25px]">
        {items.map((item) => {
          if (item.type === 'message') {
            return (
              <a
                key={item.title}
                href={messageHref}
                className="inline-block text-center text-[13px] leading-normal font-light text-[rgba(0,0,0,0.8)]"
              >
                <Image
                  src={item.icon.src}
                  alt={item.title}
                  width={50}
                  height={50}
                  className="mb-2"
                />
                <p>{item.title}</p>
              </a>
            );
          }
          return (
            <button
              key={item.title}
              onClick={item.handleClickButton}
              className="text-center text-[13px] leading-normal font-light text-[rgba(0,0,0,0.8)]"
            >
              <Image src={item.icon.src} alt={item.title} width={50} height={50} className="mb-2" />
              <p>{item.title}</p>
            </button>
          );
        })}
      </div>
      {openKakaoShare && <KakaoShareDialog open={openKakaoShare} onClose={handleCloseKakaoShare} />}
      {openShareCompleted && (
        <ShareCompletedDialog open={openShareCompleted} onClose={handleCloseShareCompleted} />
      )}
    </div>
  );
};

export default ActionButtons;

// Exported for KakaoShareDialog
export const KakaoIconWrapper = ({
  src,
  alt,
  width,
  height,
  className = '',
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) => (
  <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={`m-[12.1px_9.37px_9.26px] ${className}`}
  />
);

export const KakaoMsg = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <p
    className={`py-[15px] text-center text-lg leading-normal font-bold tracking-[-0.9px] text-[#3e2723] ${className}`}
  >
    {children}
  </p>
);
