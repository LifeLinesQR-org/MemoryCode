'use client'

import * as React from 'react'
import {ChevronDown, QrCode, LogOut, LayoutDashboard, Settings, User as UserIcon } from 'lucide-react'
import {useProfile} from "@/shared/hooks";
import Link from "next/link";
import {DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/shared/components/ui/DropDownMenu";
import {Avatar, AvatarFallback, AvatarImage} from "@/shared/components/ui/Avatar";
import {useProfileRefetchOnBack} from "@/features/auth/hooks";
import { ToggleTheme } from "./ToggleTheme";

const Header: React.FC = () => {
    const { user, isLoading } = useProfile()

    useProfileRefetchOnBack()

    const handleLogout = async () => {
        await fetch('/api/logout', { method: 'POST', credentials: 'include' })
        window.location.reload()
    }

    const getInitials = (name?: string | null, email?: string) => {
        const source = name?.trim() || email?.trim() || 'U'
        const parts = source.split(' ')
        if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
        return source.slice(0, 2).toUpperCase()
    }

    return (
        <header className="w-full border-b px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center gap-2">
                <QrCode className="w-10 h-10" />
                <span className="font-bold text-lg">Memory Code</span>
            </div>

            <nav className="flex items-center gap-4">
                <Link href="/" className="hover:opacity-70">Главная</Link>
                <Link href="/about" className="hover:opacity-70">О нас</Link>

                {!isLoading && !user && (
                    <div className="flex items-center gap-2">
                        <Link href="/auth/login" className="border px-3 py-1 rounded hover:bg-gray-100">Вход</Link>
                        <Link href="/auth/register" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Регистрация</Link>
                    </div>
                )}

                {!isLoading && user && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-2 rounded-full border px-2 py-1 pr-3 hover:bg-muted">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={user.picture ?? ''} alt={user.displayName ?? 'User'} />
                                    <AvatarFallback>
                                        {getInitials(user.displayName, user.email)}
                                    </AvatarFallback>
                                </Avatar>

                                <span className="hidden sm:block max-w-[140px] truncate text-sm font-medium">
                                    {user.displayName ?? user.email}
                                </span>

                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem asChild>
                                <Link href="/dashboard" className="flex w-full items-center gap-2">
                                    <LayoutDashboard className="h-4 w-4" />
                                    Панель
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                                <Link href="/profile" className="flex w-full items-center gap-2">
                                    <UserIcon className="h-4 w-4" />
                                    Профиль
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                                <Link href="/dashboard/settings" className="flex w-full items-center gap-2">
                                    <Settings className="h-4 w-4" />
                                    Настройки
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-500">
                                <LogOut className="h-4 w-4" />
                                Выйти
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}

                <ToggleTheme />
            </nav>
        </header>
    )
}

export default Header