import React from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useRef, useState,useEffect } from 'react'
import MapLocations from './MapLocations';
function Search  ()  {
      const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAC_hK0PSk7fUcavQM8vck5Dy_zmXZvTsQ',
    libraries: ['places'],
  })
   useEffect(() => {
    // Fetch data from the endpoint
    fetch('http://localhost:3000/data')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
      console.log(data)
  }, []); // Empty dependency array ensures this runs only once after the component mounts
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  const [viewMap,setViewMap]=useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortedMarkers, setSortedMarkers] = useState([]); // Store sorted markers

 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

 

  if (!isLoaded) {
    return <div>Loading..</div>
  }

 

// const calculateDistance = (latLngA, latLngB) => {
//   return google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
// };
const calculateDistance = (latLngA, latLngB) => {
  return google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
};


  async function calculateRoute() {

    console.log(start,stop)
    if ((originRef.current.value === '' && current==='') || (destiantionRef.current.value === '' && stop==='')) {
      return
    }

    if( start=='')
    {
      console.log(start,location,stop)
      setstop(destiantionRef.current.value)
      const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: location,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
    
    return;
    }
    setstart(originRef.current.value)
    setstop(destiantionRef.current.value)
    console.log(start,stop)
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: start,
      destination:stop,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
    
  }


 const  handleSearch =async (event) => {
  event.preventDefault()
  const originPlace = originRef.current.value;

  if (originPlace === '') {
    alert('Please enter a location');
    return;
  }
  const distances=[]
const directionsService = new google.maps.DirectionsService()
  data.map(async function(location, index) {
      console.log(location.Latitude,location.Longitude)
      const results = await directionsService.route({
      origin: originRef.current.value,
      destination: {lat:location.Latitude,lng:location.Longitude},
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
     distances.append([...location,results.routes[0].legs[0].distance.text])
  }

   

  )

  console.log(distances)

  
    
    

 
};

  return (
    <div>

        <Flex  flexDirection={'column'} height={'100vh'}>

              
    

<form class="pb-10">   
    <label for="search" class="flex-col px-4 py-6 md:px-8 md:py-12 mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
       <Autocomplete>
        <input ref={originRef} type="search" id="search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
    </Autocomplete>
    <button onClick={handleSearch} class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    
        {/* <button onClick={handleSearch} class="text-white absolute end-23 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}

        
    </div>
</form>
<a onClick={()=>{setViewMap(!viewMap)}}>View In Map</a>

{viewMap?
<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                   Parking Lot
                </th>
                <th scope="col" class="px-6 py-3">
                   Availability
                </th>
                <th scope="col" class="px-6 py-3">
                   Route
                </th>
                
            </tr>
        </thead>
        <tbody>
             {data.map((location, index) => (
                 <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {location.Address}
                </th>
                <td class="px-6 py-4">
                    {location.Cars}
                </td>
                <td class="px-6 py-4">
                    <Button onClick={()=>{navigate('/route')}}/>
                </td>
                
            </tr>
       
      
        ))}
          
           
        </tbody>
    </table>
</div>:<MapLocations data={data}/>}






</Flex>
    </div>
  );
}

export default Search;
