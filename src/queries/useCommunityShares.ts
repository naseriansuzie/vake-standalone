import { useQuery } from '@tanstack/react-query';

import { getCommunityShares } from '@/api/shares';

const useCommunityShares = (id?: string | null) => {
  return useQuery({
    queryKey: [id],
    queryFn: async () => getCommunityShares(id || ''),
    retry: 0,
    enabled: !!id,
  });
};

export default useCommunityShares;
