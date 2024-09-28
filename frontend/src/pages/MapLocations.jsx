import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  InfoWindowF,
} from '@react-google-maps/api';

// Define the markers
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

function MapLocations(props) {
  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAC_hK0PSk7fUcavQM8vck5Dy_zmXZvTsQ',
    libraries: ['places'],
  });

  const [activeMarker, setActiveMarker] = useState(null); // State to track the active marker

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
     
      <Box height={'100vh'} width={'100vw'}>
        {/* <a onClick={props.switchView(props.viewMap)}>Switch View</a> */}
        <Box  h='100%' w='100%'>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={{ lat: 15.4909, lng: 73.8278 }} // Center of the map
            zoom={15} // Set the initial zoom level
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            {props.data.map((loc) => (
              <MarkerF
                key={loc._id}
                position={{lat:loc.Latitude,lng:loc.Longitude}}
                onClick={() => setActiveMarker(id)} // Set the active marker on click
              />
            ))}

            {activeMarker && (
              <InfoWindowF 
                position={markers.find(marker => marker._id === activeMarker).position}
                onCloseClick={() => setActiveMarker(null)}
              >
                <div>
                  <h3>{markers.find(marker => marker.id === activeMarker).name}</h3> {/* Display the name here */}
                </div>
              </InfoWindowF>
            )}
          </GoogleMap>
        </Box>
      </Box>
    </div>
  );
}

export default MapLocations;
