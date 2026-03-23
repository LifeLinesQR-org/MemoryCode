'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input
} from '@/shared/components/ui'

import { useLoginMutation } from '../hooks'
import { LoginSchema, type TypeLoginSchema } from '../schemes'

import { AuthWrapper } from './index'

export function LoginForm() {
	const { resolvedTheme } = useTheme()
	const [mounted, setMounted] = useState(false)
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
	const [isShowTwoFactor, setIsShowFactor] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const form = useForm<TypeLoginSchema>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const { login, isLoadingLogin } = useLoginMutation(setIsShowFactor)

	const onSubmit = (values: TypeLoginSchema) => {
		if (recaptchaValue) {
			login({ values, recaptcha: recaptchaValue })
		} else {
			toast.error('Пожалуйста, завершите reCAPTCHA')
		}
	}

	return (
		<AuthWrapper
			heading='Welcome Back'
			description='Sign in to acces your memorials and preferences'
			backButtonLabel='Don’t have an account? Sign up'
			backButtonHref='/auth/register'
			isShowSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-2 space-y-2'
				>
					{isShowTwoFactor && (
						<FormField
							control={form.control}
							name='code'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Код</FormLabel>
									<FormControl>
										<Input
											placeholder='123456'
											disabled={isLoadingLogin}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
					{!isShowTwoFactor && (
						<>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Почта</FormLabel>
										<FormControl>
											<Input
												placeholder='ivan@example.com'
												disabled={isLoadingLogin}
												type='email'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<div className='flex items-center justify-between'>
											<FormLabel>Пароль</FormLabel>
											<Link
												href='/auth/reset-password'
												className='ml-auto inline-block text-sm underline'
											>
												Забыли пароль?
											</Link>
										</div>
										<FormControl>
											<Input
												placeholder='******'
												disabled={isLoadingLogin}
												type='password'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					)}
					<div className='recaptcha-container flex justify-center'>
						{mounted ? (
							<ReCAPTCHA
								key={resolvedTheme}
								sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY as string}
								onChange={setRecaptchaValue}
								theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
							/>
						) : null}
					</div>
					<Button type='submit' disabled={isLoadingLogin}>
						Войти в аккаунт
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
