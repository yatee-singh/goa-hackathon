import BookTickets from "./BookTickets";
import Desp from "./Desp";
import Header from "./Header";

import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from '@chakra-ui/react';
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF
} from '@react-google-maps/api';
import { useRef, useState, useEffect } from 'react';

const markers = [
  {
    id: 1,
    name: "Panaji",
    position: { lat: 15.4909, lng: 73.8278 },
  }, 
  {
    id: 2,
    name: "Margao",
    position: { lat: 15.2993, lng: 73.9570 },
  },
  {
    id: 3,
    name: "Vasco da Gama",
    position: { lat: 15.3860, lng: 73.8443 },
  },
  {
    id: 4,
    name: "Mapusa",
    position: { lat: 15.5912, lng: 73.8087 },
  },
  {
    id: 5,
    name: "Ponda",
    position: { lat: 15.4047, lng: 74.0150 },
  }
];

function MapLocations() {
  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAC_hK0PSk7fUcavQM8vck5Dy_zmXZvTsQ',
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    if (isLoaded) {
      const newBounds = new window.google.maps.LatLngBounds();
      markers.forEach(marker => newBounds.extend(marker.position));
      setBounds(newBounds);
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        <a onClick={() => { navigate('/search') }}> {"<"} </a>Map
      </h1>
      <Box height={'90vh'} width={'100vw'}>
        <Box left={0} top={0} h='100%' w='100%'>
          {/* Google Map Box */}
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            onLoad={map => setMap(map)}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            // Set the bounds for the map when it loads
            onBoundsChanged={() => {
              if (bounds && map) {
                map.fitBounds(bounds);
              }
            }}
          >
            {markers.map(({ id, position }) => (
              <MarkerF
                key={id}
                position={position}
              />
            ))}
          </GoogleMap>
        </Box>
      </Box>
    </div>
  );
}

export default MapLocations;
