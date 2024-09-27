
import BookTickets from "./BookTickets";
import Desp from "./Desp";
import Header from "./Header";
import { Button } from "@chakra-ui/react";
//import Button from 'react-bootstrap/Button';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
function Roote() {

 
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/booking');

  };
  return (
    <div >
    
<h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Route</h1>



   
    </div>
  );
}

export default Roote;