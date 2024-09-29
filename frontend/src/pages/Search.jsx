import React from 'react';
import '../App.css'
import { useNavigate, Link } from 'react-router-dom';
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
import Header from '../Normal';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState, useEffect } from 'react'
import MapLocations from './MapLocations';
import Roote from './Roote';
import Tab from './table';
function Search() {
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

  const [viewMap, setViewMap] = useState(1);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortedMarkers, setSortedMarkers] = useState([]); // Store sorted markers
  const [filter, setFilter] = useState([]);
  const [stop, setStop] = useState();


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

    console.log(start, stop)
    if ((originRef.current.value === '' && current === '') || (destiantionRef.current.value === '' && stop === '')) {
      return
    }

    if (start == '') {
      console.log(start, location, stop)
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
    console.log(start, stop)
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: start,
      destination: stop,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)

  }


  const handleSearch = async (event) => {
    event.preventDefault()

    const originPlace = originRef.current.value;
    const distances = []
    if (originPlace === '') {
      alert('Please enter a location');
      return;
    }

    const directionsService = new google.maps.DirectionsService()
    const promises = data.map(async (location) => {
      const lat = Number(location.Latitude);
      const lng = Number(location.Longitude);

      if (isNaN(lat) || isNaN(lng)) {
        console.error('Invalid lat/lng for location:', location);
        return null;
      }

      const location2 = { lat, lng };

      try {
        const results = await directionsService.route({
          origin: originPlace,
          destination: location2,
          travelMode: google.maps.TravelMode.DRIVING,
        });

        // Return an object that combines location with the distance
        return {
          ...location, // Spread the location properties
          distance: results.routes[0].legs[0].distance.text, // Add the distance
        };
      } catch (error) {
        console.error('Error with directionsService.route:', error);
        return null;
      }
    });

    // Wait for all promises to resolve
    const resolvedDistances = await Promise.all(promises);

    // Filter out any null results (in case of errors)
    const validDistances = resolvedDistances.filter(result => result !== null);

    // Push valid distances into distances array
    distances.push(...validDistances);

    distances.sort((a, b) => {
      // Extract numerical distance values from strings (e.g., "10 km" or "2 miles")
      const distanceA = parseFloat(a.distance); // Adjust this logic if distances have different formats
      const distanceB = parseFloat(b.distance);
      return distanceA - distanceB; // Sort in ascending order
    });

    const limitedDistances = distances.slice(0, 20);

    // Update the state with the first 20 (or fewer) distances
    setFilter(limitedDistances);

  }

  function switchView(viewMap) {
    console.log(viewMap)
    if (viewMap == 1) {
      setViewMap(2)
    }
    else {
      setViewMap(1)
    }
  }

  function handleNavigate(loc) {
    setViewMap(3);
    setStop(loc)
  }

  function changeView() {
    setViewMap(1)
  }
  return (
    <div className='flex flex-col'  >


<div className='px-4 pt-6 md:px-8 md:py-12 '>
   <Header />
</div>
     

      <Flex flexDirection={"column"} height={"100%"} >








      <Flex alignItems={'center'} padding={"1em"}  className="w-full">
  <Autocomplete className="w-[70%]">
    <Input ref={originRef} placeholder='Locality of Parking' size='lg' height="40px" />
  </Autocomplete>
  <Button onClick={handleSearch} className="w-[30%] h-[50px]" style={{ marginLeft: 0 }}>
    Search
  </Button>
</Flex>




        {/* <button onClick={handleSearch} class="text-white absolute end-23 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}




        {viewMap == 3 ? <></> : <span className="float-right pb-2"><a onClick={() => { switchView(viewMap) }}>Switch View</a></span>}

        {viewMap == 1 ?
          <>
            {filter.length == 0 ?
              <div className="relative overflow-x-auto px-1">
                <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" style={{ width: '100%' }}>
                  <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-3 w-7/10"> {/* 70% width */}
                        Parking Lot
                      </th>
                      <th scope="col" className="px-4 py-3 w-3/10"> {/* 30% width */}
                        Availability
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((location, index) => (
                      <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-4 py-3 w-7/10 font-medium text-gray-900 whitespace-normal dark:text-white">
                          {location.Address}
                        </td>
                        <td className="px-4 py-3 w-3/10">
                          {location.Cars}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
             :
          //    <div className="relative overflow-x-auto px-1">
          //    <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" style={{ width: '100%' }}>
          //      <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          //        <tr>
          //          {/* 50% width for Parking Lot */}
          //          <th scope="col" className="px-4 py-3 w-5/10 text-center" >
          //            Parking Lot
          //          </th>
           
          //          {/* 20% width for Availability, truncated text with ellipsis */}
          //          <th scope="col" className="px-2 py-3 w-2/10 text-center" style={{ width: '20%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title="Availability">
          //            Availibilty
          //          </th>
           
          //          {/* 20% width for Distance, truncated text with ellipsis */}
          //          <th scope="col" className="px-2 py-3 text-center" style={{ width: '20%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title="Distance">
          //            Distance
          //          </th>
           
          //          {/* 10% width for Route */}
          //          <th scope="col" className="px-2 py-3 text-center" style={{ width: '10%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title="Route">
          //            Route
          //          </th>
          //        </tr>
          //      </thead>
          //      <tbody>
          //        {filter.map((location, index) => (
          //          <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          //            {/* Parking Lot Column (50%) */}
          //            <td className="px-4 py-3 text-center font-medium text-gray-900 whitespace-normal dark:text-white" style={{ width: '50%' }}>
          //              {location.Address}
          //            </td>
          //            {/* Availability Column (20%) */}
          //            <td className="px-2 py-3 text-center" style={{ width: '20%' }}>
          //              {location.Cars}
          //            </td>
          //            {/* Distance Column (20%) */}
          //            <td className="px-2 py-3 text-center" style={{ width: '20%' }}>
          //              {location.distance}
          //            </td>
          //            {/* Route Column (10%) */}
          //            <td className="px-2 py-3 text-center" style={{ width: '10%' }}>
          //              <Button background={'blue'} onClick={() => handleNavigate(location)} />
          //            </td>
          //          </tr>
          //        ))}
          //      </tbody>
          //    </table>
          //  </div>

           <div className="relative overflow-x-auto px-1">
                <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" style={{ width: '100%' }}>
                  <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-3 w-7/10"> {/* 70% width */}
                        Parking Lot
                      </th>
                      <th scope="col" className="px-4 py-3 w-3/10"> {/* 30% width */}
                        Availability
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filter.map((location, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-4 py-3 w-7/10 font-medium text-gray-900 whitespace-normal dark:text-white">
                          <Tab location={location}/>
                        </td>
                        <td className="px-4 py-3 w-3/10">
                          {location.Cars}
                        </td>
                      </tr>
                 ))}
                  </tbody>
                </table>
              </div>
           

           
              
              }

          </> : viewMap == 2 ? <MapLocations data={data} switchView={switchView} viewMap={viewMap} /> :
            <Roote changeView={changeView} start={originRef.current.value} stop={stop} ref={originRef} />}






      </Flex>
    </div>
  );
}

export default Search;
