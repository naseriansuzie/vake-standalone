import fetchers from './model/fetchers';

import type { GetCommunityShareInformation } from '@/types/shares';

export const getCommunityShares = (communityId: string, ticket: string) => {
  return fetchers.get<GetCommunityShareInformation>({
    endpoint: `/communities/${communityId}`,
    headers: {
      'plugin-community-id': communityId,
      'plugin-ticket': ticket,
    },
  });
};
