import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { apiClient } from '../services/api';

const getMapBounds = (map) => {
  const bounds = map.getBounds();
  const northEast = bounds.getNorthEast(); // Top right corner
  const southWest = bounds.getSouthWest(); // Bottom left corner
  const northWest = bounds.getNorthWest();
  const southEast = bounds.getSouthEast();

  return { northEast, southWest, northWest, southEast };
}

const LeafletMap = ({ lat, lng, density, isEditing, circleAdded, setCircleAdded }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);  // Store the Leaflet map instance
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

      // console.log("lat: ", lat, "lng: ", lng);

      // Store the new circle in the ref
      lastCircleRef.current = newCircle;
    };

    // Function to log the coordinates of the map's corners
    const paintPointsIntoMap = async () => {
      console.log("paintPointsIntoMap")
      const { northEast, northWest, southEast, southWest } = getMapBounds(map);

      const points = await apiClient.getPointsInAnSquare({
        leftTop: northWest,
        rightTop: northEast,
        leftBottom: southWest,
        rightBottom: southEast
      });

      // console.log(points.value)

      for (var i = 0; i < points.value; i++) {
        const point = points.value[i];
        console.log(point);
        const circle = new L.circle([point.lat, point.long], {
          color: point.intensity === 0 ? 'yellow' : point.intensity === 1 ? 'orange' : 'red',
          fillColor: point.intensity === 0 ? 'yellow' : point.intensity === 1 ? 'orange' : 'red',
          fillOpacity: 0.5,
          radius: 40
        }).addTo(map);
      }
    };

    // Log the map corners when the map is loaded
    map.whenReady(paintPointsIntoMap);

    // Update corner coordinates when the map is panned or zoomed -> aca debería hacer las queries a la api
    map.on('moveend', paintPointsIntoMap);

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
