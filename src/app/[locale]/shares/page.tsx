import type { Metadata, Viewport } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getCommunityShares } from '@/api/shares';

import { createTranslation } from '@/utils/localization/server';

import ActionButtons from '@/components/shares/ActionButtons';
import Information from '@/components/shares/Information';

import type { LocaleTypes } from '@/utils/localization/settings';
import type { FaviconItem } from '@/types/shares';

const defaultMetadata: Metadata = {
  title: '액션 초대하기 | Vake',
  description: '액션에 초대합니다',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata(props: {
  params: Promise<{ locale: LocaleTypes }>;
  searchParams: Promise<Record<string, string>>;
}): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const { locale } = params;

  const currentCommunityId = searchParams?.current_community_id;
  const ticket = searchParams?.ticket;
  const baseCommunityId = searchParams?.communityid;

  try {
    if (currentCommunityId) {
      const {
        name,
        locale: pickedLocale,
        favicon,
        banner,
      } = await getCommunityShares({ currentCommunityId, baseCommunityId, ticket });
      const { t } = await createTranslation((pickedLocale as LocaleTypes) || locale, 'shares');

      const parseFaviconItem = (item: FaviconItem | null) => {
        return {
          url: item?.url || '',
          size: item?.size?.toString() || '',
        };
      };

      return {
        title: t('head_title', { moim_name: name }),
        description: t('head_description', {
          moim_name: name,
        }),
        openGraph: {
          type: 'website',
          siteName: name,
          title: t('head_title', { moim_name: name }),
          description: t('head_description', {
            moim_name: name,
          }),
          images: banner?.data.url,
        },
        icons: {
          icon: (favicon?.android?.map((icon) => parseFaviconItem(icon)) || []).concat(
            favicon?.common?.map((icon) => parseFaviconItem(icon)) || [],
          ),
          apple: favicon?.ios?.map((icon) => parseFaviconItem(icon)) || [],
        },
        appleWebApp: {
          capable: true,
          title: t('head_title', { moim_name: name }),
          statusBarStyle: 'black-translucent',
        },
      };
    }

    return defaultMetadata;
  } catch (e) {
    console.error('metadata error', e);
    return defaultMetadata;
  }
}

export default async function Shares(props: { searchParams: Promise<Record<string, string>> }) {
  const searchParams = await props.searchParams;
  const currentCommunityId = searchParams?.current_community_id;
  const ticket = searchParams?.ticket;
  const baseCommunityId = searchParams?.communityid;

  const queryClient = new QueryClient();

  if (currentCommunityId && baseCommunityId && ticket) {
    await queryClient.prefetchQuery({
      queryKey: [currentCommunityId, ticket],
      queryFn: async () => getCommunityShares({ currentCommunityId, baseCommunityId, ticket }),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Information />
      <ActionButtons />
    </HydrationBoundary>
  );
}
