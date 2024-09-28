import React, { useState } from 'react';
import Header from '../Normal';
import axios from 'axios';
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
function Pol ()  {

    const [day,useDay]=useState("")
    const [response, setResponse] = useState(null);
      const [error, setError] = useState('');
    async function handleSubmit()
    {
        const req={day:day}
      
            console.log(req)
            try {
            const result = await axios.post('http://localhost:3000/polDeploy',JSON.stringify(req),{
                headers:{
                    'Content-Type':'Application/JSON'
                }
            });
            console.log(result.data)
            result.data.sort((a, b) => b.totalTicketsRequired - a.totalTicketsRequired);
            console.log(result)
            // Assuming the API returns an object in response
            setResponse(result.data);
            } catch (err) {
            setError('Error occurred while fetching data');
            }
   
    }
  return (
   <div>
    <Header/>
    <Heading mt="20px" mb="10px">Police <span className="text-blue-600 dark:text-blue-500 font-bold">Deployment</span> Trends</Heading>
    <Flex>
     <Select placeholder='Enter Day' onChange={(e)=>{useDay(e.target.value)}} flex="0.7" marginLeft="10px" marginBottom={"30px"} marginTop={"10px"}>
    <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
    </Select>
    <Button onClick={handleSubmit} flex="0.3" marginLeft="10px" backgroundColor="blue" 
  color="white" marginBottom={"30px"} marginTop={"10px"}>
        Get Trends
    </Button>
    </Flex>

    {response==null?<></>:
    <TableContainer>
  <Table variant='simple'>
    <TableCaption color="blue">Location wise sorted data</TableCaption>
    <Thead>
      <Tr>
        <Th textAlign="center" fontWeight="bold" >Locality</Th>
       
        <Th textAlign="center" fontWeight="bold" isNumeric>Percentage of officers Deployed</Th>
      </Tr>
    </Thead>
    <Tbody>

        {response.map(res => (
            <Tr>
        <Td textAlign="center" >{res._id}</Td>
        <Td textAlign="center" color="gray.500">{res.totalTicketsRequired}</Td>
      
      </Tr>
         
        ))}
      
      </Tbody>
  </Table>
</TableContainer>}
   
    {}
   </div>
  );
}

export default Pol;
