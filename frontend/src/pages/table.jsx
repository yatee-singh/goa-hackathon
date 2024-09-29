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
        <Flex direction={'row'}  justifyItems={'baseline'} justifyContent={'space-between'}>

<Box padding={'1em'}>{props.location.distance}</Box>
<Box padding={'1em'}><Button height={'-moz-max-content'}>route</Button></Box>
        </Flex>

        
    </Flex>
  );
}

export default Tab