'use client'

import {QueryClient, useQuery} from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import { CalendarDays, Eye, MapPin, QrCode, Share2, Trash, Edit3Icon } from 'lucide-react'

import { Button } from '@/shared/components/ui'
import Header from '@/shared/components/ui/Header'
import { memorialService } from '@/features/memorial/services/memorialService'
import Link from "next/link";

interface MemorialProps {
    id: string
}

export default function Memorial({ id }: MemorialProps) {
    const { data: memorial, isLoading } = useQuery({
        queryKey: ['memorial', id],
        queryFn: () => memorialService.findById(id),
    })

    if (isLoading) {
        return (
            <div className='min-h-screen bg-background text-foreground'>
                <Header />
                <main className='mx-auto max-w-4xl px-6 py-10 lg:px-8'>
                    {/* Скелетон */}
                    <div className='animate-pulse'>
                        <div className='flex items-center gap-6'>
                            <div className='size-28 shrink-0 rounded-full bg-muted' />
                            <div className='flex-1 space-y-3'>
                                <div className='h-8 w-64 rounded-lg bg-muted' />
                                <div className='h-4 w-40 rounded-lg bg-muted' />
                                <div className='h-4 w-32 rounded-lg bg-muted' />
                            </div>
                        </div>
                        <div className='mt-8 space-y-3'>
                            <div className='h-4 w-full rounded-lg bg-muted' />
                            <div className='h-4 w-full rounded-lg bg-muted' />
                            <div className='h-4 w-3/4 rounded-lg bg-muted' />
                        </div>
                    </div>
                </main>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className='min-h-screen bg-background text-foreground'>
                <Header />
                <main className='mx-auto max-w-4xl px-6 py-10 lg:px-8'>
                    <div className='animate-pulse'>
                    </div>
                </main>
            </div>
        )
    }

    if (!memorial) return (
        <div className='min-h-screen bg-background text-foreground'>
            <Header />
            <main className='mx-auto max-w-4xl px-6 py-10 lg:px-8'>
                <p className='text-muted-foreground'>Мемориал не найден</p>
            </main>
        </div>
    )
    const m = memorial

    const fullName = `${m.surname} ${m.name} ${m.middleName}`

    const bornDate = new Date(m.bornDate).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    const deathDate = m.deathDate
        ? new Date(m.deathDate).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        : null

    const age = m.deathDate
        ? new Date(m.deathDate).getFullYear() - new Date(m.bornDate).getFullYear()
        : new Date().getFullYear() - new Date(m.bornDate).getFullYear()

    return (
        <div className='min-h-screen min-w-screen bg-background text-foreground'>
            <Header />
            <main className='mx-auto max-w-4xl px-6 py-10 lg:px-8'>

                {/* Шапка */}
                <div className='flex flex-col gap-6 sm:flex-row sm:items-start'>
                    {/* Аватар */}
                    <div className='size-28 shrink-0 rounded-full bg-muted' />

                    {/* Основная информация */}
                    <div className='flex-1'>
                        <div className='flex flex-wrap items-start justify-between gap-3'>
                            <div>
                                <h1 className='text-3xl font-bold tracking-tight'>
                                    {fullName}
                                </h1>
                                {m.type === 'FAME' && (
                                    <span className='mt-2 inline-block rounded-full bg-green-500 px-3 py-0.5 text-xs font-medium text-white'>
                                        Известная личность
                                    </span>
                                )}
                            </div>

                            {/* Действия */}
                            <div className='ml-20 flex gap-2'>
                                <Button variant='outline' size='sm' className='gap-1.5'>
                                    <Trash className='size-4' />
                                </Button>
                                <Button variant='outline' size='sm' className='gap-1.5'>
                                    <Link href={`/memorials/${id}/edit`}>
                                        <Edit3Icon className='size-4' />
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Мета */}
                        <div className='mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
                            <span className='flex items-center gap-1.5'>
                                <CalendarDays className='size-4' />
                                {bornDate} — {deathDate ?? 'н.в.'} · {age} лет
                            </span>
                            {m.location && (
                                <span className='flex items-center gap-1.5'>
                                    <MapPin className='size-4' />
                                    {m.location}
                                </span>
                            )}
                            <span className='flex items-center gap-1.5'>
                                <Eye className='size-4' />
                                {m.views} просмотров
                            </span>
                        </div>
                    </div>
                </div>

                {/* Заголовок */}
                {m.title && (
                    <p className='mt-8 text-lg font-medium text-foreground'>
                        {m.title}
                    </p>
                )}

                {/* Описание */}
                {m.description && (
                    <div className='mt-4 rounded-2xl border bg-muted/20 p-6'>
                        <p className='whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground'>
                            {m.description}
                        </p>
                    </div>
                )}

                {/* Даты — блок */}
                <div className='mt-8 grid gap-4 sm:grid-cols-2'>
                    <div className='rounded-2xl border bg-muted/20 p-5'>
                        <p className='text-xs text-muted-foreground'>Дата рождения</p>
                        <p className='mt-1 text-base font-semibold'>{bornDate}</p>
                    </div>
                    {deathDate && (
                        <div className='rounded-2xl border bg-muted/20 p-5'>
                            <p className='text-xs text-muted-foreground'>Дата смерти</p>
                            <p className='mt-1 text-base font-semibold'>{deathDate}</p>
                        </div>
                    )}
                </div>

            </main>
        </div>
    )
}