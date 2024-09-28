import React, { useEffect } from 'react'
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

import Header from './Normal'


export default function App() {
 

  return (
  

      
   

          <BrowserRouter>

            <Routes>
              
              <Route path='/' element={<Main/>}/>
              <Route path='/booking' element={<Booking/>}/>
              <Route path='/list' element={<List/>}/>
               <Route path='/user' element={<User/>}/>
                <Route path='/analytics' element={<Analytics/>}/>
                 <Route path='search' element={<Search/>}/>
                  <Route path='mapLocations' element={<MapLocations/>}/>

                   <Route path='route' element={<Roote/>}/>
                  <Route path='/graph' element={<Graph/>}/>
                    <Route path='/pay' element={<Pay/>}/>
                    <Route path='/avail' element={<Avail/>}/>
             
            </Routes>
            
          </BrowserRouter>




  )
}


