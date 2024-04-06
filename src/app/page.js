'use client'
import React, { useEffect, useState } from 'react';
// import LeafletMap from './components/LeafletMap';
import DensityModal from './components/DensityModal';
import clsx from "clsx";
import dynamic from 'next/dynamic';
import EditButton from "./components/EditButton";

const LeafletMap = dynamic(() => import('./components/LeafletMap.jsx'), {
  ssr: false,
});

export default function Home() {
  const [userLocation, setUserLocation] = useState({ lat: -34, lng: -58});
  const [density, setDensity] = useState('');
  const [densityModalOpen, setDensityModalOpen] = useState(true);  // deberiamos abrir este modal cuando se elija la opcion de editar
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition, showError);
    }
  }, []);

  const setPosition = (position) => {
    setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
  }

  const showError = (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
    }
  }

  const handleDensitySubmit = (selectedDensity) => {
    setDensity(selectedDensity);
    setDensityModalOpen(false); // Close the modal after submission
  };

  return (
    <main className={clsx('relative flex min-h-screen flex-col items-center justify-center')}>
      <div className={clsx('flex-col items-center justify-center w-full')}>
        <div className="z-10 w-full items-center justify-center font-mono text-sm lg:flex">
          <LeafletMap density={density} />
        </div>
        <EditButton isEditing={isEditing} setIsEditing={setIsEditing} />
      </div>
      {isEditing && (
        <DensityModal 
          onSubmit={handleDensitySubmit} 
        />
      )}
    </main>
  );
}
