
import BookTickets from "./BookTickets";
import Desp from "./Desp";
import Header from "./Header";
import { Button } from "@chakra-ui/react";
//import Button from 'react-bootstrap/Button';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
function MapLocations() {

 
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/booking');

  };
  return (
    <div >
    
<h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"><a onClick={()=>{navigate('/search')}}> {"<"}    </a>Map</h1>
<p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>

   

<div class="inline-flex rounded-md shadow-sm" role="group">
  <button onClick={()=>{navigate('analytics');
}} type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
    Analytics
  </button>
  <button onClick={()=>{navigate('/user');
}} type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
    Search Parking Spaces
  </button>
 
</div>

   
    </div>
  );
}

export default MapLocations;