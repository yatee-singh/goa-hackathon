import { Button, Flex ,Box, Heading} from '@chakra-ui/react';
import React from 'react';

function Tab (props)  {
  // const props={Address:"serggerwergw sdggggggggggggggggggw ergh",Cars:"23",distance:"dsfjbg km"}
  return (
    <Flex direction={'column'} width={'-moz-fit-content'}>
        <Box>
 <Heading as='h6' size={'xs'}>
  {props.location.Address}
  </Heading>
        </Box>
        <Flex direction={'row'}  justifyItems={'baseline'} justifyContent={'flex-start'}>

<Box padding={'1em'}>{props.location.distance}</Box>
<Box padding={'1em'} ><Button backgroundColor={'blue'} color={'white'} paddingY={'0.2rem'} height={'-moz-initial'} onClick={props.handleNaviagte(props.loaction)}>route</Button></Box>
        </Flex>

        
    </Flex>
  );
}

export default Tab