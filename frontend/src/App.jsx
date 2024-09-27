import React, { useEffect } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Booking from './pages/Booking'
import List from './pages/List' 
import Main from './pages/Main'






export default function App() {
 

  return (
    <>
          <BrowserRouter>

            <Routes>
              
              <Route path='/' element={<Main/>}/>
              <Route path='/booking' element={<Booking/>}/>
              <Route path='/list' element={<List/>}/>
              {/* <Route path='/admin' element={<AdminLaouts/>}>
              <Route index element={<Admin/>}/>

              </Route>
              <Route path='/' element={<PublicLayouts/>}>
              <Route path='login' element={<Login/>}/>
              <Route path='register' element={<Register/>}/>
                   
              </Route> */}
            </Routes>
          </BrowserRouter>



    </>
  )
}
