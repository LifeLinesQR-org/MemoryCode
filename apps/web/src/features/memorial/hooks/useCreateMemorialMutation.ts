import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'
import { memorialService } from '../services/memorialService'

export function useCreateMemorialMutation() {
    const router = useRouter()

    const { mutate: create, isPending: isLoadingCreate } = useMutation({
        mutationKey: ['create memorial'],
        mutationFn: (values: any) => memorialService.create(values),
        onSuccess(data: any) {
            console.log('data:', data)
            console.log('data?.id:', data?.id)
            toast.success('Мемориал создан')
            router.push(`/memorials/${data?.id}`)
        },
        onError(error) {
            console.log('error data:', error)
            console.log(error)
            toastMessageHandler(error)
        },
    })

    return { create, isLoadingCreate }
}