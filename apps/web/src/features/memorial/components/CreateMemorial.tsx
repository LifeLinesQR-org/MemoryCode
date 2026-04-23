'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CalendarIcon } from 'lucide-react'

import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from '@/shared/components/ui'
import Header from '@/shared/components/ui/Header'
import { useCreateMemorialMutation } from '../hooks/useCreateMemorialMutation'

const CreateMemorialSchema = z.object({
    name: z.string().min(1, 'Введите имя'),
    surname: z.string().min(1, 'Введите фамилию'),
    middleName: z.string().min(1, 'Введите отчество'),
    isPublic: z.boolean(),
    location: z.string().max(100).optional(),
    title: z.string().min(1, 'Введите заголовок').max(200),
    description: z.string().max(1000).optional(),
    bornDate: z.string().min(1, 'Введите дату рождения'),
    deathDate: z.string().optional(),
    type: z.enum(['FAME', 'PERSONAL']),
})

type TypeCreateMemorialSchema = z.infer<typeof CreateMemorialSchema>

export default function CreateMemorialPage() {
    const form = useForm<TypeCreateMemorialSchema>({
        resolver: zodResolver(CreateMemorialSchema),
        defaultValues: {
            name: '',
            surname: '',
            middleName: '',
            isPublic: false,
            location: '',
            title: '',
            description: '',
            bornDate: '',
            deathDate: undefined,
            type: 'PERSONAL',
        },
    })

    const { create, isLoadingCreate } = useCreateMemorialMutation()

    const onSubmit = (values: TypeCreateMemorialSchema) => {
        console.log('submit values:', values)
        create({
            ...values,
            deathDate: values.deathDate || undefined,
        })
    }

    return (
        <div className='min-h-screen bg-background text-foreground'>
            <Header />
            <main className='mx-auto max-w-2xl px-6 py-10 lg:px-8'>
                <h1 className='mb-8 text-3xl font-bold tracking-tight'>
                    Создать мемориал
                </h1>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='grid gap-5'
                    >
                        {/* ФИО */}
                        <div className='grid gap-5 sm:grid-cols-3'>
                            <FormField
                                control={form.control}
                                name='surname'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Фамилия</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Иванов'
                                                disabled={isLoadingCreate}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Имя</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Иван'
                                                disabled={isLoadingCreate}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='middleName'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Отчество</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Иванович'
                                                disabled={isLoadingCreate}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Местоположение */}
                        <FormField
                            control={form.control}
                            name='location'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Местоположение
                                        <span className='text-muted-foreground'>
                                            (необязательно)
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Минск'
                                            disabled={isLoadingCreate}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Заголовок */}
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Заголовок</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Короткое представление о человеке...'
                                            disabled={isLoadingCreate}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Описание */}
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Описание
                                        <span className='text-muted-foreground'>
                                            (необязательно)
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <textarea
                                            placeholder='Подробное описание...'
                                            disabled={isLoadingCreate}
                                            rows={5}
                                            className='w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-green-500 disabled:opacity-50 resize-none'
                                            {...field}
                                            value={field.value ?? ''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='isPublic'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <label className='flex cursor-pointer items-center gap-3 rounded-xl border bg-muted/20 px-4 py-3 transition-colors hover:bg-muted/40'>
                                            <input
                                                type='checkbox'
                                                checked={field.value}
                                                onChange={field.onChange}
                                                disabled={isLoadingCreate}
                                                className='size-4 accent-green-500'
                                            />
                                            <div>
                                                <p className='text-sm font-medium'>Публичный</p>
                                                <p className='text-xs text-muted-foreground'>
                                                    Мемориал будет виден всем пользователям
                                                </p>
                                            </div>
                                        </label>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Даты */}
                        <div className='grid gap-5 sm:grid-cols-2'>
                            <FormField
                                control={form.control}
                                name='bornDate'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Дата рождения</FormLabel>
                                        <FormControl>
                                            <div className='relative'>
                                                <CalendarIcon className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
                                                <Input
                                                    type='date'
                                                    disabled={isLoadingCreate}
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
                                name='deathDate'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Дата смерти{' '}
                                            <span className='text-muted-foreground'>
                                                (необязательно)
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <div className='relative'>
                                                <CalendarIcon className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
                                                <Input
                                                    type='date'
                                                    disabled={isLoadingCreate}
                                                    className='pl-9'
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Тип */}
                        <FormField
                            control={form.control}
                            name='type'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Тип мемориала</FormLabel>
                                    <FormControl>
                                        <div className='flex gap-3'>
                                            {[
                                                { value: 'FAME', label: '🌟 Известная личность' },
                                                { value: 'PERSONAL', label: '👤 Личный' },
                                            ].map((option) => (
                                                <button
                                                    key={option.value}
                                                    type='button'
                                                    onClick={() => field.onChange(option.value)}
                                                    disabled={isLoadingCreate}
                                                    className={`flex-1 rounded-xl border py-3 text-sm font-medium transition-colors ${
                                                        field.value === option.value
                                                            ? 'border-green-500 bg-green-500/10 text-green-600'
                                                            : 'border-border bg-muted/20 text-muted-foreground hover:bg-muted/40'
                                                    }`}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type='submit'
                            disabled={isLoadingCreate}
                            className='mt-2 w-full bg-green-500 text-white hover:bg-green-600'
                        >
                            Создать мемориал
                        </Button>
                    </form>
                </Form>
            </main>
        </div>
    )
}