export interface BrandResponse {
    status: string;
    message: string;
    result: Brand[];
}

export interface Brand {
    id: number;
    nombre: string;
    modelos: { id: number; nombre: string }[];
}