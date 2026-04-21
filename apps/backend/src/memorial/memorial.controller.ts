import {Body, Controller, Get, Param, Post, Req, Res} from "@nestjs/common";
import {MemorialService} from "@/memorial/memorial.service";
import {Authorization} from "@/auth/decorators/auth.decorator";
import {CreateMemorialDto} from "@/memorial/dto/create-memorial.dto";
import {Authorized} from "@/auth/decorators/authorized.decorator";

@Controller("memorials")
export class MemorialController {

    public constructor(private readonly memorialService: MemorialService) {}

    @Authorization()
    @Get()
    public async getPopularMemorials() {
        return this.memorialService.findPopular()
    }

    @Authorization()
    @Get('/:id')
    public async findById(@Param('id') id: string) {
        return this.memorialService.findById(id)
    }

    @Authorization()
    @Post('/create')
    public async create(
        @Authorized('id') userId: string,
        @Body() dto: CreateMemorialDto
    ) {
        return this.memorialService.create(userId, dto)
    }
}