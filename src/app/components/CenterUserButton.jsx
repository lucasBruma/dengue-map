// components/DensityModal.js
import React, { useEffect } from 'react';
import clsx from 'clsx';

const CenterUserButton = ({ setCenterOptionSelected, centerOptionSelected }) => {
  useEffect(()=>{
    let timeoutId;

    if (centerOptionSelected) {
      timeoutId = setTimeout(() => {
        setCenterOptionSelected(false);
      }, 5000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  },[centerOptionSelected, setCenterOptionSelected])
  return (
    <button className={clsx('bg-green-600 p-4 rounded-sm w-full')} type='button' onClick={() => setCenterOptionSelected(true)}>{centerOptionSelected ? "Locación centrada" : "Centrar locación"}</button>
  );
};

export default CenterUserButton;

