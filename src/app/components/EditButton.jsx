// components/DensityModal.js
import React, { useState } from 'react';
import clsx from 'clsx';

const EditButton = ({ isEditing, setIsEditing }) => {
  return (
    <button className={clsx('bg-white text-black outline outline-2 outline-black p-4 rounded-sm absolute top-8 right-8 z-[1000]', {
        '!bg-red-400': isEditing, 
        '!bg-green-500': !isEditing
    })} type='button' onClick={()=>setIsEditing(!isEditing)}>{isEditing ? "Editando" : "Editar"}</button>
  );
};

export default EditButton;
