// import React from 'react'
import './login.css'
import { ChevronRight, Mail, Lock, Check, CheckCircle2 } from 'lucide-react'
import LogotipoFlic from '../../assets/icons/LogotipoFlic.svg';
import { useEffect, useRef, useState } from 'react';
import { toast, Toaster } from 'sonner';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { InputPro } from '../../components/ui/InputPro';

import { login, validateCorreo, generateCode, validateCode, resetPassword } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export const Login = () => {

  const navigate = useNavigate(); // 👈 Hook para redirigir
  const [checked, setChecked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [modalStep, setModalStep] = useState(1); // 1, 2 o 3
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState('');
  const [codeErrorLogin, setCodeErrorLogin] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos en segundos

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [validationMessage, setValidationMessage] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Simula backend:

  const checkEmailInSystem = async (emailToCheck: string): Promise<boolean> => {
    // En producción, esto haría una llamada al API para verificar
    // return registeredEmails.some(
    //   (registeredEmail) => registeredEmail.toLowerCase() === emailToCheck.toLowerCase()
    // );

    try {
      const response = await validateCorreo(emailToCheck);
      console.log("|-----|", response);
      if (response?.exists === true) {
        console.log(`✅ El correo ${emailToCheck} existe en el sistema.`);
        return true;
      } else {
        console.log(`⚠️ El correo ${emailToCheck} no está registrado.`);
        return false;
      }
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || error.message || "Error desconocido";
      console.error(`❌ Error al validar el correo "${emailToCheck}":`, errorMsg);
      return false;
    }
  };

  const checkRecuerdame = (/*e: React.FormEvent*/) => {
    setChecked(!checked);

    // e.preventDefault();
    if (!checked) {
      // Guarda credenciales
      if (values.email.length === 0 && values.password.length === 0) return;
      localStorage.setItem("email", values.email);
      localStorage.setItem("password", values.password);
    } else {
      // console.log("2",checked)
      // Limpia si NO desea recordar
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }

    // Aquí haces tu lógica de login (API, etc.)
    // console.log("Logging in...");
  }

  const handleSendEmail = async () => {
    // Aquí llamas tu API
    // const res = await fetch("/api/send-code", { method: "POST", body: JSON.stringify({ email }) })
    // if(res.ok) setModalStep(2)

    setValidationMessage(null);
    setIsSending(true);
    try {
      // Esperar la verificación real del correo
      const emailExists = await checkEmailInSystem(values.emailCambioClave);

      if (emailExists) {

        setValidationMessage({
          type: 'success',
          message: 'Correo verificado. Enviando código de verificación...',
        });


        const response = await generateCode({ email: values.emailCambioClave });
        console.log("object:", { response });
        // Esperar un pequeño retraso antes de continuar
        setTimeout(() => {
          setIsSending(false);
          setModalStep(2);
          setTimeLeft(300) //300
          toast.success('Código enviado al correo electrónico');

        }, 1500);
      } else {
        setValidationMessage({
          type: 'error',
          message:
            'Este correo no está registrado en nuestro sistema. Por favor, verifica que sea correcto.',
        });
        setIsSending(false);
      }
    } catch (err) {
      console.error("Error al verificar el correo:", err);
      setValidationMessage({
        type: 'error',
        message: 'Ocurrió un error al verificar el correo. Intenta nuevamente.',
      });
      setIsSending(false);
    }

  };

  const handleVerifyCode = async () => {
    // const res = await fetch("/api/verify-code", {method:"POST", body: JSON.stringify({ email, code })})
    // if(res.ok) setModalStep(3)

    if (timeLeft === 0) {
      setHasError(true);
      setCodeError('El código de verificación ha expirado. Por favor, solicita un nuevo código.');
      setCode("");
      inputRefs.current[0]?.focus();
      return;
    }

    setIsValidating(true);
    setCodeError('');
    setHasError(false);

    try {
      const response = await validateCode({ email: values.emailCambioClave, code });
      console.log({ response });

      setTimeout(() => {
        // Código correcto
        setIsValidating(false);
        toast.success('Código verificado correctamente');
        setModalStep(3);

      }, 1500);

    } catch (error) {
      // Código incorrecto
      setIsValidating(false);
      setHasError(true);
      setCodeError('El código ingresado es incorrecto. Por favor, verifica e intenta nuevamente.');
      // Limpiar el código para que el usuario pueda intentar de nuevo
      setCode("");
      inputRefs.current[0]?.focus();
    }


    // if (code.length === 6) setModalStep(3);

    // setCodeError('El código de verificación ha expirado. Por favor, solicita un nuevo código.');
  };

  const handleChangePassword = async () => {
    // const res = await fetch("/api/change-pass", ...)
    // if(res.ok) { setOpenModal(false); setModalStep(1); }

    if (allValid) {
      setIsChanging(true);
      // Simular cambio de contraseña

      const response = await resetPassword({ email: values.emailCambioClave, code, newPassword: values.passwordNewConfirm });
      console.log(`Cambio de clave: ${response}`)
      setTimeout(() => {
        setIsChanging(false);
        setOpenModal(false);
        setModalStep(1);
        toast.success('Contraseña actualizada correctamente');
      }, 1500);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResend = async () => {
    setTimeLeft(300);
    const response = await generateCode({ email: values.emailCambioClave });
    console.log("object:", { response });
  };

  // ----------------------------
  // 1. Manejo de valores
  // ----------------------------
  const [values, setValues] = useState({
    email: "",
    emailCambioClave: "",
    password: "",
    passwordNew: "",
    passwordNewConfirm: "",
    phone: "",
    date: "",
  });

  // ----------------------------
  // 2. Manejo de touched
  // ----------------------------
  const [touchedP, setTouchedP] = useState({
    email: false,
    emailCambioClave: false,
    password: false,
    passwordNew: false,
    passwordNewConfirm: false,
    phone: false,
    date: false,
  });

  // ----------------------------
  // 3. Manejo de errores
  // ----------------------------
  const errors = {
    email: values.email.length === 0
      ? ""
      : values.email.length < 2
        ? "El correo electrónico es requerido"
        : !emailRegex.test(values.email)
          ? "El correo ingresado no es válido"
          : "",
    password: values.password.length < 8 ? "Mínimo 8 caracteres" : "",
    emailCambioClave:
      values.emailCambioClave.length === 0
        ? ""
        : values.emailCambioClave.length < 2
          ? "El correo electrónico es requerido"
          : !emailRegex.test(values.emailCambioClave)
            ? "El correo ingresado no es válido"
            : ""
    // phone: values.phone.length < 10 ? "Teléfono incompleto" : "",
    // date: values.date === "" ? "Selecciona una fecha" : "",
  };

  // Validaciones
  const hasMinLength = values.passwordNew.length >= 8;
  const hasNumber = /\d/.test(values.passwordNew);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(values.passwordNew);
  const passwordsMatch = values.passwordNew === values.passwordNewConfirm && values.passwordNew !== '';
  const allValid = hasMinLength && hasNumber && hasSymbol && passwordsMatch;
  // ----------------------------
  // 4. Handler genérico
  // ----------------------------
  const handleChange = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setCodeErrorLogin("");
  };

  const handleBlur = (field: string) => {
    setTouchedP((prev) => ({ ...prev, [field]: true }));
  };

  const getDataForm = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(values)
    const email = values.email;
    const password = values.password;

    try {
      const datalogin = await login({ email, password });

      localStorage.setItem('Comercio',datalogin.comercio);
      // Simulamos un pequeño delay (opcional)
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error: any) {
      // toast.error('Correo o contraseña incorrectos. Por favor, intenta de nuevo.');
      // setLoginError(true);
      setCodeErrorLogin("Correo o contraseña incorrectos. Por favor, intenta de nuevo.")
    }
  }

  useEffect(() => {

    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    const initialValues = {
      email: savedEmail!,
      emailCambioClave: "",
      password: savedPassword!,
      passwordNew: "",
      passwordNewConfirm: "",
      phone: "",
      date: "",
    };

    if (savedEmail && savedPassword) {
      setValues(initialValues);
      setChecked(true);
    }


    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const maskedEmail = values.emailCambioClave.replace(/(.{3}).*(@.*)/, '$1***$2');
  const validEmail = !emailRegex.test(values.emailCambioClave);

  const clearData = () => {

    // Define los valores iniciales por separado
    const initialValues = {
      email: "",
      emailCambioClave: "",
      password: "",
      passwordNew: "",
      passwordNewConfirm: "",
      phone: "",
      date: "",
    };

    const initialTouched = {
      email: false,
      emailCambioClave: false,
      password: false,
      passwordNew: false,
      passwordNewConfirm: false,
      phone: false,
      date: false,
    };

    setValues(initialValues);
    setTouchedP(initialTouched);
    setValidationMessage(null);
    setTimeLeft(300);
    setModalStep(1);
    setChecked(false);
    setOpenModal(false);
    setHasError(false);
    setCode("");
    setCodeError("");
    setCodeErrorLogin("");
    setIsSending(false);
    setIsValidating(false);
    setIsChanging(false);
  }

  return (
    <>
      {/* overflow-hidden */}
      <div className='flex flex-row h-screen box-border  overflow-hidden'>

        <div className='flex flex-col items-start justify-center p-[6rem] degradado-flic relative'>
          {/* Texto de inicio */}
          <div className='texto-inicio'>
            <p className='TitleXL text-(--White)'>Flic</p>
            <p className='H2'>La evolución de la tesoreria</p>
            <button className='Button-IconoDerecha'>
              Ver más
              <ChevronRight className='w-4 h-4' />
            </button>
          </div>
          {/* Fin del texto de inicio */}

          <div className='figura-inicio-1'></div>
          <div className='figura-inicio-2'></div>
        </div>


        <div className='contenedor-loginForm'>
          <div className='contenedor-seguncarioForm'>
            {/* Mensaje de error login*/}
            {codeErrorLogin && (
              <Alert
                variant="destructive"
                className="mb-6 bg-red-50 border-red-200 animate-in slide-in-from-top-2"
              >
                <AlertCircle className="h-4 w-4 colorDestroy" />
                <AlertDescription className="colorDestroy">
                  {codeErrorLogin}
                </AlertDescription>
              </Alert>
            )}


            <img src={LogotipoFlic} alt="Logo Flic" className='logo-mediano mb-[1.5px]' />
            <p className='TitleXL text-(--Font)'>Bienvenido</p>

            {/* Inicio */}
            <div className="space-y-4 w-full max-w-sm">

              {/* 📧 Input Correo
              
              <div
                className="
                  flex items-center bg-gray-100 rounded-2xl px-4 py-3 
                  border border-gray-200 
                  focus-within:border-purple-500 focus-within:shadow-[0_0_0_2px_#A066FF] 
                  transition-all duration-200
                 "
              >
                <Mail className="w-5 h-5 text-gray-500 mr-3" />

                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="bg-transparent outline-none text-gray-700 w-full"
                />
              </div> */}

              {/* 🔒 Input Correo */}

              {/* EMAIL */}
              <InputPro
                // label="Correo"
                value={values.email}
                placeholder="Correo electrónico"
                type="email"
                leftIcon={<Mail className="w-5 h-5" />}
                onChange={(v) => handleChange("email", v)}
                onBlur={() => handleBlur("email")}

                showError={touchedP.email}
                error={errors.email}
              />

              {/* PASSWORD */}
              <InputPro
                // label="Contraseña"
                value={values.password}
                placeholder="Contraseña"
                type="password"
                leftIcon={<Lock className="w-5 h-5" />}
                onChange={(v) => handleChange("password", v)}
                onBlur={() => handleBlur("password")}

                showError={touchedP.password}
                error={errors.password}
              />
              {/* <div
                className="
                    flex items-center bg-gray-100 rounded-2xl px-4 py-3 
                    border border-gray-200 
                    focus-within:border-purple-500 focus-within:shadow-[0_0_0_2px_#A066FF] 
                    transition-all duration-200
                  "
              >
                <Lock className="w-5 h-5 text-gray-500 mr-3" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  className="bg-transparent outline-none text-gray-700 w-full"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div> */}

              {/* || */}
              {/* <div className="w-full">
                <div className="relative">
                  <Mail
                    className={`w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2
                                ${showError ? "text-red-500" : "text-gray-500"}`}
                  />

                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched(true)}
                    className={`
                      w-full bg-gray-100 pl-12 pr-4 py-3 rounded-2xl border outline-none 
                      transition-all

                      ${showError
                                  ? "border-red-500 shadow-[0_0_0_2px_#FFBABA]"
                                  : "border-gray-300 focus:border-purple-500 focus:shadow-[0_0_0_2px_#A066FF]"
                                }
                    `}
                  />
                </div>

                {showError && (
                  <p className="text-red-500 text-sm mt-1">
                    El correo electrónico es requerido
                  </p>
                )}
              </div> */}




              {/* || */}

            </div>

            {/* Button Ingresar */}
            <button
              className="
              w-full  text-white  colorPrimario
              py-3 rounded-2xl
              text-center font-medium
              hover:bg-purple-800 
              transition-all duration-200
              cursor-pointer
            "
              onClick={getDataForm}
            >
              Ingresar
            </button>



            {/* Bloque principal */}
            <div className="flex items-center justify-between w-full">
              {/* Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div
                  className={`
                    w-5 h-5 rounded-md flex items-center justify-center border
                    transition-all duration-200
                    ${checked ? "bg-purple-600 border-purple-600" : "bg-white border-gray-300"}
                  `}
                  onClick={() => { checkRecuerdame(); }}
                >
                  {checked && <Check className="w-4 h-4 text-white" />}
                </div>
                <span className="text-gray-700 text-sm">Recuérdame</span>
              </label>

              {/* Botón que abre el modal */}
              <button
                onClick={() => setOpenModal(true)}
                className="colorTerciario text-sm font-medium hover:underline"
              >
                ¿Olvidaste la contraseña?
              </button>
            </div>

            {openModal && (
              // backdrop-blur-sm bg-black/30
              <div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 "
              // onClick={() => { setOpenModal(false); }}
              >
                {/** setModalStep(1); Esto va arriba si quiero reiniciar el modal al 1 dentro de onClick*/}
                <div
                  // w-96 p-6  Flic: 'w-lg p-8'
                  className={`bg-white rounded-lg shadow-xl 
                    ${modalStep === 1 ? 'w-lg p-10'
                      : modalStep === 2 ? 'w-lg p-8'
                        : modalStep === 3 ? 'w-lg p-8'
                          : ''}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Encabezado */}
                  {/* justify-between */}
                  <div className="flex justify-center items-center mb-4">
                    <h2 className="text-lg H3">
                      {modalStep === 1 && "Restablecer contraseña"}
                      {modalStep === 2 && "Verifica tu correo electrónico"}
                      {modalStep === 3 && "Crear una nueva contraseña"}
                    </h2>

                    {/* <button
                      onClick={() => {
                        setOpenModal(false);
                        setModalStep(1);
                      }}
                    >
                      <X className="w-5 h-5 text-gray-600 cursor-pointer" />
                    </button> */}
                  </div>

                  {/* =================== STEP 1 =================== */}
                  {modalStep === 1 && (
                    <>
                      <div className=''>
                        <p className="text-sm text-gray-600 mb-4 Parrafo">
                          Ingresa el correo electrónico asociado a tu cuenta y te enviaremos un código de verificación.
                        </p>

                        {/* Mensaje de validación */}
                        {validationMessage && (
                          <Alert
                            variant={validationMessage.type === 'error' ? 'destructive' : 'default'}
                            className={`mb-6 animate-in slide-in-from-top-2 ${validationMessage.type === 'success'
                              ? 'bg-green-50 border-green-200'
                              : 'bg-red-50 border-red-200'
                              }`}
                          >
                            {validationMessage.type === 'success' ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-red-600" />
                            )}
                            <AlertDescription
                              className={
                                validationMessage.type === 'success' ? 'text-green-800' : 'text-red-800'
                              }
                            >
                              {validationMessage.message}
                            </AlertDescription>
                          </Alert>
                        )}

                        {/* INPUT CON ICONO Mail */}

                        <InputPro
                          // label="Correo"
                          value={values.emailCambioClave}
                          placeholder="Correo electronico"
                          type="email"
                          leftIcon={<Mail className="w-5 h-5" />}
                          onChange={(v) => handleChange("emailCambioClave", v)}
                          onBlur={() => handleBlur("emailCambioClave")}

                          showError={touchedP.emailCambioClave}
                          error={errors.emailCambioClave}
                        />
                        {/* <div className="relative w-full">
                          <Mail className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />

                          <input
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`
                          w-full bg-gray-100 pl-12 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-purple-500 focus:shadow-[0_0_0_2px_#A066FF] transition-all
                          ${isValidEmail
                                ? "focus:border-purple-500 focus:shadow-[0_0_0_2px_#A066FF] transition-all"
                                : "border-gray-300"
                              }
                            ${hasError
                                ? 'border-red-300 focus-visible:border-red-400 focus-visible:ring-red-400/50'
                                : 'border-[#9ea1a8] focus-visible:border-ring focus-visible:ring-ring/50'
                              }
                          
                         `}
                          />
                        </div> */}

                        {/* BOTÓN */}
                        <div className='flex flex-col gap-4'>
                          <button
                            disabled={validEmail}
                            onClick={handleSendEmail}
                            className={`w-full mt-4 py-2.5 rounded-2xl text-white
                              ${!validEmail ? "bg-purple-700 hover:bg-purple-800 cursor-pointer" : "  bg-gray-300 cursor-not-allowed"
                              }
                            `}
                          >
                            {isSending ? (
                              <span className="flex items-center justify-center gap-2">
                                <svg
                                  className="animate-spin h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Enviar código
                              </span>
                            ) : (
                              'Enviar código'
                            )}
                          </button>

                          <button className='Button-Medium ali' onClick={() => { setOpenModal(false); clearData(); }}>
                            Cancelar
                          </button>
                        </div>
                      </div>


                    </>
                  )}


                  {/* =================== STEP 2 =================== */}
                  {modalStep === 2 && (
                    <>

                      {/* <h2 className="text-center text-[#313a4e] mb-4">Verifica tu correo electrónico</h2> */}

                      <p className="Parrafo ml-12 mr-12">
                        Hemos enviado un código de seis dígitos a tu correo electrónico{' '}
                        <span className="font-semibold">{maskedEmail}</span>.
                      </p>

                      {/* Mensaje de error */}
                      {codeError && (

                        <div className=' mt-5 ml-12 mr-12'>
                          <Alert
                            variant="destructive"
                            className="mb-6 bg-red-50 border-red-200 animate-in slide-in-from-top-2 "
                          >
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-800">
                              {codeError}
                            </AlertDescription>
                          </Alert>
                        </div>

                      )}



                      <p className="H3 mt-3.5 mb-2 text-start! mr-13 ml-13">
                        Ingresa el código
                      </p>

                      {/* OTP INPUT */}
                      <div className="flex gap-3 justify-center mb-4">


                        {Array.from({ length: 6 }).map((_, i) => (
                          <input
                            key={i}
                            ref={(el: HTMLInputElement | null) => {
                              inputRefs.current[i] = el;
                            }}
                            type="text"
                            maxLength={1}
                            value={code[i] || ""}
                            onChange={(e) => {
                              const val = e.target.value.replace(/[^0-9]/g, "");

                              if (!val) return;
                              setCodeError("")

                              // actualizar dígito
                              const updated =
                                code.substring(0, i) + val + code.substring(i + 1);
                              setCode(updated);

                              // ir al siguiente input
                              if (i < 5) {
                                const next = document.getElementById(`otp-${i + 1}`);
                                next?.focus();
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Backspace") {
                                const updated =
                                  code.substring(0, i) + "" + code.substring(i + 1);
                                setCode(updated);

                                if (i > 0 && !code[i]) {
                                  const prev = document.getElementById(`otp-${i - 1}`);
                                  prev?.focus();
                                }
                              }
                            }}
                            onPaste={(e) => {
                              const data = e.clipboardData.getData("text").slice(0, 6);
                              if (/^\d+$/.test(data)) {
                                setCode(data);
                                setTimeout(() => {
                                  const last = document.getElementById(`otp-5`);
                                  last?.focus();
                                }, 10);
                              }
                            }}
                            id={`otp-${i}`}
                            className={`
                              w-12 h-12 text-center text-xl font-semibold rounded-lg
                              border border-gray-300 bg-gray-100 outline-none
                              focus:border-purple-500 focus:shadow-[0_0_0_2px_#A066FF]
                              transition-all`
                            }
                          />
                        ))}
                      </div>

                      {/* Timer */}
                      <div className="text-center text-sm text-[#313a4e] mb-6">
                        {timeLeft > 0 ? (
                          <>
                            Vence en {formatTime(timeLeft)}
                          </>
                        ) : (
                          <span className="text-red-600 font-semibold">El código ha expirado</span>
                        )}
                        {' '}
                        <button
                          onClick={handleResend}
                          className={`ml-2 ${timeLeft > 0
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-[#8B5CF6] hover:text-[#7C3AED]'
                            }`}
                          disabled={timeLeft > 0}
                        >
                          Reenviar código
                        </button>
                      </div>


                      {/* BOTÓN */}
                      <div className='flex flex-col gap-4'>
                        <button
                          disabled={code.length !== 6}
                          onClick={handleVerifyCode}
                          className={`w-full mt-2 py-2.5 rounded-2xl text-white 
                        ${code.length === 6 ? "bg-purple-700 hover:bg-purple-800" : "bg-gray-300 cursor-not-allowed"}`}
                        >
                          {isValidating ? (
                            <span className="flex items-center justify-center gap-2">
                              <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Validar
                            </span>
                          ) : (
                            'Validar'
                          )}
                        </button>

                        <button className='Button-Medium ali' onClick={() => { setOpenModal(false); clearData() }}>
                          Cancelar
                        </button>
                      </div>

                    </>
                  )}


                  {/* =================== STEP 3 =================== */}
                  {modalStep === 3 && (
                    <>
                      {/* <p className="text-sm text-gray-600 mb-4">
                        Escribe tu nueva contraseña.
                      </p> */}

                      <div className='flex flex-col gap-2'>
                        <InputPro
                          label="Contraseña"
                          value={values.passwordNew}
                          placeholder="Ingresa contraseña"
                          type="password"
                          // leftIcon={<Lock className="w-5 h-5" />}
                          onChange={(v) => handleChange("passwordNew", v)}
                          onBlur={() => handleBlur("passwordNew")}

                          showError={touchedP.passwordNew}
                        // error={errors.passwordNew}
                        />

                        <InputPro
                          label="Confirma tu Contraseña"
                          value={values.passwordNewConfirm}
                          placeholder="Ingresa contraseña"
                          type="password"
                          // leftIcon={<Lock className="w-5 h-5" />}
                          onChange={(v) => handleChange("passwordNewConfirm", v)}
                          onBlur={() => handleBlur("passwordNewConfirm")}

                          showError={touchedP.passwordNewConfirm}
                        // error={errors.password}
                        />
                      </div>

                      {/* Barra de progreso */}
                      <p className='H4 mt-4'>Progreso de carga</p>
                      <div className="w-full h-2 barra-progreso  rounded-full overflow-hidden mt-2.5">
                        <div
                          className="h-full bg-[#5B21B6] transition-all duration-300"
                          style={{
                            width: `${((hasMinLength ? 1 : 0) +
                              (hasNumber ? 1 : 0) +
                              (hasSymbol ? 1 : 0) +
                              (passwordsMatch ? 1 : 0)) *
                              25
                              }%`,
                          }}
                        />
                      </div>

                      {/* Lista de requisitos */}
                      <p className='H4 mt-4'>La contraseña debe tener:</p>

                      <div className="space-y-2">
                        <ValidationItem text="8 caracteres mínimo" isValid={hasMinLength} />
                        <ValidationItem text="Incluye un número" isValid={hasNumber} />
                        <ValidationItem text="Incluye un símbolo" isValid={hasSymbol} />
                        <ValidationItem text="Contraseñas coinciden" isValid={passwordsMatch} />
                      </div>

                      <div className='flex flex-col gap-4'>
                        <button
                          disabled={!allValid}
                          onClick={handleChangePassword}
                          className={`w-full mt-4 py-2.5 rounded-full text-white 
                                    ${allValid ? "bg-purple-700 hover:bg-purple-800" : "bg-gray-300 cursor-not-allowed"}`}
                        >
                          Cambiar contraseña
                        </button>

                        <button className='Button-Medium ali' onClick={() => { setOpenModal(false); clearData() }}>
                          Cancelar
                        </button>
                      </div>

                    </>
                  )}
                </div>
              </div>
            )}


          </div>
        </div>
      </div>

      {/* Toaster Noticador  */}
      <Toaster />
    </>
  )
}


interface ValidationItemProps {
  text: string;
  isValid: boolean;
}

function ValidationItem({ text, isValid }: ValidationItemProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isValid ? 'border-[#5B21B6] bg-[#5B21B6]' : 'border-gray-300'
          }`}
      >
        {isValid && <Check className="w-3 h-3 text-white" />}
      </div>
      <span className={`text-sm ${isValid ? 'text-[#313a4e]' : 'text-gray-400'}`}>{text}</span>
    </div>
  );
}
