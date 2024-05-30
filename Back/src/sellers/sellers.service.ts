import { PrismaService } from "src/prisma.service";
import { Injectable } from "@nestjs/common";


@Injectable()
export class SellersService {

    constructor(private prisma: PrismaService) { }

    async getAllSellers(): Promise<any> {
        return this.prisma.vendedor.findMany()
    }
}