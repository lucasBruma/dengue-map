// components/DensityModal.js
'use client'
import React, { useState } from 'react';
import clsx from 'clsx';

const CustomLocationModalOpen = ({ onClose, onSubmit, setLocationOption }) => {
    const [option, setOption] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    onClose(); // aca mandaríamos la info a la db (latitud, longitud y densidad de mosquitos)
    setLocationOption(option)
  };

  return (
    <div className="absolute z-[1000] bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg text-black">
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg mb-4">¿Como querés marcar en el mapa?</h2>
          <div className="flex gap-3 flex-col items-start w-full">
            <button type='button' onClick={()=>setOption("ubicacion_real")} className={clsx(
                "hover:outline hover:outline-2 hover:outline-black p-3 rounded-md w-full text-start"
            )}>Ubicación real</button>
            <button type='button' onClick={()=>setOption("otra_ubicacion")} className={clsx(
                "hover:outline hover:outline-2 hover:outline-black p-3 rounded-md w-full text-start"
            )}>Otra ubicación</button>
          </div>
          <br />
          <button type="submit" className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">
            Enviar
          </button>
          {/* <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cerrar
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default CustomLocationModalOpen;
