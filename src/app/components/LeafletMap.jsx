import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = ({ lat, lng, density, isEditing, circleAdded, setCircleAdded }) => {
  const mapRef = useRef(null);
  const lastCircleRef = useRef(null); // Ref to store the last added circle

  useEffect(() => {
    if (mapRef.current === null) return;

    //Initialize the map
    const map = L.map(mapRef.current).setView([-34.617387052407175, -58.47473144531251], 13);

    //Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Event handler for adding a circle on click
    const addCircleOnClick = (event) => {
      const { lat, lng } = event.latlng;

      if (!isEditing) return; 

      // Remove the last circle if it exists
      if (lastCircleRef.current) {
        map.removeLayer(lastCircleRef.current);
      }

      // Add a new circle at the clicked position
      const newCircle = L.circle([lat, lng], {
        color: 'gray',
        fillColor: 'gray',
        fillOpacity: 0.5,
        radius: 40
      }).addTo(map);

      // Store the new circle in the ref
      lastCircleRef.current = newCircle;
    };

    // Attach the click event listener to the map
    map.on('click', addCircleOnClick);


    return () => {
      // Remove the event listener when the component unmounts or dependencies change
      map.off('click', addCircleOnClick);
      // Clean up the map to prevent memory leaks
      map.remove();
    };
  }, [lat, lng, density, isEditing, circleAdded]); // Recreate the map when coordinates change
  


  return (
   <div ref={mapRef} style={{ height: '100vh', width: '100%' }} />
  )
};

export default LeafletMap;
