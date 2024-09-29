import React, { useState } from 'react';
import Header from '../Normal';
import axios from 'axios';
import { Heading, Flex, Button, Box, Select } from '@chakra-ui/react';

function Avail() {
    const [local, setLocal] = useState("");  // Correct variable for location
    const [day, setDay] = useState("");
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        const req = { location: local, day: day };
        console.log(req);
        try {
            const result = await axios.post('http://localhost:3000/predictAv', JSON.stringify(req), {
                headers: {
                    'Content-Type': 'application/json'  // Correct content type
                }
            });
            console.log(result.data);
            setResponse(result.data);
        } catch (err) {
            setError('Error occurred while fetching data');
            console.error(err); // Log the error for debugging
        }
    };

    return (
        <div className="px-4 py-6 md:px-8 md:py-12 height:100vh">
            <Header />
            <Flex direction={'column'} alignItems={'center'}>
                <Heading marginTop="30px" marginBottom='20px'>Predict Your <span className="text-blue-600 dark:text-blue-500">Parking</span> Spot</Heading>
                
                <Select 
                    width={'60vw'} 
                    onChange={(e) => { setLocal(e.target.value); }} // Correct state update
                    placeholder='Select Location'
                    marginBottom='10px'
                >
                    <option value='Panaji'>Panaji</option>
                    <option value='Vasco'>Vasco</option>
                    <option value='Mopa'>Mopa</option>
                    <option value='Curchorem'>Curchorem</option>
                    <option value='Anjuna'>Anjuna</option>
                    <option value='Calangute'>Calangute</option>
                    <option value='Margao'>Margao</option>
                    <option value='Bicholim'>Bicholim</option>
                    <option value='Colva'>Colva</option>
                    <option value='Canacona'>Canacona</option>
                    <option value='Porvorim'>Porvorim</option>
                    <option value='Mapusa'>Mapusa</option>
                    <option value='Quepem'>Quepem</option>
                </Select>

                <Select 
                    width={'60vw'} 
                    onChange={(e) => { setDay(e.target.value); }} 
                    placeholder='Select Day'
                >
                    <option value='Monday'>Monday</option>
                    <option value='Tuesday'>Tuesday</option>
                    <option value='Wednesday'>Wednesday</option>
                    <option value='Thursday'>Thursday</option>
                    <option value='Friday'>Friday</option>
                    <option value='Saturday'>Saturday</option>
                    <option value='Sunday'>Sunday</option>
                </Select>

                <Button 
                    width={'60vw'} 
                    onClick={submit} 
                    margin={'1rem'} 
                    color={'white'} 
                    backgroundColor={'blue'}
                >
                    Predict
                </Button>

                <Box>
                    {response != null ? response.average : ""}
                </Box>
            </Flex>
        </div>
    );
}

export default Avail;
