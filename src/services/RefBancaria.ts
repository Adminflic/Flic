import axios from "axios";

const API_URL = "https://flicservicios.com:9696/Api/SiesaAjeVehiculo"; // 🔧 Ajusta el puerto según tu API

// 1️⃣ Notificador
export const refBancaria = async (codigoComercio?: number) => {
  // const res = await axios.post(`${API_URL}?codigoComercio=${codigoComercio}`);
  const res = await axios.post(`${API_URL}?codigoComercio=201`);

  return res.data;
};

