import { Button, Flex ,Box, Heading} from '@chakra-ui/react';
import React from 'react';

function Tab (props)  {
  return (
    <Flex direction={'column'} paddingY={'4em'}>
        <Box>
 <Heading as='h2' size='xl'>
  {props.Address}
  </Heading>
        </Box>
        <Flex direction={'row'} paddingX={'4em'} justifyItems={'flex-start'}>
<Box padding={'1em'}> {props.Address}</Box>
<Box padding={'1em'}>r{props.distance}</Box>
<Box padding={'1em'}><Button>route</Button></Box>
        </Flex>

        
    </Flex>
  );
}

export default Tab