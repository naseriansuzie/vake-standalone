import fetchers from './fetchers';

import type { GetCommunityShareInformation } from '@/types/shares';

export const getCommunityShares = (communityId: string) => {
  return fetchers.get<GetCommunityShareInformation>({
    endpoint: `/communities/${communityId}`,
  });
};
