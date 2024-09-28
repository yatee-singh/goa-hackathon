import React, { useState ,forwardRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@chakra-ui/react';
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  InfoWindowF,
  DirectionsRenderer,
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

function  Roote (props) {
  console.log(props.start)
  console.log(props.stop)
  const navigate = useNavigate();


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAC_hK0PSk7fUcavQM8vck5Dy_zmXZvTsQ',
    libraries: ['places'],
  });

  useEffect(() => {
    // Fetch data from the endpoint
   calculateRoute()
  }, []); 

  const [activeMarker, setActiveMarker] = useState(null); // State to track the active marker
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  function startNav(){

     const k1=props.start.split(' ').join('+');
     const k2=props.stop.Address.split(' ').join('+')
     const url='https://www.google.co.in/maps/dir/'+k1+'/'+k2
     window.open(url);
  
  }

  async function calculateRoute() {
    if (props.start=== '' || props.stop === '') {
      return
    }
    const lat = Number(props.stop.Latitude);
    const lng = Number(props.stop.Longitude);

    if (isNaN(lat) || isNaN(lng)) {
      console.error('Invalid lat/lng for location:', location);
      return null;
    }

    const location2 = { lat, lng };

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin:props.start,
      destination:location2,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    
  }

  return (
    <div>
      <a onClick={props.changeView}>Go Back</a>
    
      <Box height={'100vh'} width={'100vw'}>
        <Box  h='100%' w='100%'>
          <GoogleMap
         center={{ lat: 15.5527, lng: 73.7490 }}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Button  onClick={() => { navigate('/pay'); }}> Pay</Button>
      <Button onClick={startNav}>start navigation</Button>
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        
          
          </GoogleMap>
        </Box>
      </Box>
    </div>
  );
}

export default Roote;
