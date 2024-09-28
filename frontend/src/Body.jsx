import React from 'react';

import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Booking from './pages/Booking'
import List from './pages/List' 
import Main from './pages/Main'
import User from './pages/user1'
import Search from './pages/Search'
import MapLocations from './pages/MapLocations'
import Analytics from './pages/Analytics'
import Pay from './pages/Pay'
import Roote from './pages/Roote'
import Avail from './pages/Avail'
import Graph from './pages/Graph'
import { Box,Flex } from '@chakra-ui/react'
import Header from './Normal'
import App from './App';
function Body ()  {
  return (
 
      
   

         <div>
      <Header /> {/* Header will be shown on all pages */}
      {/* Dynamic content for each page */}
      
    </div>
  );
}

export default Body