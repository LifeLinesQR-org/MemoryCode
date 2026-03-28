'use client'

import Link from 'next/link'
import {
    ArrowRight,
    CheckCircle2,
    ShieldCheck,
    Sparkles,
    Smartphone,
    Zap,
} from 'lucide-react'

import { Button } from '@/shared/components/ui'
import Header from '@/shared/components/ui/Header'

export default function Home() {
    const features = [
        {
            icon: Sparkles,
            title: 'Удобный интерфейс',
            description:
                'Простой и чистый UI, который не отвлекает от главного.',
        },
        {
            icon: ShieldCheck,
            title: 'Безопасность',
            description:
                'Надёжная авторизация, защита данных и удобный вход.',
        },
        {
            icon: Smartphone,
            title: 'Адаптивность',
            description:
                'Страница отлично выглядит на телефоне, планшете и десктопе.',
        },
        {
            icon: Zap,
            title: 'Быстрая работа',
            description:
                'Минимум лишнего, максимум скорости и плавности.',
        },
    ]

    const benefits = [
        'Быстрый старт без сложной настройки',
        'Готовый UI в стиле современного SaaS',
        'Легко расширяется под твой проект',
    ]

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main>
                <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-16 lg:px-8">
                    <div className="grid w-full gap-12 lg:grid-cols-2 lg:items-center">
                        <div className="max-w-xl">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="size-4 text-green-500" />
                                Готовая главная страница на Next.js
                            </div>

                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                                Создавай быстрый и красивый фронт без лишней
                                возни
                            </h1>

                            <p className="mt-6 text-lg text-muted-foreground">
                                Это пример главной страницы в том же стиле,
                                что и твоя форма логина: чистая верстка,
                                аккуратные блоки и нормальная структура для
                                проекта.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Button asChild className="bg-green-500 text-white hover:bg-green-600">
                                    <Link href="/auth/login">
                                        Начать работу
                                        <ArrowRight className="ml-2 size-4" />
                                    </Link>
                                </Button>

                                <Button asChild variant="outline">
                                    <Link href="#features">Подробнее</Link>
                                </Button>
                            </div>

                            <ul className="mt-8 grid gap-3 text-sm text-muted-foreground">
                                {benefits.map((item) => (
                                    <li key={item} className="flex items-center gap-2">
                                        <CheckCircle2 className="size-4 text-green-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="relative">
                            <div className="rounded-3xl border bg-card p-6 shadow-sm">
                                <div className="mb-4 flex items-center justify-between">
                                    <span className="text-sm font-medium">
                                        Панель проекта
                                    </span>
                                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600">
                                        Online
                                    </span>
                                </div>

                                <div className="grid gap-4">
                                    <div className="rounded-2xl border p-4">
                                        <p className="text-sm text-muted-foreground">
                                            Авторизация
                                        </p>
                                        <p className="mt-1 text-lg font-semibold">
                                            Email, пароль, 2FA, reCAPTCHA
                                        </p>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="rounded-2xl border p-4">
                                            <p className="text-sm text-muted-foreground">
                                                Скорость
                                            </p>
                                            <p className="mt-1 text-2xl font-bold">
                                                Fast
                                            </p>
                                        </div>
                                        <div className="rounded-2xl border p-4">
                                            <p className="text-sm text-muted-foreground">
                                                UI
                                            </p>
                                            <p className="mt-1 text-2xl font-bold">
                                                Clean
                                            </p>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border p-4">
                                        <p className="text-sm text-muted-foreground">
                                            Что внутри
                                        </p>
                                        <div className="mt-3 grid gap-3">
                                            {[
                                                'Header и навигация',
                                                'Hero-блок с CTA',
                                                'Карточки преимуществ',
                                                'Адаптивная сетка',
                                            ].map((item) => (
                                                <div
                                                    key={item}
                                                    className="flex items-center gap-2 text-sm"
                                                >
                                                    <CheckCircle2 className="size-4 text-green-500" />
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" className="border-t bg-muted/30">
                    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Почему этот шаблон удобно брать за основу
                            </h2>
                            <p className="mt-4 text-muted-foreground">
                                Он уже выглядит как нормальный продукт: есть
                                структура, акценты и пространство для твоей
                                логики.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                            {features.map((feature) => {
                                const Icon = feature.icon
                                return (
                                    <div
                                        key={feature.title}
                                        className="rounded-2xl border bg-background p-6 shadow-sm"
                                    >
                                        <div className="mb-4 inline-flex rounded-xl bg-green-500/10 p-3 text-green-600">
                                            <Icon className="size-5" />
                                        </div>
                                        <h3 className="text-lg font-semibold">
                                            {feature.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            {feature.description}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <div className="rounded-3xl border bg-card px-6 py-10 shadow-sm sm:px-10">
                        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                    Готов начать собирать свой проект?
                                </h2>
                                <p className="mt-4 text-muted-foreground">
                                    Дальше можно подключить API, добавить
                                    авторизацию, личный кабинет и любую
                                    бизнес-логику.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                                <Button asChild className="bg-green-500 text-white hover:bg-green-600">
                                    <Link href="/auth/register">
                                        Регистрация
                                    </Link>
                                </Button>
                                <Button asChild variant="outline">
                                    <Link href="/auth/login">
                                        Войти
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}