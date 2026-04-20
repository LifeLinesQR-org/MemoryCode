import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'

import { MainProvider } from '@/shared/providers'
import '@/shared/styles/globals.css'

export const metadata: Metadata = {
    title: {
        absolute: 'Memory Code',
        template: '%s | Memory Code'
    },
    description:
        'MemoryCode'
}

export default function RootLayout({
                                       children
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en' suppressHydrationWarning>
        <body className={GeistSans.variable}>
        <MainProvider>
            <div className='relative flex min-h-screen flex-col'>
                <div className='flex w-full items-center justify-center px-4'>
                    {children}
                </div>
            </div>
        </MainProvider>
        </body>
        </html>
    )
}