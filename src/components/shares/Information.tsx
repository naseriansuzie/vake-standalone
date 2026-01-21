'use client';

import Image from 'next/image';
import { redirect, useParams, useSearchParams } from 'next/navigation';

import useCommunityShares from '@/queries/useCommunityShares';

import { useTranslation } from '@/utils/localization/client';

import DefaultBannerImage from '@/assets/default_share_banner.png';
import MessageIcon from '@/assets/icons/share_icon.png';

import type { LocaleTypes } from '@/utils/localization/settings';

const ShareInformation = () => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation('shares');

  const searchParams = useSearchParams();
  const currentCommunityId = searchParams.get('current_community_id') || '';
  const ticket = searchParams.get('ticket') || '';
  const baseCommunityId = searchParams.get('communityid') || '';

  const { data } = useCommunityShares({ currentCommunityId, baseCommunityId, ticket });

  if (data?.locale && !data.locale.toLocaleLowerCase().includes(locale)) {
    const searchParamsString = searchParams.toString();
    redirect(`/${data.locale}/shares${searchParamsString ? `?${searchParamsString}` : ''}`);
  }
  return (
    <article className="relative mx-5 rounded-[23px] bg-white px-[18px] py-[36px_18px] text-center">
      <Image
        className="absolute -top-[25px] left-[calc(50%-25px)]"
        src={MessageIcon.src}
        alt="share icon"
        width={50}
        height={50}
      />
      <div className="px-[13px]">
        <h1 className="text-base leading-6 font-semibold break-keep text-[#4a64ff]">
          {t('invitation_description', {
            moim_name: data?.name || (locale !== 'ko' ? 'Your Action' : ''),
          })}
        </h1>
        <p className="mx-[45px] mb-6 text-base leading-6 font-light break-keep text-[rgba(0,0,0,0.8)] md:mx-[100px]">
          {t('invitation_suggestion')}
        </p>
      </div>
      <img
        src={data?.banner?.data.url || DefaultBannerImage.src}
        alt={`${data?.name || ''} banner`}
        className="aspect-317/105 h-auto w-full rounded-[10px] object-cover"
      />
    </article>
  );
};

export default ShareInformation;
