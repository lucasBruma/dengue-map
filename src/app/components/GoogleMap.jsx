import React, { useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader, Circle } from '@react-google-maps/api';
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
    console.log(isEditing)
    if (!isEditing) return;

    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    });
    // console.log(`Latitude: ${e.latLng.lat()}, Longitude: ${e.latLng.lng()}`);
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

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onClick={onMapClick} // Set up the click event listener here
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
  ) : <></>;
};

export default React.memo(MapComponent);
