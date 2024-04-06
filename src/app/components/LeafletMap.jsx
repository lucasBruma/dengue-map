'use client'
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = ({ lat, lng, density }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current === null) return;

    // Initialize the map
    const map = L.map(mapRef.current).setView([lat, lng], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);


    L.circle([lat, lng], {
        color: density,      // Color of the circle outline
        fillColor: density, // Fill color of the circle
        fillOpacity: 0.5,  // Opacity of the circle fill
        radius: 40        // Radius of the circle in meters
      }).addTo(map);

    return () => {
      map.remove();
    };
  }, [lat, lng, density]); // Recreate the map when coordinates change
  


  return (
   <div ref={mapRef} style={{ height: '100vh', width: '100%' }} />
  )
};

export default LeafletMap;
