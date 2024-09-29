import React from 'react';
import ParkingGraph from './ParkingGraph';
import Header from '../Normal';
import '../App.css'
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { useState } from 'react';
import { Heading,Flex ,Select,Button} from '@chakra-ui/react';

const Graph = () => {
  const [location,setLocation]=useState();

  // const daysOfWeek = Object.keys(parkingData);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location }),
      });

      if (response.ok) {
        const result = await response.json();
        setData(result[0]); 
        console.log(result) // Assuming the response is an array and we want the first element
        setError('');
      } else {
        const errMessage = await response.json();
        setError(errMessage.message || 'Something went wrong');
        setData(null);
      }
    } catch (error) {
      setError('Failed to fetch data');
      setData(null);
    }
  };

  const chartData = data && {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: `Average Traffic for ${location}`,
        data: [
          data.monPerEntry,
          data.tuePerEntry,
          data.wedPerEntry,
          data.thuPerEntry,
          data.friPerEntry,
          data.satPerEntry,
          data.sunPerEntry
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(199, 199, 199, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const handleSubmit = (e) => {
    console.log(location)
    e.preventDefault();
    if (location) {
      fetchData();
    } else {
      setError('Location is required');
    }
  };

  return (
    <div className='px-4 py-6 md:px-8 md:py-12 height:100vh'>
      <Header/>
      <Flex direction={'column'}>
        <Heading marginTop={'20px'} marginBottom={'20px'}>
          Location <span className="text-blue-600 dark:text-blue-500">Wise</span> Trends
        </Heading>
        <div className='dropdown-container'>
        <Flex width="100%" justify="space-between">
          <Select 
            variant='filled' 
            placeholder='Enter Location' 
            width="70%"  // 70% width for the Select
            padding={"none"}
            margin={"0px"}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option className='option' value={'Panaji'}>Panjim</option>
            <option className='option' value={'Porvorim'}>Porvorim</option>
            <option className='option' value={'Vasco'}>Vasco</option>
          </Select>

          <Button 
            width="30%"  // 30% width for the Button
            marginLeft="10px"  // Adds space between the Select and Button
            onClick={handleSubmit}
            
          >
            Get Data
          </Button>
          
        </Flex>
       </div>

        
      </Flex>
      {/* <h1>Parking Lot Data - Weekly Overview</h1>
      {daysOfWeek.map((day) => (
        <div key={day}>
          <h2>{day}</h2>
          <ParkingGraph data={parkingData[day]} day={day} />
        </div>
      ))} */}
       {error && <p style={{ color: 'red' }}>{error}</p>}

      {data && (
        <div style={{ marginTop: '30px' }}>
          <h2 style={{ marginBottom: '20px',color:'blue',fontWeight: 'bold' }}>Traffic Data for {location}</h2>
          <Bar data={chartData}  />
        </div>
      )}

      
    </div>
  );
};

export default Graph;
