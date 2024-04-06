// components/DensityModal.js
import React, { useState } from 'react';
import clsx from 'clsx';

const DensityModal = ({ onClose, onSubmit }) => {
  const [density, setDensity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(density);
    onClose(); // aca mandaríamos la info a la db (latitud, longitud y densidad de mosquitos)
  };

  return (
    <div className="absolute z-[1000] bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg text-black">
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg mb-4">¿Que nivel de mosquitos encontras?</h2>
          <div className="flex gap-3 flex-col items-start w-full">
            <button type='button' onClick={()=>setDensity("red")} className={clsx(
                density == "red" && "outline outline-black outline-2",
                "hover:outline hover:outline-2 hover:outline-black p-3 rounded-md w-full text-start"
            )}>🔴 Rojo! Mucho peligrooooo</button>
            <button type='button' onClick={()=>setDensity("orange")} className={clsx(
                density == "orange" && "outline outline-black outline-2",
                "hover:outline hover:outline-2 hover:outline-black p-3 rounded-md w-full text-start"
            )}>🟠 Naranja! Ojooo</button>
            <button type='button' onClick={()=>setDensity("yellow")} className={clsx(
                density == "yellow" && "outline outline-black outline-2",
                "hover:outline hover:outline-2 hover:outline-black p-3 rounded-md w-full text-start"
            )}>🟡 Amarillo! Cuidado</button>
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

export default DensityModal;
