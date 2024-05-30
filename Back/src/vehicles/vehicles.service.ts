import { PrismaService } from "src/prisma.service";
import { Injectable } from "@nestjs/common";


@Injectable()
export class VehiclesService {

    constructor(private prisma: PrismaService) { }

    async getAllSelledVehicles(): Promise<any> {
        return this.prisma.vehiculo.findMany({
            include: {
                vendedor: {
                    select: {
                        rut: true,
                        nombre: true,
                        apellido: true,
                    }
                },
                marca: {
                    select: {
                        nombre: true
                    }
                },
                modelo: {
                    select: {
                        nombre: true
                    }
                }
            }
        });
    }

    async addVehicle(data: any): Promise<any> {
        console.log(data);
        // Destruturamos la data
        const { vendedor, patente, marca, modelo, precio } = data;
    
        // Insertamos la data a la tabla vehiculo
        return this.prisma.vehiculo.create({
            data: {
                patente,
                precio: parseFloat(precio),
                vendedor: { connect: { id: parseInt(vendedor) } },
                marca: { connect: { id: parseInt(marca) } },
                modelo: { connect: { id: parseInt(modelo) } },
            },
        });
    }

    async deleteVehicle(id: number): Promise<any> {
        return this.prisma.vehiculo.delete({
            where: {
                id
            }
        });
    }
}