import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { apiClient } from '../services/api';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: -34.617387052407175,
  lng: -58.47473144531251
};

const radius = 100;

const circleOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius, // in meters
    zIndex: 1
};

const MapComponent = ({isEditing, density, marker, setMarker}) => {
  const [map, setMap] = React.useState(null);
  const timerIdRef = useRef(null);
  const [isPollingEnabled, setIsPollingEnabled] = useState(true);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
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
    if (!isLoaded || !map) return;

    async function loadCircles() {
        const circlesResult = await apiClient.getPointsInAnSquare()
        for (const circle of circlesResult.value) {
            const circleRendered = new window.google.maps.Circle({
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.35,
              map,
              center: {lat: circle.lat, lng: circle.long},
              radius: 100,
              ...circleOptions
            });
          }
    }

    loadCircles();
  }, [isLoaded, map, circleOptions]);

  useEffect(() => {
    const pollingCallback = () => {
        // Your polling logic here
      console.log('Polling...');

        // Simulating an API failure in the polling callback
        //   const shouldFail = Math.random() < 0.2; // Simulate 20% chance of API failure

        //   if (shouldFail) {
        //     setIsPollingEnabled(false);
        //     console.log('Polling failed. Stopped polling.');
        //   }
    };

    const startPolling = () => {
      pollingCallback(); // To immediately start fetching data
      // Polling every 30 seconds
      timerIdRef.current = setInterval(pollingCallback, 30000);
    };

    const stopPolling = () => {
      clearInterval(timerIdRef.current);
    };

    if (isPollingEnabled && map) {
      startPolling();
    } else {
      stopPolling();
    }

    return () => {
      stopPolling();
    };
  }, [isPollingEnabled, map]);

  const getCenterAndRenderCircles = () => {
    if (!map) return;

    const newCenter = map.getCenter();

    async function loadCircles() {
        const circlesResult = await apiClient.getPointsInAnSquare() // pasar el newCenter
        for (const circle of circlesResult.value) {
            const circleRendered = new window.google.maps.Circle({
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.35,
              map,
              center: {lat: circle.lat, lng: circle.long},
              radius: 100,
              ...circleOptions
            });
          }
    }

    loadCircles();
  }


  const handleDrag = () => { // pasarle a la query el punto del medio y la distancia del zoom (a revisar)
    console.log('The user is dragging the map.');
    getCenterAndRenderCircles();
  };

  const handleDragEnd = () => {
    console.log('The user stopped dragging the map.');
    getCenterAndRenderCircles();
  };

  const handleZoomChanged = () => {
    console.log('The user has changed the zoom.');
    getCenterAndRenderCircles();
  };

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onClick={onMapClick} // Set up the click event listener here
        onLoad={onLoad}
        onUnmount={onUnmount}
        onDrag={handleDrag} 
        onDragEnd={handleDragEnd}
        onZoomChanged={handleZoomChanged}       
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
  ) : <></>;
};

export default React.memo(MapComponent); // chequear esto
