import React from "react";

const ComponentLoader = () => {
  return (
    <div className="flex items-center justify-center w-full py-10">
      <div className="flex gap-6 border border-dashed border-blue-400 rounded-xl px-8 py-6">
        {/* Card 1 */}
        <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center">
          <span className="w-4 h-4 bg-violet-600 rounded-full animate-pulse" />
        </div>

        {/* Card 2 */}
        <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center">
          <div className="grid grid-cols-2 gap-2">
            <span className="w-3 h-3 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.2s]" />
            <span className="w-3 h-3 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.1s]" />
            <span className="w-3 h-3 bg-violet-400 rounded-full animate-bounce" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center">
          <span className="w-4 h-4 bg-violet-600 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ComponentLoader;



export const TriangleDotLoader = () => {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Punto central */}
        <span className="absolute w-4 h-4 bg-violet-600 rounded-full animate-dot-pulse" />

        {/* Punto superior */}
        <span
          className="absolute w-3 h-3 bg-violet-400 rounded-full animate-triangle"
          style={{ "--x": "0px", "--y": "-18px" }}
        />

        {/* Punto inferior izquierdo */}
        <span
          className="absolute w-3 h-3 bg-violet-400 rounded-full animate-triangle"
          style={{ "--x": "-15px", "--y": "12px" }}
        />

        {/* Punto inferior derecho */}
        <span
          className="absolute w-3 h-3 bg-violet-400 rounded-full animate-triangle"
          style={{ "--x": "15px", "--y": "12px" }}
        />
      </div>
    </div>
  );
};

export const CirculeDotLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <svg
        className="animate-spin h-5 w-5 text-violet-300"
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
    </div>
  );
};


