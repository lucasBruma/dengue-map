// components/DensityModal.js
import React, { useState } from 'react';
import clsx from 'clsx';

const DensityModal = ({ setDensity, density }) => {

  return (
    <div className="absolute w-full bottom-0 z-[1000] flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg text-black w-full">
        <div>
        <h2 className="text-lg mb-4">¿Que nivel de mosquitos encontras?</h2>
          <div className="flex gap-3 flex-row items-start w-full">
            <button type='button' onClick={()=>setDensity(2)} className={clsx(
                density == "red" && "outline outline-black outline-2",
                "hover:outline hover:outline-2 hover:outline-black p-3 rounded-md w-full text-start bg-red-400 text-white"
            )}>🔴 Rojo! Mucho peligrooooo</button>
            <button type='button' onClick={()=>setDensity(1)} className={clsx(
                density == "orange" && "outline outline-black outline-2",
                "hover:outline hover:outline-2 hover:outline-black p-3 rounded-md w-full text-start bg-orange-400 text-white"
            )}>🟠 Naranja! Ojooo</button>
            <button type='button' onClick={()=>setDensity(0)} className={clsx(
                density == "yellow" && "outline outline-black outline-2",
                "hover:outline hover:outline-2 hover:outline-black p-3 rounded-md w-full text-start bg-yellow-500 text-white"
            )}>🟡 Amarillo! Cuidado</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DensityModal;
