'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Mail, User, Lock, Eye, EyeOff } from 'lucide-react'

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

import { useRegisterMutation } from '../hooks'
import { RegisterSchema, type TypeRegisterSchema } from '../schemes'
import { NewAuthWrapper } from './index'

export function NewRegisterForm() {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordRepeat, setShowPasswordRepeat] = useState(false)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true)
    }, [])

    const form = useForm<TypeRegisterSchema>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            passwordRepeat: ''
        }
    })

    const { register, isLoadingRegister } = useRegisterMutation()

    const onSubmit = (values: TypeRegisterSchema) => {
        if (recaptchaValue) {
            register({ values, recaptcha: recaptchaValue })
        } else {
            toast.error('Пожалуйста, завершите reCAPTCHA')
        }
    }

    return (
        <NewAuthWrapper
            heading='Регистрация'
            activeTab='register'
            backButtonLabel='Уже есть аккаунт?'
            backButtonHref='/auth/login'
            backButtonLinkLabel='Войти'
            isShowSocial
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='grid gap-4'
                >
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <div className='relative'>
                                        <User className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
                                        <Input
                                            placeholder='Иван'
                                            disabled={isLoadingRegister}
                                            className='pl-9'
                                            {...field}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <div className='relative'>
                                        <Mail className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
                                        <Input
                                            placeholder='ivan@example.com'
                                            disabled={isLoadingRegister}
                                            type='email'
                                            className='pl-9'
                                            {...field}
                                        />
                                    </div>
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className='relative'>
                                        <Lock className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
                                        <Input
                                            placeholder='••••••••'
                                            disabled={isLoadingRegister}
                                            type={showPassword ? 'text' : 'password'}
                                            className='pl-9 pr-9'
                                            {...field}
                                        />
                                        <button
                                            type='button'
                                            onClick={() => setShowPassword(!showPassword)}
                                            className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                                        >
                                            {showPassword ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='passwordRepeat'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Repeat password</FormLabel>
                                <FormControl>
                                    <div className='relative'>
                                        <Lock className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
                                        <Input
                                            placeholder='••••••••'
                                            disabled={isLoadingRegister}
                                            type={showPasswordRepeat ? 'text' : 'password'}
                                            className='pl-9 pr-9'
                                            {...field}
                                        />
                                        <button
                                            type='button'
                                            onClick={() => setShowPasswordRepeat(!showPasswordRepeat)}
                                            className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                                        >
                                            {showPasswordRepeat ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='recaptcha-container mx-auto'>
                        {mounted ? (
                            <ReCAPTCHA
                                key={resolvedTheme}
                                sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY as string}
                                onChange={setRecaptchaValue}
                                theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
                            />
                        ) : null}
                    </div>
                    <Button
                        type='submit'
                        disabled={isLoadingRegister}
                        className='w-full bg-green-500 hover:bg-green-600 text-white'
                    >
                        Создать аккаунт
                    </Button>
                </form>
            </Form>
        </NewAuthWrapper>
    )
}