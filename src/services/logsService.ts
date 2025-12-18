import axios from "axios";

const API_URL = "https://flicservicios.com:9576/api/Logs/LogErpTransaccional";

export interface LogsParam {
  banco: string;
  comercio: string;
  ref1: string;
  autorizacion: string;
}

export const extraerLog = async (params: LogsParam) => {
  const res = await axios.get(API_URL, {
    params: {
      codigoBanco: params.banco,
      comercio: params.comercio,
      ref1: params.ref1,
      autorizacion: params.autorizacion,
    },
  });

  return res.data;
};
