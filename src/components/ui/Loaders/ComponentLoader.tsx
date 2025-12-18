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


