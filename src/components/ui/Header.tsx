import { useState, useRef, useEffect } from "react";
import { Bell, User, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeaderFlic() {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();  // ← aquí

  // Cerrar el menú cuando haga clic afuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setOpenUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    // border-b
    <header className="h-16 bg-white  flex items-center justify-between px-4 relative">
      {/* Título o Breadcrumb */}
      <h1 className="text-xl font-semibold text-gray-700"></h1>

      {/* Controles derechos */}
      <div className="flex items-center gap-4">

        {/* Notificaciones */}
        <button
          aria-label="Notificaciones"
          className="relative p-2 rounded-full hover:bg-gray-100 transition"
        >
          <Bell size={22} />

          {/* Punto rojo de notificación */}
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-600 rounded-full" />
        </button>

        {/* Usuario */}
        <div ref={userRef} className="relative">
          <button
            onClick={() => setOpenUserMenu(!openUserMenu)}
            className="flex items-center gap-2 p-2 rounded-2xl hover:bg-gray-100 transition"
          >
            <img
              src="https://ui-avatars.com/api/?name=Steven+A&background=6d28d9&color=fff"
              alt="Avatar"
              className="w-9 h-9 rounded-full border"
            />

            <div className=" flex flex-row justify-center items-center text-start gap-2" >
              <div className="te">
                <b>Usuario</b>
                <p>Rol</p>
              </div>
              <ChevronDown />
            </div>

          </button>

          {/* Menú flotante */}
          {openUserMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg border rounded-xl py-2 animate-in fade-in zoom-in-95">

              <button
                onClick={() => console.log("Perfil")}
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-left"
              >
                <User size={18} />
                <span>Mi perfil</span>
              </button>

              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-left text-red-600"
              >
                <LogOut size={18} />
                <span>Cerrar sesión</span>
              </button>

            </div>
          )}
        </div>
      </div>
    </header>
  );
}
