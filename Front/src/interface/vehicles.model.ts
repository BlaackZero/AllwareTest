import { Seller } from "./seller.model";

export interface VehicleResponse {
    status: string;
    message: string;
    result: Vehicle[];
}

export interface Vehicle {
    id: number;
    patente: string;
    precio: number;
    marcaId: number;
    modeloId: number;
    vendedorId: number;
    vendedor: Seller;
    marca: Marca;
    modelo: Modelo;
}

interface Marca {
    nombre: string;
}

interface Modelo {
    nombre: string;
}