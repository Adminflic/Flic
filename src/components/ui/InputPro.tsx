import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProProps {
  label?: string;
  value: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
  error?: string;
  showError?: boolean; // 👈 NUEVO
  onChange: (value: string) => void;
  onBlur?: () => void; // 👈 NUEVO

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  className?: string;
}

export const InputPro: React.FC<InputProProps> = ({
  label,
  value,
  placeholder,
  type = "text",
  error,
  showError = false, // 👈 solo muestra el error si el padre dice que sí
  onChange,
  onBlur,

  leftIcon,
  rightIcon,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const displayType = isPassword && showPassword ? "text" : type;

  const hasError = showError && error; // 👈 controla visibilidad del error

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="mb-1 block text-sm text-gray-700">{label}</label>
      )}

      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            {leftIcon}
          </div>
        )}

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        ) : (
          rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              {rightIcon}
            </div>
          )
        )}

        <input
          type={displayType}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={`
            w-full bg-gray-100 py-3 rounded-2xl border outline-none transition-all
            ${leftIcon ? "pl-12" : "pl-4"}
            ${rightIcon || isPassword ? "pr-12" : "pr-4"}

            ${
              hasError
                ? "border-red-500 shadow-[0_0_0_2px_#FFBABA]"
                : "border-gray-300 focus:border-purple-900 focus:shadow-[0_0_0_2px_#5B21B680]"
            }
          `}
        />
      </div>

      {hasError && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
