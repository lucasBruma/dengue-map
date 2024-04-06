'use client'
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import LeafletMap from './components/LeafletMap';
import DensityModal from './components/DensityModal';
import clsx from "clsx";

export default function Home() {
  const [userLocation, setUserLocation] = useState({ lat: 34, lng: 58});
  const [density, setDensity] = useState('');
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition, showError);
      setModalOpen(true); // Open the modal once the location is obtained

    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const setPosition = (position) => {
    setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
    console.log("Latitude: " + position.coords.latitude + 
    " Longitude: " + position.coords.longitude);
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
    setModalOpen(false); // Close the modal after submission
  };

  return (
    <main className={clsx('relative flex min-h-screen flex-col items-center justify-center p-24')}>
      <div className={clsx('flex-col items-center justify-center p-24 w-full', 
        modalOpen && 'bg-black opacity-70' 
      )}>
        <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
          <LeafletMap lat={userLocation.lat} lng={userLocation.lng} density={density} />
        </div>
      </div>
    {modalOpen && (
        <DensityModal 
          onClose={() => setModalOpen(false)} 
          onSubmit={handleDensitySubmit} 
        />
      )}
    </main>
  );
}
