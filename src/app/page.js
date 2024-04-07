'use client'
import React, { useEffect, useState } from 'react';
import DensityModal from './components/DensityModal';
import clsx from "clsx";
import EditButton from "./components/EditButton";
import SubmitReportButton from './components/SubmitReportButton';
import GoogleMap from './components/GoogleMap';
import { apiClient } from './services/api';
import CenterUserButton from './components/CenterUserButton';


export default function Home() {
  const [userLocation, setUserLocation] = useState(null);
  const [density, setDensity] = useState(2);
  const [isEditing, setIsEditing] = useState(false);
  const [marker, setMarker] = React.useState(null);
  const [centerOptionSelected, setCenterOptionSelected] = React.useState(false);

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    if (!marker) return;
    await apiClient.saveReport({ lat: marker.lat, long: marker.lng, intensityLevel: density})
  };

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

  return (
    <main className={clsx('relative flex min-h-screen flex-col items-center justify-center')}>
      <div className={clsx('flex-col items-center justify-center w-full')}>
        <div className="z-10 w-full items-center justify-center font-mono text-sm lg:flex">
          <GoogleMap isEditing={isEditing} density={density} marker={marker} setMarker={setMarker} centerOptionSelected={centerOptionSelected} userLocation={userLocation} />
        </div>
        <div className='absolute top-[10px] right-2 z-[1000] flex flex-col gap-4'>
          <EditButton isEditing={isEditing} setIsEditing={setIsEditing} />
          <SubmitReportButton isEditing={isEditing} setIsEditing={setIsEditing} handleSubmitReport={handleSubmitReport} />
          <CenterUserButton setCenterOptionSelected={setCenterOptionSelected} centerOptionSelected={centerOptionSelected} />
        </div>
      </div>
      {isEditing && (
          <DensityModal 
            setDensity={setDensity}
            density={density} 
          />
      )}
    </main>
  );
}
