import { useQuery } from '@tanstack/react-query'

import { userService } from '@/features/user/services'

export function useProfile() {
	const { data: user, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.findProfile(),
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		retry: false,
		refetchOnWindowFocus: true,
		refetchOnMount: true
	})

	return { user, isLoading }
}
