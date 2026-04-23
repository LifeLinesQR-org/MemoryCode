import {Injectable, OnApplicationBootstrap} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {PrismaService} from "@/prisma/prisma.service";
import * as argon from 'argon2'
import {MemorialType} from "@prisma/client";

@Injectable()
export class DataInit implements OnApplicationBootstrap {
    constructor(private readonly prismaService: PrismaService) {}

    async onApplicationBootstrap() {
        await this.seedData()
    }

    private async seedData() {
        const adminUser = await this.prismaService.user.findFirst({
            where: {
                displayName: "admin"
            }
        })

        if (!adminUser)
            await this.prismaService.user.create({
                data: {
                    email: "admin@gmail.com",
                    password: await argon.hash("111111"),
                    displayName: "admin",
                    role: "ADMIN",
                    isVerified: true,
                    method: "CREDENTIALS"
                }
            })

        const user = await this.prismaService.user.findFirst({
            where: {
                displayName: "user"
            }
        })

        if (!user)
            await this.prismaService.user.create({
                data: {
                    email: "user@gmail.com",
                    password: await argon.hash("111111"),
                    displayName: "user",
                    role: "REGULAR",
                    isVerified: true,
                    method: "CREDENTIALS"
                }
            })

        const memorials = await this.prismaService.memorial.findMany({
            take: 3
        })

        if (memorials.length < 3) {
            await this.prismaService.memorial.deleteMany({})

            const memUser = await this.prismaService.user.findFirst({
                where: {
                    displayName: "user"
                }
            })

            if(memUser) {
                const newMemorials = [
                    {
                        name: "Иван",
                        surname: "Карулис",
                        middleName: "Дмитриевич",
                        bornDate: new Date("2007-04-18"),
                        isPublic: true,
                        title: "продакшн C# геймдев разработчик",
                        location: "Минская обл.",
                        type: MemorialType.FAME,
                        userId: memUser.id
                    },
                    {
                        name: "Виктор",
                        surname: "Цой",
                        middleName: "Робертович",
                        bornDate: new Date("1962-06-21"),
                        deathDate: new Date("1990-08-15"),
                        isPublic: true,
                        title: "\"И мы знаем, что так было всегда: что судьбою больше любим, кто живёт по законам другим и кому умирать молодым\"",
                        location: "Санкт-Петербург",
                        type: MemorialType.FAME,
                        userId: memUser.id
                    },
                    {
                        name: "Александр",
                        surname: "Пушкин",
                        middleName: "Сергеевич",
                        bornDate: new Date("1799-05-26"),
                        deathDate: new Date("1837-01-29"),
                        isPublic: true,
                        title: "Русский поэт, драматург и прозаик, заложивший основы русского реалистического направления, литературный критик и теоретик литературы, историк, публицист, журналист, редактор и издатель",
                        location: "Псковская обл.",
                        type: MemorialType.FAME,
                        userId: memUser.id
                    }
                ]

                await this.prismaService.memorial.createMany({
                    data: newMemorials
                })
            }
        }
    }
}