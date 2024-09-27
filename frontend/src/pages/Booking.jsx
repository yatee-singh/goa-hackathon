// // import React from 'react';
// // import { createRoot } from "react-dom/client";
// // import { APIProvider, Map } from '@vis.gl/react-google-maps'; // Ensure Map is imported

// // const Booking = () => (
// //   <>
  
// //   <APIProvider 
// //     apiKey={'AIzaSyAC_hK0PSk7fUcavQM8vck5Dy_zmXZvTsQ'} 
// //     onLoad={() => console.log('Maps API has loaded.')}
// //   >
// //     <div style={{ height: '100vh', width: '100vw' }}> {/* Container for the Map */}
// //       <Map
// //         defaultZoom={13}
// //         defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
// //         onCameraChanged={(ev) => 
// //           console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
// //         }
// //       />
// //     </div>
// //   </APIProvider>
// //   </>
// // );

// // // const root = createRoot(document.getElementById('root')); // Ensure your root element exists
// // // root.render(<Booking />);

// // export default Booking;
// import {
//   Box,
//   Button,
//   ButtonGroup,
//   Flex,
//   HStack,
//   IconButton,
//   Input,
//   SkeletonText,
//   Text,
// } from '@chakra-ui/react'
// // import { FaLocationArrow, FaTimes } from 'react-icons/fa'

// import {
//   useJsApiLoader,
//   GoogleMap,
//   MarkerF,
//   InfoWindowF,
//   Autocomplete,
//   DirectionsRenderer,
  
// } from '@react-google-maps/api'

// import { useRef, useState } from 'react'

// const center = { lat:40.0709493, lng: 49.369441 }
// const markers = [
//   {
//     id: 1,
//     name: "Panaji",
//     position: { lat: 15.4909, lng: 73.8278 },
//   }, 
//   {
//     id: 2,
//     name: "Margao",
//     position: { lat: 15.2993, lng: 73.9570 },
//   },
//   {
//     id: 3,
//     name: "Vasco da Gama",
//     position: { lat: 15.3860, lng: 73.8443 },
//   },
//   {
//     id: 4,
//     name: "Mapusa",
//     position: { lat: 15.5912, lng: 73.8087 },
//   },
//   {
//     id: 5,
//     name: "Ponda",
//     position: { lat: 15.4047, lng: 74.0150 },
//   }
// ];

// function Booking() {


//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: 'AIzaSyAC_hK0PSk7fUcavQM8vck5Dy_zmXZvTsQ',
//     libraries: ['places'],
//   })

//   const [map, setMap] = useState(/** @type google.maps.Map */ (null))
//   const [directionsResponse, setDirectionsResponse] = useState(null)
//   const [distance, setDistance] = useState('')
//   const [duration, setDuration] = useState('')
//   const [location, setLocation] = useState({ lat: null, lng: null });
//   const [start, setstart] = useState('')
//   const [stop, setstop] = useState('')
//   const [current,setCurrent]=useState('')

//   const [activeMarker, setActiveMarker] = useState(null);

//   const handleActiveMarker = (marker,position) => {
//     setstop(position)
//     console.log(stop)
//     if (marker === activeMarker) {
//       return;
//     }
//     setActiveMarker(marker);
//   };


// function findCenterLatLng(markers) {
//     let totalLat = 0;
//     let totalLng = 0;
//     let totalMarkers = markers.length;

//     markers.forEach(marker => {
//         totalLat += marker.position.lat;
//         totalLng += marker.position.lng;
//     });

//     let centerLat = totalLat / totalMarkers;
//     let centerLng = totalLng / totalMarkers;

//     return { lat: centerLat, lng: centerLng };
// }

//   /** @type React.MutableRefObject<HTMLInputElement> */
//   const originRef = useRef()
//   /** @type React.MutableRefObject<HTMLInputElement> */
//   const destiantionRef = useRef()

//   if (!isLoaded) {
//     console.log(isLoaded)
//     return <SkeletonText />
//   }

//   async function calculateRoute() {

//     console.log(start,stop)
//     if ((originRef.current.value === '' && current==='') || (destiantionRef.current.value === '' && stop==='')) {
//       return
//     }

//     if( start=='')
//     {
//       console.log(start,location,stop)
//       setstop(destiantionRef.current.value)
//       const directionsService = new google.maps.DirectionsService()
//     const results = await directionsService.route({
//       origin: location,
//       destination: destiantionRef.current.value,
//       // eslint-disable-next-line no-undef
//       travelMode: google.maps.TravelMode.DRIVING,
//     })
//     setDirectionsResponse(results)
//     setDistance(results.routes[0].legs[0].distance.text)
//     setDuration(results.routes[0].legs[0].duration.text)
    
