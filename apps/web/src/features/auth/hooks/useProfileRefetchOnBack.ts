'use client'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

export function useProfileRefetchOnBack() {
    const queryClient = useQueryClient()

    useEffect(() => {
        const handler = (event: PageTransitionEvent) => {
            if (event.persisted) {
                queryClient.invalidateQueries({ queryKey: ['profile'] })
            }
        }
        window.addEventListener('pageshow', handler)
        return () => window.removeEventListener('pageshow', handler)
    }, [queryClient])
}