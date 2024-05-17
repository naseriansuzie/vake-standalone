import { useQuery } from '@tanstack/react-query';

import { getCommunityShares } from '@/api/shares';

const useCommunityShares = (id: string | null, ticket: string | null) => {
  return useQuery({
    queryKey: [id, ticket],
    queryFn: async () => getCommunityShares(id || '', ticket || ''),
    retry: 0,
    enabled: !!id && !!ticket,
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

export default useCommunityShares;
