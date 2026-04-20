'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FaGoogle, FaYandex } from 'react-icons/fa'

import { Button } from '@/shared/components/ui'

import { authService } from '../services'

export function AuthSocial() {
	const router = useRouter()

	const { mutateAsync } = useMutation({
		mutationKey: ['oauth by provider'],
		mutationFn: async (provider: 'google' | 'yandex') =>
			await authService.oauthByProvider(provider)
	})

	const onClick = async (provider: 'google' | 'yandex') => {
		const response = await mutateAsync(provider)

		if (response) {
			router.push(response.url)
		}
	}

	return (
		<>
			<div className='relative mb-4 h-5'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-card px-2 text-muted-foreground'>
                    или
                </span>
				</div>
			</div>
			<div className='grid grid-cols-2 gap-3 mb-2'>
				<Button onClick={() => onClick('google')} variant='outline' className='gap-2'>
					<FaGoogle className='size-4 text-red-500' />
					Google
				</Button>
				<Button onClick={() => onClick('yandex')} variant='outline' className='gap-2'>
					<FaYandex className='size-4 text-yellow-500' />
					Яндекс
				</Button>
			</div>
		</>
	)
}
