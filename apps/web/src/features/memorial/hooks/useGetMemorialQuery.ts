import { useQuery } from '@tanstack/react-query'
import { memorialService } from '../services/memorialService'

export function useGetMemorialQuery(id?: string) {
    return useQuery({
        queryKey: ['memorial', id],
        queryFn: () => memorialService.findById(id!),
        enabled: !!id
    })
}