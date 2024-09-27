
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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  InfoWindowF,
  Autocomplete,
  DirectionsRenderer,
  
} from '@react-google-maps/api'

import { useRef, useState } from 'react'

const center = { lat:40.0709493, lng: 49.369441 }
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

function List() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAC_hK0PSk7fUcavQM8vck5Dy_zmXZvTsQ',
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [start, setstart] = useState('')
  const [stop, setstop] = useState('')
  const [current,setCurrent]=useState('')






function findCenterLatLng(markers) {
    let totalLat = 0;
    let totalLng = 0;
    let totalMarkers = markers.length;

    markers.forEach(marker => {
        totalLat += marker.position.lat;
        totalLng += marker.position.lng;
    });

    let centerLat = totalLat / totalMarkers;
    let centerLng = totalLng / totalMarkers;

    return { lat: centerLat, lng: centerLng };
}

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  if (!isLoaded) {
    return <SkeletonText />
  }

//   const calculateDistance()=>{
//     marker_with_distance=[]
//     for (i in markers):
//         const directionsService = new google.maps.DirectionsService()
//         const results = await directionsService.route({
//         origin: start,
//         destination:stop,
//         // eslint-disable-next-line no-undef
//         travelMode: google.maps.TravelMode.DRIVING,
//         })
//         marker_with_distance.append()
//   }

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          setError("Error: Unable to retrieve location");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
    console.log(location)
    setCurrent("current")
  };



  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      
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
              <Input type='text' ref={originRef} placeholder='Origin'  />
            </Autocomplete>
            {current!=""?<><p>using current location</p></>:<></>}
             <Button colorScheme='pink' type='submit' onClick={()=>{setstart('')}}>
              Clear
            </Button>
             <Button colorScheme='pink' type='submit' onClick={getLocation}>
            use current location
            </Button>
          </Box>
          <Box flexGrow={1}>
           
          </Box>

          <ButtonGroup>
            <Button colorScheme='pink' type='submit' >
             Find closest parking spaces
            </Button>
           
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <p>filters</p>
          <Input/>
          <Input/>

        </HStack>

        
      </Box>
      <TableContainer>
  <Table variant='simple'>
   
    <Thead>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Thead>
    <Tbody>
      
       {markers.map((location, index) => (
        <Tr>
        <Td>{index}</Td>
        <Td>{location.name}</Td>
        <Td isNumeric><Button/></Td>
      </Tr>
      
        ))}
   </Tbody>
  </Table>
</TableContainer>
    </Flex>
  )
}

export default List
