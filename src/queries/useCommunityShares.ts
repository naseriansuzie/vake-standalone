import { useQuery } from '@tanstack/react-query';

import { getCommunityShares } from '@/api/shares';

const useCommunityShares = ({
  currentCommunityId,
  baseCommunityId,
  ticket,
}: {
  currentCommunityId: string;
  baseCommunityId: string;
  ticket: string;
}) => {
  return useQuery({
    queryKey: [currentCommunityId, ticket],
    queryFn: async () => getCommunityShares({ currentCommunityId, baseCommunityId, ticket }),
    retry: 0,
    enabled: !!currentCommunityId && !!baseCommunityId && !!ticket,
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

export default useCommunityShares;
