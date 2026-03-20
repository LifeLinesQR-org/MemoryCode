import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
    constructor() {
        const databaseUrl = process.env.DATABASE_URL ?? process.env.POSTGRES_URL
        if (!databaseUrl) {
            throw new Error('DATABASE_URL (or POSTGRES_URL) is not set')
        }

        const pool = new Pool({ connectionString: databaseUrl })
        const adapter = new PrismaPg(pool)
        super({ adapter })
    }

    public async onModuleInit(): Promise<void> {
        await this.$connect()
    }

    public async onModuleDestroy(): Promise<void> {
        await this.$disconnect()
    }
}