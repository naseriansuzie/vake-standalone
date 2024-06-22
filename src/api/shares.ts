import fetchers from './model/fetchers';

import type { GetCommunityShareInformation } from '@/types/shares';

export const getCommunityShares = ({
  currentCommunityId,
  baseCommunityId,
  ticket,
}: {
  currentCommunityId: string;
  baseCommunityId: string;
  ticket: string;
}) => {
  return fetchers.get<GetCommunityShareInformation>({
    endpoint: `/communities/${currentCommunityId}`,
    headers: {
      'plugin-community-id': baseCommunityId,
      'plugin-ticket': ticket,
      'plugin-app-id': process.env.PLUGIN_APP_ID,
    },
  });
};
