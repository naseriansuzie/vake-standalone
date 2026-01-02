'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';

import useCommunityShares from '@/queries/useCommunityShares';

import { useTranslation } from '@/utils/localization/client';

import DefaultBannerImage from '@/assets/default_share_banner.png';
import Close from '@/assets/icons/close.png';
import MessageIcon from '@/assets/icons/share_icon.png';
import KakaoIcon from '@/assets/icons/kakao.png';
import InvalidKakaoIcon from '@/assets/icons/kakao_invalid.png';
import SmallVakeLogo from '@/assets/icons/vake_logo_small.png';

import {
  Dialog,
  DialogClose,
  DialogContainer,
  DialogTitle,
  DialogDescription,
} from '@/components/common/Dialog';
import { KakaoIconWrapper, KakaoMsg } from './ActionButtons';
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
  const currentCommunityId = searchParams.get('current_community_id') || '';
  const ticket = searchParams.get('ticket') || '';
  const baseCommunityId = searchParams.get('communityid') || '';

  const { data } = useCommunityShares({ currentCommunityId, baseCommunityId, ticket });

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
      <DialogContainer
        fullDialog
        onClickOutSide={onClose}
        className="w-[calc(100%-60px)] p-[5px_30px_30px]"
      >
        <DialogClose className="absolute top-[30px] right-[30px]" asChild onClick={onClose}>
          <Image src={Close.src} alt="close" width={16} height={16} />
        </DialogClose>
        <DialogTitle asChild>
          <div className="mt-[17px] flex items-center justify-center">
            <Image
              src={KakaoIcon.src}
              alt="kakao_icon"
              width={19.38}
              height={17.76}
              className="m-[7.5px_5.81px_5.74px_5.81px]"
            />
            <p className="my-[7px_0_5px] -ml-[2px] text-center text-base leading-normal font-semibold tracking-[-0.75px] text-[#3e2723]">
              {t('invite_by_kakao')}
            </p>
          </div>
        </DialogTitle>
        <DialogDescription className="sr-only">{t('to_invite_action')}</DialogDescription>

        <div className="mt-[78px] mb-[30px] flex flex-col items-center justify-center">
          <div>
            <Image
              src={data?.icon?.data.url || MessageIcon.src}
              alt={`${data?.name || ''} 아이콘`}
              width={30}
              height={30}
              className="mb-2 rounded-[5px] outline outline-[#d9d9d9]"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="text-center text-2xl leading-[34px] font-bold tracking-[-1.2px] text-[rgba(0,0,0,0.9)]">
            {data?.name}
          </div>
          <div className="text-center text-2xl leading-[34px] font-[350] tracking-[-1.2px] text-[rgba(0,0,0,0.9)]">
            {t('to_invite_action')}
          </div>
        </div>

        <div className="relative m-[30px_auto_14.5px] flex max-w-[500px] flex-col items-center justify-center gap-[13.71px] rounded-[13px] bg-white p-[14px_10px_5.5px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] md:pb-[14px]">
          <Image src={SmallVakeLogo.src} alt="vake_logo" width={80} height={26.29} />
          <img
            src={data?.banner.data.url || DefaultBannerImage.src}
            alt={`${data?.name || ''} banner`}
            className="aspect-317/105 h-auto w-full rounded-[10px] object-contain"
          />
        </div>
        <InvitationTextarea
          message={message}
          setMessage={setMessage}
          setIsMessageValid={setIsMessageValid}
        />
        <button
          id="kakaotalk-sharing-btn"
          className={`mx-auto flex w-full max-w-[500px] items-center justify-center rounded-[30px] py-[5px] ${
            isMessageValid ? 'bg-[#ffeb3b]' : 'bg-[#eeeeee]'
          }`}
          onClick={handleClickSendButton}
        >
          <KakaoIconWrapper
            src={isMessageValid ? KakaoIcon.src : InvalidKakaoIcon.src}
            alt="kakao_icon"
            width={31.25}
            height={28.64}
          />
          <KakaoMsg className={!isMessageValid ? 'text-[rgba(0,0,0,0.3)]' : ''}>
            {t('send_by_kakao')}
          </KakaoMsg>
        </button>
      </DialogContainer>
    </Dialog>
  );
};

export default KakaoShareDialog;
