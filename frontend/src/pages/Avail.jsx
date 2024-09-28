import React, { useState } from 'react';
import Header from '../Normal';
import axios from 'axios';
import { Heading ,Flex,Input, Button,Box,Select} from '@chakra-ui/react';
function Avail()  {

    const [local,setLocal]=useState("");
    const [day,setDay]=useState("");
        const [response, setResponse] = useState(null);
  const [error, setError] = useState('');


    const submit = async (e) => {

        const req={location:local,day:day}
    e.preventDefault();
            console.log(req)
    try {
      const result = await axios.post('http://localhost:3000/predictAv',JSON.stringify(req),{
        headers:{
            'Content-Type':'Application/JSON'
        }
      });
      console.log(result.data)
      // Assuming the API returns an object in response
      setResponse(result.data);
    } catch (err) {
      setError('Error occurred while fetching data');
    }
  };
  

  return (
    <div className="px-4 py-6 md:px-8 md:py-12 height:100vh">
        <Header/>
        <Flex direction={'column'} alignItems={'center'} >
            <Heading>Predict Your Chances of getting a parking spot</Heading>
            <Select width={'60vw'} onChange={(e)=>{setLocal(e.target.value)}} placeholder='Select option'>
  <option value='Panaji'>Panaji</option>
  <option value='option2'>Option 2</option>
  <option value='option3'>Option 3</option>
</Select>

 <Select width={'60vw'} onChange={(e)=>{setDay(e.target.value)}} placeholder='Select option'>
  <option value='Monday'>Option 1</option>
  <option value='option2'>Option 2</option>
  <option value='option3'>Option 3</option>
</Select>
            
              <Button width={'60vw'} onClick={submit} margin={'1rem'} color={'white'} backgroundColor={'blue'} >Predict</Button>

              <Box>
                {response!=null?response.average:""}
              </Box>
              
        </Flex>
    </div>
  );
}

export default Avail;
