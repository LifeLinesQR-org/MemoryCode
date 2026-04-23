import {ForbiddenException, Injectable, NotFoundException} from "@nestjs/common";
import {PrismaService} from "@/prisma/prisma.service";
import {User} from "@prisma/client";
import {UpdateUserDto} from "@/user/dto/update-user.dto";
import {CreateMemorialDto} from "@/memorial/dto/create-memorial.dto";
import {UpdateMemorialDto} from "@/memorial/dto/update-memorial.dto";

@Injectable()
export class MemorialService {

    public constructor(private readonly prismaService: PrismaService) {}

    public async findById(id: string, userId: string, userRole: string) {
        const memorial = await this.prismaService.memorial.findUnique({
            where: {id}
        });

        if (!memorial)
            throw new NotFoundException("Memorial not found");

        if (!memorial.isPublic && memorial.userId !== userId && userRole !== 'ADMIN')
            throw new ForbiddenException('Нет доступа к этому меориалу')

        return memorial;
    }

    public async findPopular(userId: string, userRole: string) {
        const isAdmin = userRole === 'ADMIN';

        if(isAdmin)
            return this.prismaService.memorial.findMany({
                take: 10
            })

        const memorials = await this.prismaService.memorial.findMany({
            take: 10,
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                OR: [
                    { isPublic: true },
                    { userId: userId }
                ]
            }
        })

        return memorials;
    }

    public async create(
        userId: string,
        dto: CreateMemorialDto
    ) {
        const {name, surname, middleName, bornDate, deathDate, isPublic, title, description, location, type} = dto;
        const memorial = await this.prismaService.memorial.create({
            data: {
                name,
                surname,
                middleName,
                bornDate,
                deathDate,
                isPublic,
                title,
                description,
                location,
                type,
                userId,
            },
        })

        return memorial
    }

    public async update(
        id: string,
        userId: string,
        dto: UpdateMemorialDto
    ) {
        const memorial = await this.prismaService.memorial.findUnique({
            where: {
                id
            }
        })

        if (!memorial)
            throw new NotFoundException("Memorial not found");

        if (memorial.userId !== userId)
            throw new ForbiddenException("Forbidden");

        const { name, surname, middleName, bornDate, deathDate, isPublic, title, description, location, type } = dto;

        return this.prismaService.memorial.update({
            where: {
                id
            },
            data: {
                ...(name !== undefined && { name }),
                ...(surname !== undefined && { surname }),
                ...(middleName !== undefined && { middleName }),
                ...(bornDate !== undefined && { bornDate }),
                ...(deathDate !== undefined && { deathDate }),
                ...(isPublic !== undefined && { isPublic }),
                ...(title !== undefined && { title }),
                ...(description !== undefined && { description }),
                ...(location !== undefined && { location }),
                ...(type !== undefined && { type }),
            }
        })
    }
}