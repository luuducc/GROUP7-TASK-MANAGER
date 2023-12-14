import React from 'react';
import { 
  Container, 
  Box, 
  Text, 
  Tabs, 
  TabList,   
  TabPanel, 
  TabPanels, 
  Tab 
} from '@chakra-ui/react';
import Login from '../components/Login';
import Signup from '../components/Signup';

const Homepage = () => {
  return (
    <Container maxW = 'xl' centerContent>
      <Box
        d='flex' 
        justifyContent='center'
        p={3}
        bg='white'
        w='100%' 
        m="40px 0 15px 0"
        borderRadius='lg'
        borderWidth='1px'
      >
      <Text textAlign='center' fontSize='3xl' fontFamily='Work sans'>To Do List</Text> 
      </Box>
      <Box bg='white' w='100%' p={4} borderRadius='lg' borderWidth='1px'>
        <Tabs variant='enclosed'>
          <TabList mb='1em' >
            <Tab width='50%'>Log In</Tab>
            <Tab width='50%'>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
};

export default Homepage
