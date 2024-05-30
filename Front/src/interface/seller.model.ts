export interface SellerResponse {
    status: string;
    message: string;
    result: Seller[];
}

export interface Seller {
    id: number
    apellido: string;
    nombre: string;
    rut: string;
}