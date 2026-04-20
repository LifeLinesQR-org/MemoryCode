import Link from 'next/link'
import { type PropsWithChildren } from 'react'
import { User } from 'lucide-react'

import {
    Card,
    CardContent,
    CardFooter,
} from '@/shared/components/ui'

import { AuthSocial } from './index'

interface NewAuthWrapperProps {
    heading: string
    activeTab?: 'login' | 'register'
    backButtonLabel?: string
    backButtonHref?: string
    backButtonLinkLabel?: string
    backButtonLinkHref?: string
    isShowSocial?: boolean
}

export function NewAuthWrapper({
   children,
   activeTab = 'login',
   backButtonLabel,
   backButtonHref,
   backButtonLinkLabel,
   isShowSocial = false,
}: PropsWithChildren<NewAuthWrapperProps>) {
    return (
        <Card className='w-[380px] !border-2 !border-brand/35'>
            <div className='flex justify-center pt-8'>
                <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500'>
                    <User className='size-8 text-white' strokeWidth={1.5} />
                </div>
            </div>
            <div className='mx-6 mt-4 grid grid-cols-2 rounded-lg bg-muted p-1'>
                <Link
                    href='/auth/login'
                    className={`rounded-md py-2 text-center text-sm font-medium transition-colors ${
                        activeTab === 'login'
                            ? 'bg-card text-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                    Войти
                </Link>
                <Link
                    href='/auth/register'
                    className={`rounded-md py-2 text-center text-sm font-medium transition-colors ${
                        activeTab === 'register'
                            ? 'bg-card text-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                    Регистрация
                </Link>
            </div>

            <CardContent className='px-6 pt-4'>
                {children}
            </CardContent>

            {isShowSocial && (
                <div className='px-6'>
                    <AuthSocial />
                </div>
            )}

            <CardFooter className='flex justify-center pb-6'>
                {backButtonLabel && backButtonHref && (
                    <p className='text-sm text-muted-foreground'>
                        {backButtonLabel}{' '}
                        <Link
                            href={backButtonHref}
                            className='font-medium text-green-500 hover:underline'
                        >
                            {backButtonLinkLabel}
                        </Link>
                    </p>
                )}
            </CardFooter>
        </Card>
    )
}