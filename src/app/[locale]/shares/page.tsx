import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getCommunityShares } from '@/api/shares';

import Information from '@/components/shares/Information';

import type { FaviconItem } from '@/types/shares';

const defaultMetadata: Metadata = {
  title: '액션 초대하기 | Vake',
  description: '액션에 초대합니다',
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Record<string, string>;
}): Promise<Metadata> {
  const communityId = searchParams?.id;

  try {
    if (communityId) {
      const { name, locale, favicon, banner } = await getCommunityShares(communityId);

      const t = await getTranslations({ locale, namespace: 'Shares' });

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
      };
    }

    return defaultMetadata;
  } catch (e) {
    console.error('metadata error', e);
    return defaultMetadata;
  }
}

export default async function Shares({ searchParams }: { searchParams: Record<string, string> }) {
  const communityId = searchParams?.id;

  const queryClient = new QueryClient();

  if (communityId) {
    await queryClient.prefetchQuery({
      queryKey: [communityId],
      queryFn: async () => getCommunityShares(communityId),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Information />
    </HydrationBoundary>
  );
}
