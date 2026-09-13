import axios from "axios";

// const API_URL = "https://localhost:7080/api/auth"; // 🔧 Ajusta el puerto según tu API
// const API_URL = "https://dev.flicservicios.com:9056/api/Authentication"; // 🔧 Ajusta el puerto según tu API
const API_URL = "https://flicservicios.com:9556/api/Authentication"; // 🔧 Ajusta el puerto según tu API

// 🧩 Tipos
export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface GenerateCodeRequest {
  email: string;
}

export interface ValidateCodeRequest {
  email: string;
  code: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  newPassword: string;
}

// 🧠 Métodos del servicio

// 1️⃣ Registro
export const register = async (data: RegisterRequest) => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

// 2️⃣ Login
export const login = async (data: LoginRequest) => {
  const res = await axios.post(`${API_URL}/login`, data);

  if(res.data.comercio){
    localStorage.setItem("email",data.email);
  }
  
  return res.data;
};

// 3️⃣ Validar correo
export const validateCorreo = async (email: string) => {
  const res = await axios.get(`${API_URL}/validate-email`, {
    params: { email },
  });
  return res.data;
};

// 4️⃣ Generar código para recuperar contraseña
export const generateCode = async (data: GenerateCodeRequest) => {
  const res = await axios.post(`${API_URL}/generate-code`, data);
  return res.data;
};

// 5️⃣ Validar código recibido
export const validateCode = async (data: ValidateCodeRequest) => {
  const res = await axios.post(`${API_URL}/validate-code`, data);
  return res.data;
};

// 6️⃣ Restablecer contraseña
export const resetPassword = async (data: ResetPasswordRequest) => {
  const res = await axios.post(`${API_URL}/reset-password`, data);
  return res.data;
};
