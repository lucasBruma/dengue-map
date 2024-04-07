import React, { useEffect, useRef, useState } from 'react';
import { Circle, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { apiClient } from '../services/api';
import { intensity } from '../constants';
import { getSizeBasedOnZoom } from '@/utils/getSize';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const centerHardcoded = {
  lat: -34.617387052407175,
  lng: -58.47473144531251
};

const MapComponent = ({isEditing, density, marker, setMarker, centerOptionSelected, userLocation, circles, setCircles}) => {
  const [map, setMap] = React.useState(null);
  const timerIdRef = useRef(null);
  // const [zoom, setZoom] = useState(12)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const onLoad = React.useCallback(function callback(map) {
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const onMapClick = (e) => {
    if (!isEditing) return;

    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    });
  };

  useEffect(() => {
    const getCenterAndRenderCircles = () => {
      if (!map) return;
  
      const newCenter = map.getCenter();
      if (!newCenter) return null;
      const centerLat = newCenter.lat();
      const centerLng = newCenter.lng();
      const currentZoom = map.getZoom();
  
      async function loadCircles() {   
        const circlesResult = await apiClient.getPointsInAnSquare({
            lat: centerLat,
            long: centerLng
          },
          currentZoom,
        )
        const size = getSizeBasedOnZoom(currentZoom);
        if (circlesResult.value.length > 0) {
          setCircles([
            ...circles.map(x => ({
              long: x.long,
              lat: x.lat,
              intensity: x.intensity,
              size: size
            })),
            ...circlesResult.value.map(x => ({
              long: x.longitud,
              lat: x.latitud,
              intensity: x.intensity,
              size: size
           }))
          ])
        }
      }
  
      loadCircles();
    }

    const pollingCallback = () => {
      getCenterAndRenderCircles();
    };

    const startPolling = () => {
      pollingCallback();
      timerIdRef.current = setInterval(pollingCallback, 10000);
    };
    startPolling();
    

    return () => {
    };
  }, [map]); //


  const getCenterLocation = () => {
    if (!map) return null;
    const newCenter = map.getCenter() ?? null;
    if (!newCenter) return null;
    const centerLat = newCenter.lat() ?? null;
    const centerLng = newCenter.lng() ?? null;
    if (!centerLat || !centerLng) return null;
    return { lat: centerLat, lng: centerLng}
  }

  const handleDrag = () => {
    console.log('The user is dragging the map.');
    // getCenterAndRenderCircles();
  };

  const handleDragEnd = () => {
    console.log('The user stopped dragging the map.');
    // getCenterAndRenderCircles();
  };

  const handleZoomChanged = () => {
    console.log('The user has changed the zoom.');
    if (!map) return;
    const currentZoom = map.getZoom();
    setCircles(circles.map(x => ({
      long: x.long,
      lat: x.lat,
      intensity: x.intensity,
      size: getSizeBasedOnZoom(currentZoom)
    }) ))
  };

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerOptionSelected ? userLocation : getCenterLocation() ?? centerHardcoded}
        zoom={13}
        onClick={onMapClick}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onDrag={handleDrag} 
        onDragEnd={handleDragEnd}
        onZoomChanged={handleZoomChanged}            
      >
        {marker && <Marker position={marker} />}
        {
          circles && circles.length > 0 ? 
            circles.map((x, i) => (
              <Circle 
                key={`${i}${x.lat}${x.long}`} 
                center={{lat: x.lat, lng: x.long}} 
                options={{
                  strokeColor: intensity[x.intensity],
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: intensity[x.intensity],
                  fillOpacity: 0.10
                }} 
                radius={x.size}
              />
            ))
            : null
        }
        </GoogleMap>
  ) : <></>;
};

export default React.memo(MapComponent); // chequear esto