//     return;
//     }
//     setstart(originRef.current.value)
//     setstop(destiantionRef.current.value)
//     console.log(start,stop)
//     // eslint-disable-next-line no-undef
//     const directionsService = new google.maps.DirectionsService()
//     const results = await directionsService.route({
//       origin: start,
//       destination:stop,
//       // eslint-disable-next-line no-undef
//       travelMode: google.maps.TravelMode.DRIVING,
//     })
//     setDirectionsResponse(results)
//     setDistance(results.routes[0].legs[0].distance.text)
//     setDuration(results.routes[0].legs[0].duration.text)
    
//   }

//   function clearRoute() {
//     setDirectionsResponse(null)
//     setDistance('')
//     setDuration('')
//     originRef.current.value = ''
//     destiantionRef.current.value = ''
//   }

//   const getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         (err) => {
//           setError("Error: Unable to retrieve location");
//         }
//       );
//     } else {
//       setError("Geolocation is not supported by your browser.");
//     }
//     console.log(location)
//     setCurrent("current")
//   };



//   return (
//     <Flex
//       position='relative'
//       flexDirection='column'
//       alignItems='center'
//       h='100vh'
//       w='100vw'
//     >
//       <Box position='absolute' left={0} top={0} h='100%' w='100%'>
//         {/* Google Map Box */}
//         <GoogleMap
//           center={findCenterLatLng(markers)}
//           zoom={10}
//           mapContainerStyle={{ width: '100%', height: '100%' }}
//           options={{
//             zoomControl: false,
//             streetViewControl: false,
//             mapTypeControl: false,
//             fullscreenControl: false,
//           }}
//           onLoad={map => setMap(map)}
//         >
          
          
//       {/* {locations.map((pin) => (
//                <Marker
//                   position={center}
              
//                map={map}
//                />
//              ))}


             
//               <Marker position={center} />  */}

//               {markers.map(({ id, name, position }) => (
//                 <MarkerF
//                   key={id}
//                   position={position}
//                   onClick={() => handleActiveMarker(id,position)}
//                   // icon={{
//                   //   url:"https://t4.ftcdn.net/jpg/02/85/33/21/360_F_285332150_qyJdRevcRDaqVluZrUp8ee4H2KezU9CA.jpg",
//                   //   scaledSize: { width: 50, height: 50 }
//                   // }}
//                 >
//                  {activeMarker === id ? (
//                     <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
//                       <div>
//                         <p>{name}</p>
//                       </div>
//                     </InfoWindowF>
//                   ) : null}
//                 </MarkerF>
//               ))}


//           {directionsResponse && (
//             <DirectionsRenderer directions={directionsResponse} />
//           )}
//         </GoogleMap>
//       </Box>
//       <Box
//         p={4}
//         borderRadius='lg'
//         m={4}
//         bgColor='white'
//         shadow='base'
//         minW='container.md'
//         zIndex='1'
//       >
//         <HStack spacing={2} justifyContent='space-between'>
//           <Box flexGrow={1}>
//             <Autocomplete>
//               <Input type='text' ref={originRef} placeholder='Origin'  />
//             </Autocomplete>
//              <Button colorScheme='pink' type='submit' onClick={()=>{setstart('')}}>
//               Clear
//             </Button>
//              <Button colorScheme='pink' type='submit' onClick={getLocation}>
//             use current location
//             </Button>
//           </Box>
//           <Box flexGrow={1}>
//             <Autocomplete>
//               <Input
//                 type='text'
//                 placeholder='Destination'
//                 ref={destiantionRef}
                
//               />
              
//             </Autocomplete>
           
//           </Box>

//           <ButtonGroup>
//             <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
//               Calculate Route
//             </Button>
//             <Button
//               aria-label='center back'
              
//               onClick={clearRoute}
//             />
//           </ButtonGroup>
//         </HStack>
//         <HStack spacing={4} mt={4} justifyContent='space-between'>
//           <Text>Distance: {distance} </Text>
//           <Text>Duration: {duration} </Text>
//           <Button
//             aria-label='center back'
           
//             isRound
//             onClick={() => {
//               map.panTo(center)
//               map.setZoom(15)
//             }}
//           />
//         </HStack>
//       </Box>
//     </Flex>
//   )
// }

// export default Booking

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from '@chakra-ui/react'
// import { FaLocationArrow, FaTimes } from 'react-icons/fa'

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'

const center = { lat: 48.8584, lng: 2.2945 }

function Booking() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAC_hK0PSk7fUcavQM8vck5Dy_zmXZvTsQ',
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  if (!isLoaded) {
    return <SkeletonText />
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
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
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <HStack spacing={2} justifyContent='space-between'>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type='text'
                placeholder='Destination'
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label='center back'
              value="clearRoute"
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label='center back'
            
            isRound
            value="center"
            onClick={() => {
              map.panTo(center)
              map.setZoom(15)
            }}
          />
        </HStack>
      </Box>
    </Flex>
  )
}

export default Booking
