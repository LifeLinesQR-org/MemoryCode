import {IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";
import { MemorialType } from "@prisma/client";

export class CreateMemorialDto {

    @IsString({message: 'Имя должно быть строкой.'})
    @IsNotEmpty({message: 'Имя обязательно для заполнения.'})
    name: string

    @IsString({message: 'Фамилия должна быть строкой.'})
    @IsNotEmpty({message: 'Фамилия обязательна для заполнения.'})
    surname: string

    @IsOptional()
    @IsString({message: 'Отчество должно быть строкой.'})
    middleName: string

    @Type(() => Date)
    @IsDate({message: 'Дата рождения должна быть в формате даты'})
    @IsNotEmpty({message: 'Дата рождения обязательна для заполнения'})
    bornDate: Date

    @IsOptional()
    @Type(() => Date)
    @IsDate({message: 'Дата смерти должна быть в формате даты'})
    deathDate: Date

    @IsOptional()
    @IsBoolean({message: 'isPublic должен быть типа Boolean'})
    isPublic: boolean

    @IsString({message: 'Заголовок должен быть строкой.'})
    @IsNotEmpty({message: 'Заголовок обязателен для заполнения.'})
    title: string

    @IsOptional()
    @IsString({message: 'Описание должно быть строкой.'})
    description: string

    @IsOptional()
    @IsString()
    location: string

    @IsEnum(MemorialType, { message: "Неверный тип мемориала" })
    type: MemorialType

}