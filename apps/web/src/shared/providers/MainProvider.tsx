'use client'

import { type PropsWithChildren } from 'react'

import { TanstackQueryProvider, ThemeProvider, ToastProvider } from './index'

export function MainProvider({ children }: PropsWithChildren<unknown>) {
    return (
        <TanstackQueryProvider>
            <ThemeProvider>
                <ToastProvider />
                {children}
            </ThemeProvider>
        </TanstackQueryProvider>
    )
}