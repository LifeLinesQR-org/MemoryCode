'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Eye, MapPin } from 'lucide-react'

import { Button } from '@/shared/components/ui'
import Header from '@/shared/components/ui/Header'
import {useMemorials} from "@/features/memorial/hooks/usePopularMemorials";

export default function MemorialsPage() {
    const [search, setSearch] = useState('')
    const { memorials, isLoading } = useMemorials()

    const filtered = (memorials ?? []).filter((m) => {
        const fullName = `${m.name} ${m.surname} ${m.middleName}`.toLowerCase()
        return fullName.trim().includes(search.toLowerCase())
    })

    return (
        <div className='min-h-screen bg-background text-foreground'>
            <Header />
            <main className='mx-auto max-w-4xl px-6 py-10 lg:px-8'>
                <h1 className='mb-6 text-3xl font-bold tracking-tight'>
                    Мемориалы
                </h1>

                {/* Search */}
                <div className='relative mb-6'>
                    <Search className='absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
                    <input
                        type='text'
                        placeholder='Поиск...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='w-full rounded-full border bg-muted/40 py-3 pl-11 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-green-500'
                    />
                </div>

                <div className='flex flex-col gap-4'>
                    {filtered.map((memorial) => (
                        <Link
                            key={memorial.id}
                            href={`/memorials/${memorial.id}`}
                            className='flex items-start gap-5 rounded-2xl border bg-muted/20 p-5 transition-colors hover:bg-muted/40'
                        >
                            {/* Avatar */}
                            <div className='size-20 shrink-0 rounded-full bg-muted' />

                            {/* Content */}
                            <div className='flex-1 min-w-0'>
                                <div className='flex items-start justify-between gap-2 flex-wrap'>
                                    <h2 className='text-lg font-bold'>
                                        {memorial.name} {memorial.surname}{' '}
                                        {memorial.middleName}
                                    </h2>
                                    {memorial.type === "FAME" && (
                                        <span className='shrink-0 rounded-full bg-green-500 px-3 py-0.5 text-xs font-medium text-white'>
                                            Известная личность
                                        </span>
                                    )}
                                </div>

                                <div className='mt-1 flex items-center gap-4 text-sm text-muted-foreground'>
                                    <span>
                                        <span>{new Date(memorial.bornDate).toLocaleDateString('ru-RU')}</span> -{' '}
                                        <span>{new Date(memorial.deathDate).toLocaleDateString('ru-RU')}</span>
                                    </span>
                                    <span className='flex items-center gap-1'>
                                        <MapPin className='size-3' />
                                        {memorial.location}
                                    </span>
                                </div>

                                <p className='mt-2 text-sm text-muted-foreground line-clamp-2'>
                                    {memorial.description}
                                </p>

                                <div className='mt-2 flex items-center gap-1 text-sm text-muted-foreground'>
                                    <Eye className='size-3.5' />
                                    <span>{memorial.views} просмотра</span>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {filtered.length === 0 && (
                        <p className='py-10 text-center text-muted-foreground'>
                            Ничего не найдено
                        </p>
                    )}
                </div>
            </main>
        </div>
    )
}