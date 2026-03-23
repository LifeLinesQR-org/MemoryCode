import Link from 'next/link'
import { type PropsWithChildren } from 'react'
import { User } from 'lucide-react'

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription
} from '@/shared/components/ui'

interface NewAuthWrapperProps {
    heading: string
    description?: string
    backButtonLabel?: string
    backButtonHref?: string
    backButtonLinkLabel?: string
    backButtonLinkHref?: string
}

export function NewAuthWrapper({
   children,
   heading,
   description,
   backButtonLabel,
   backButtonHref,
   backButtonLinkLabel,
   backButtonLinkHref,
}: PropsWithChildren<NewAuthWrapperProps>) {
    return (
        <Card className='w-[380px] border-brand/35! border-2!'>
            <div className='flex justify-center pt-8'>
                <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500'>
                    <User className='size-8 text-white' strokeWidth={1.5} />
                </div>
            </div>
            <CardHeader className='items-center space-y-1 pb-2'>
                <CardTitle className='text-2xl'>{heading}</CardTitle>
                {description && (
                    <CardDescription className='text-center'>
                        {description}
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent className='px-8'>
                {children}
            </CardContent>
            <CardFooter className='flex justify-center pb-8'>
                {backButtonLabel && backButtonHref && (
                    <p className='text-sm text-muted-foreground'>
                        {backButtonLabel}{' '}
                        <Link
                            href={backButtonHref}
                            className='text-green-500 hover:underline font-medium'
                        >
                            {backButtonLinkLabel}
                        </Link>
                    </p>
                )}
            </CardFooter>
        </Card>
    )
}