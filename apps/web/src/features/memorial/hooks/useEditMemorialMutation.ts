import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'
import { memorialService } from '../services/memorialService'

export function useEditMemorialMutation(id: string) {
    const router = useRouter()

    const { mutate: edit, isPending: isLoadingEdit } = useMutation({
        mutationKey: ['edit memorial'],
        mutationFn: (values: any) => memorialService.edit(id, values),
        onSuccess(data: any) {
            toast.success('Мемориал обновлён')
            router.push(`/memorials/${data?.id}`)
        },
        onError(error) {
            toastMessageHandler(error)
        },
    })

    return { edit, isLoadingEdit }
}