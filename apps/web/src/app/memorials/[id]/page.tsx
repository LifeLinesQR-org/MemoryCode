import { Metadata } from 'next'
import Memorial from '@/features/memorial/components/Memorial'

export const metadata: Metadata = {
    title: 'Memorial',
}

interface MemorialPageProps {
    params: Promise<{ id: string }>
}

export default async function MemorialPage({ params }: MemorialPageProps) {
    const { id } = await params
    return <Memorial id={id} />
}