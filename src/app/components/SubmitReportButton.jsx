// components/DensityModal.js
import React, { useState } from 'react';
import clsx from 'clsx';

const SubmitReportButton = ({ isEditing, setIsEditing, handleSubmitReport }) => {
  if (!isEditing) return null;

  return (
    <form onSubmit={handleSubmitReport}>
        <button className={clsx('bg-red-500 text-white p-4 rounded-sm w-full')} type='submit'>Confirmar ubicacion</button>
    </form>
  );
};

export default SubmitReportButton;
