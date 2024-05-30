import { PrismaService } from "src/prisma.service";
import { Injectable } from "@nestjs/common";


@Injectable()
export class BrandsService {

    constructor(private prisma: PrismaService) { }

    async getAll(): Promise<any> {
        return this.prisma.marca.findMany({
            include: {
                modelos: {
                    select: {
                        id: true,
                        nombre: true,
                    }
                }
            }
        });
    }
}