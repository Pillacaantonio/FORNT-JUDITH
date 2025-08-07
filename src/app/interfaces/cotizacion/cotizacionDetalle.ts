export interface CotizacionVentaDetalle {
  ctvdIcodDetalleOc: number;
  ctvcIcodCotizacionVenta: number;
  ctvdIitem: number;
  prdcIcodProducto: number;
  ctvdNcantidad: number;
  ctvdNprecioUnitario: number;
  ctvdNmontoTotal: number;
  ctvdIusuarioCrea: number;
  ctvdVpcCrea: string;
  ctvdFlagEstado: boolean;
  ctvdVdescripcion: string;
  ctvdVcaracteristicas: string;
  ctvdVdescuento1: number;
  ctvdVdescuento2: number;
  ctvdVunitarioBase: number;
  ctvdCategoria: string;
  ctvdIdCategoria: number;
}
