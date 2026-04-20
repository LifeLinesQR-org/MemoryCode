'use client'

import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'

import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Loading,
    Switch
} from '@/shared/components/ui'
import {useProfile} from '@/shared/hooks'

import {useUpdateProfileMutation} from '../hooks'
import {SettingsSchema, type TypeSettingsSchema} from '../schemes'

import {UserButton, UserButtonLoading} from './index'
import { redirect } from "next/navigation";
import Header from "@/shared/components/ui/Header";

export function SettingsForm() {
    const {user, isLoading} = useProfile()

    const form = useForm<TypeSettingsSchema>({
        resolver: zodResolver(SettingsSchema),
        values: {
            name: user?.displayName || '',
            email: user?.email || '',
            isTwoFactorEnabled: user?.isTwoFactorEnabled || false
        }
    })

    const {update, isLoadingUpdate} = useUpdateProfileMutation()

    const onSubmit = (values: TypeSettingsSchema) => {
        update({values})
    }

	if (isLoading) return <Loading />

	if (!isLoading && !user) {
		redirect('/auth/login')
	}

	if(!user) return null

    return (
        <div className="min-h-screen flex flex-col">
            <div className="w-screen">
                <Header />
            </div>
            <div className="flex flex-1 items-center justify-center px-4 mt-8">
                <Card className='w-[400px]'>
                    <CardHeader className='flex flex-row items-center justify-between'>
                        <CardTitle>Настройки профиля</CardTitle>
                        {isLoading ? <UserButtonLoading/> : <UserButton user={user}/>}
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Loading/>
                        ) : (
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className='grid gap-2 space-y-2'
                                >
                                    <FormField
                                        control={form.control}
                                        name='name'
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Имя</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='Иван'
                                                        disabled={isLoadingUpdate}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='email'
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Почта</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='ivan@example.com'
                                                        disabled={isLoadingUpdate}
                                                        type='email'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='isTwoFactorEnabled'
                                        render={({field}) => (
                                            <FormItem
                                                className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                                                <div className='space-y-0.5'>
                                                    <FormLabel>
                                                        Двухфакторная аутентификация
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Включите двухфакторную
                                                        аутентификацию для вашей учетной
                                                        записи
                                                    </FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        disabled={isLoadingUpdate}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <Button type='submit' disabled={isLoadingUpdate}>
                                        Сохранить
                                    </Button>
                                </form>
                            </Form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
