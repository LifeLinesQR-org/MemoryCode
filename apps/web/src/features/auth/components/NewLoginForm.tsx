'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

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
import { NewAuthWrapper } from './index'

export function NewLoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [isShowTwoFactor, setIsShowFactor] = useState(false)

    const form = useForm<TypeLoginSchema>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const { login, isLoadingLogin } = useLoginMutation(setIsShowFactor)

    const onSubmit = (values: TypeLoginSchema) => {
        login({ values, recaptcha: '' })
    }

    return (
        <NewAuthWrapper
            heading='Welcome Back'
            description='Sign in to access your memorials and preferences'
            backButtonLabel="Don't have an account?"
            backButtonHref='/auth/register'
            backButtonLinkLabel='Sign up'
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='grid gap-4'
                >
                    {isShowTwoFactor && (
                        <FormField
                            control={form.control}
                            name='code'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Code</FormLabel>
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
                                        <FormLabel>Account Name</FormLabel>
                                        <FormControl>
                                            <div className='relative'>
                                                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
                                                <Input
                                                    placeholder='your@email.com'
                                                    disabled={isLoadingLogin}
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
                                                    disabled={isLoadingLogin}
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
                                        <div className='flex justify-end'>
                                            <Link
                                                href='/auth/reset-password'
                                                className='text-sm text-green-500 hover:underline'
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}
                    <Button
                        type='submit'
                        disabled={isLoadingLogin}
                        className='w-full bg-green-500 hover:bg-green-600 text-white'
                    >
                        Sign In
                    </Button>
                </form>
            </Form>
        </NewAuthWrapper>
    )
}