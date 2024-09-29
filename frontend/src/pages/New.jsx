import React, { useState,useEffect } from 'react';
import Header from '../Normal';
import axios from 'axios';
import "../App.css"
import { Button, Flex, Heading, Select } from '@chakra-ui/react';
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
function New()  {


    const [data, setData] = useState([]); // State to hold fetched data
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling

    // Fetch data from the API when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/suggest'); // Adjust the URL as needed
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json(); // Parse JSON from the response
                setData(result); // Update state with fetched data
            } catch (error) {
                setError(error); // Set error state
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        fetchData(); // Call the fetch function
    }, []); // Empty dependency array to run only once when the component mounts

    // Conditional rendering for loading and error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

  
  return (
   <div className="px-4 py-6 md:px-8 md:py-12 height:100vh">
    <Header/>
    <Heading padding={'2rem'}>New Parking Spaces<span className="text-blue-600 dark:text-blue-500 font-bold"> Where?</span> </Heading>
 
 <div>
         {data==null?<></>:
    <TableContainer>
  <Table variant='simple'>
    <TableCaption color="blue">Location wise sorted data</TableCaption>
    <Thead>
      <Tr>
        <Th textAlign="center" fontWeight="bold" >Top 5 Localities </Th>
       
        
      </Tr>
    </Thead>
    <Tbody>
        

       
     
                {data.map((item) => (
                  <Tr >
                    <div className='pt-4'>
                        <p><strong>Locality:</strong> {item._id}</p>
                        <p><strong>Total Ratio:</strong> {item.totalRatio}</p>
                        <p><strong>Total Capacity:</strong> {item.totalCapacity}</p>
                        <p><strong>Fitness Function:</strong> {item.fitnessFunction}</p>
                        </div>
                   </Tr>
                ))}
           
      
   
         
   
      
      </Tbody>
  </Table>
</TableContainer>}
    
   </div>
   </div>
  );
}

export default New;
