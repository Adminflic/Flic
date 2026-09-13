import axios from "axios";
import type { DashboardEstructura } from "../types/dashboardType";

const API_URL = import.meta.env.VITE_API_BASE_URL_DASHBOARD;

export interface DashboardRequest {
  idComercio: number;
  fechaConsulta?: string | null;
  fechaFin?: string | null;
  anio?: string | null;
}

export const dashboardMetricas = async (data: DashboardRequest) => {
  const res = await axios.get<DashboardEstructura>(`${API_URL}`, {
    params: {  
      idComercio: data.idComercio,
      fechaConsulta: data.fechaConsulta,
      fechaFin: data.fechaFin,
      anio: data.anio
    },
  });
  return res.data;
};