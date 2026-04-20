import type { Metadata } from 'next'
import Home from '@/features/components/Home'

export const metadata: Metadata = {
    title: 'Home Page'
}

export default function HomePage() {
    return <Home />
}