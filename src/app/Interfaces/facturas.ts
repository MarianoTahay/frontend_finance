export interface Facturas {
    id_factura: number;
    dte: number;
    serie: string;
    nit_emisor: number;
    monto: number;
    fecha_emision: string;
    id_usuario: number;
    imagen: string;
    pdf: string;
    status: string;
    username: string; 
}
