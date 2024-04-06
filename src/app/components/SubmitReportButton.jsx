// components/DensityModal.js
import React, { useState } from 'react';
import clsx from 'clsx';

const SubmitReportButton = ({ isEditing, setIsEditing, setCircleAdded }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        setCircleAdded(false);
        // enviar data de los puntos y del circulo a la api
    };

    if (!isEditing) return null;

  return (
    <form onSubmit={handleSubmit}>
        <button className={clsx('bg-red-500 text-white p-4 rounded-sm w-full')} type='submit'>Confirmar ubicacion</button>
    </form>
  );
};

export default SubmitReportButton;
