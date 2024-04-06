'use client'
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import LeafletMap from './components/LeafletMap';

export default function Home() {
  const [userLocation, setUserLocation] = useState({ lat: -34.6416826, lng: -58.4067763 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const showPosition = (position) => {
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <LeafletMap lat={userLocation.lat} lng={userLocation.lng} />
      </div>
    </main>
  );
}
