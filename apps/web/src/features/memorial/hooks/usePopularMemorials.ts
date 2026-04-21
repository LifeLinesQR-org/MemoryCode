import { useQuery } from '@tanstack/react-query'
import { memorialService } from '../services/memorialService'

export function useMemorials() {
    const { data: memorials, isLoading } = useQuery({
        queryKey: ['memorials'],
        queryFn: () => memorialService.findPopular(),
    })

    return { memorials, isLoading }
}