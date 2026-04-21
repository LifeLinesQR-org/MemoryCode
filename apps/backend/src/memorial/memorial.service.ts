import {Injectable, NotFoundException} from "@nestjs/common";
import {PrismaService} from "@/prisma/prisma.service";
import {User} from "@prisma/client";
import {UpdateUserDto} from "@/user/dto/update-user.dto";
import {CreateMemorialDto} from "@/memorial/dto/create-memorial.dto";

@Injectable()
export class MemorialService {

    public constructor(private readonly prismaService: PrismaService) {}

    public async findById(id: string) {
        const memorial = await this.prismaService.memorial.findUnique({
            where: {id}
        });

        if (!memorial)
            throw new NotFoundException("Memorial not found");

        return memorial;
    }

    public async findPopular() {
        const memorials = await this.prismaService.memorial.findMany({
            take: 10,
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                isPublic: true
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
}