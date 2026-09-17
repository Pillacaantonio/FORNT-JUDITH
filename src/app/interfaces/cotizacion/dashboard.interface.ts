export interface DashboardPostulantesResumen {
  kpiTotal: KpiTotalPostulantes;
  serieMensual: SeriePostulantesMes[];
  listadoMensual: ListadoPostulantesMes[];
}

export interface KpiTotalPostulantes {
  anio: number;
  totalPostulantes: number;
}

export interface SeriePostulantesMes {
  mesInicio: string;
  mesKey: string;
  cantidad: number;
}

export interface ListadoPostulantesMes {
  mesInicio: string;
  mesNombre: string;
  mesLabel: string;
  cantidad: number;
  cantidadMesAnterior: number | null;
  variacionPct: number | null;
}