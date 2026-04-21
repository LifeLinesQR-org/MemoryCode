import {MemorialController} from "@/memorial/memorial.controller";
import {MemorialService} from "@/memorial/memorial.service";
import {Module} from "@nestjs/common";
import {UserService} from "@/user/user.service";

@Module({
    controllers: [MemorialController],
    providers: [MemorialService, UserService],
})
export class MemorialModule {}