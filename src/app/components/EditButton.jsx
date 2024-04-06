// components/DensityModal.js
import React, { useState } from 'react';
import clsx from 'clsx';

const EditButton = ({ isEditing, setIsEditing }) => {
  return (
    <button className={clsx('bg-white text-white p-4 rounded-sm w-full', {
        '!bg-red-400': isEditing, 
        '!bg-green-500': !isEditing
    })} type='button' onClick={()=>setIsEditing(!isEditing)}>{isEditing ? "Editando" : "Editar"}</button>
  );
};

export default EditButton;
