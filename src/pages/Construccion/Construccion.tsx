import React from 'react'

export const Construccion = () => {
  return (
    <div className='min-h-full bg-amber-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='text-center mb-12'>
          <div className='inline-block p-8 bg-amber-100 rounded-2xl mb-6'>
            <h2 className='text-4xl font-bold text-amber-800'>🚧 Próximamente</h2>
          </div>
          <p className='text-xl text-gray-700'>
            Esta funcionalidad estará disponible pronto
          </p>
        </div>
        
        {/* Contenido de ejemplo largo */}
        <div className='space-y-6'>
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className='p-6 bg-white rounded-lg shadow'>
              <h3 className='font-semibold text-lg mb-2'>Sección {i + 1}</h3>
              <p className='text-gray-600'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


