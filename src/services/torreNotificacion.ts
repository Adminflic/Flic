import axios from "axios";

const API_URL = "https://flicservicios.com:9776/api/Notificacion/NotificacionManual"; // 🔧 Ajusta el puerto según tu API
// const API_URL_NUMERONOTIFICAR = "https://dev.flicservicios.com:9056/api/Transactional/numero-PendienteNotificar"
const API_URL_NUMERONOTIFICAR = "https://flicservicios.com:9556/api/Transactional/numero-PendienteNotificar"

// 1️⃣ Notificador
export const notificarRecaudo = async (codigoComercio: number, idTransaccion: number) => {
  const res = await axios.post(`${API_URL}?codigoComercio=${codigoComercio}&idTransaccion=${idTransaccion}`);
  return res.data;
};

export const numeroRecaudosNoNotificados = async (idComercio: number,
  fechaInicial?: string, fechaFinal?: string) => {
  const res = await axios.get(`${API_URL_NUMERONOTIFICAR}`, {
    params: {
      idComercio,
      fechaInicial,
      fechaFinal
    },
  });
  localStorage.setItem("totaNotificar", res.data.totalRegistrosFecha);
  return res.data;
};
