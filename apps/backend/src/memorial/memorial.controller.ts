import {Body, Controller, Get, Param, Post, Req, Res} from "@nestjs/common";
import {MemorialService} from "@/memorial/memorial.service";
import {Authorization} from "@/auth/decorators/auth.decorator";
import {CreateMemorialDto} from "@/memorial/dto/create-memorial.dto";
import {Authorized} from "@/auth/decorators/authorized.decorator";
import {UpdateMemorialDto} from "@/memorial/dto/update-memorial.dto";

@Controller("memorials")
export class MemorialController {

    public constructor(private readonly memorialService: MemorialService) {}

    @Authorization()
    @Get()
    public async getPopularMemorials(
        @Authorized('id') userId: string,
        @Authorized('role') userRole: string
    ) {
        return this.memorialService.findPopular(userId, userRole);
    }

    @Authorization()
    @Get('/:id')
    public async findById(
        @Param('id') id: string,
        @Authorized('id') userId: string,
        @Authorized('role') userRole: string,
    ) {
        return this.memorialService.findById(id, userId, userRole);
    }

    @Authorization()
    @Post('/create')
    public async create(
        @Authorized('id') userId: string,
        @Body() dto: CreateMemorialDto
    ) {
        return this.memorialService.create(userId, dto)
    }

    @Authorization()
    @Post('/:id/update')
    public async update(
        @Param('id') id: string,
        @Authorized('id') userId: string,
        @Body() dto: UpdateMemorialDto
    ) {
        return this.memorialService.update(id, userId, dto)
    }
}