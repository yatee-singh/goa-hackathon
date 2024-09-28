import React from 'react';
import ParkingGraph from './ParkingGraph';
import Header from '../Normal';

const Graph = () => {
  const parkingData = {
    Monday: [
      { lot: "Bicholim", cars: 100 },
      { lot: "Calangute", cars: 500 }, // Popular beach area
      { lot: "Mopa", cars: 350 }, // Airport, consistent traffic
      { lot: "Anjuna", cars: 400 }, // Popular for tourists
      { lot: "Porvorim", cars: 200 },
      { lot: "Panaji", cars: 450 }, // Capital, high traffic
      { lot: "Mapusa", cars: 300 },
      { lot: "Dabolim", cars: 300 },
      { lot: "Quepem", cars: 150 },
      { lot: "Cacacona", cars: 180 },
      { lot: "Colva", cars: 200 },
      { lot: "Vasco", cars: 350 },
      { lot: "Curchorem", cars: 120 },
      { lot: "Margao", cars: 280 },
    ],
    Tuesday: [
      { lot: "Bicholim", cars: 150 },
      { lot: "Calangute", cars: 550 },
      { lot: "Mopa", cars: 380 },
      { lot: "Anjuna", cars: 420 },
      { lot: "Porvorim", cars: 220 },
      { lot: "Panaji", cars: 480 },
      { lot: "Mapusa", cars: 350 },
      { lot: "Dabolim", cars: 320 },
      { lot: "Quepem", cars: 180 },
      { lot: "Cacacona", cars: 200 },
      { lot: "Colva", cars: 250 },
      { lot: "Vasco", cars: 320 },
      { lot: "Curchorem", cars: 130 },
      { lot: "Margao", cars: 300 },
    ],
    Wednesday: [
      { lot: "Bicholim", cars: 180 },
      { lot: "Calangute", cars: 600 },
      { lot: "Mopa", cars: 400 },
      { lot: "Anjuna", cars: 450 },
      { lot: "Porvorim", cars: 250 },
      { lot: "Panaji", cars: 500 },
      { lot: "Mapusa", cars: 400 },
      { lot: "Dabolim", cars: 350 },
      { lot: "Quepem", cars: 200 },
      { lot: "Cacacona", cars: 220 },
      { lot: "Colva", cars: 280 },
      { lot: "Vasco", cars: 380 },
      { lot: "Curchorem", cars: 140 },
      { lot: "Margao", cars: 350 },
    ],
    Thursday: [
      { lot: "Bicholim", cars: 220 },
      { lot: "Calangute", cars: 650 },
      { lot: "Mopa", cars: 420 },
      { lot: "Anjuna", cars: 480 },
      { lot: "Porvorim", cars: 280 },
      { lot: "Panaji", cars: 550 },
      { lot: "Mapusa", cars: 450 },
      { lot: "Dabolim", cars: 400 },
      { lot: "Quepem", cars: 250 },
      { lot: "Cacacona", cars: 250 },
      { lot: "Colva", cars: 300 },
      { lot: "Vasco", cars: 400 },
      { lot: "Curchorem", cars: 180 },
      { lot: "Margao", cars: 380 },
    ],
    Friday: [
      { lot: "Bicholim", cars: 280 },
      { lot: "Calangute", cars: 750 }, // Friday increase in popular spots
      { lot: "Mopa", cars: 500 },
      { lot: "Anjuna", cars: 550 },
      { lot: "Porvorim", cars: 320 },
      { lot: "Panaji", cars: 600 },
      { lot: "Mapusa", cars: 480 },
      { lot: "Dabolim", cars: 450 },
      { lot: "Quepem", cars: 280 },
      { lot: "Cacacona", cars: 300 },
      { lot: "Colva", cars: 350 },
      { lot: "Vasco", cars: 480 },
      { lot: "Curchorem", cars: 220 },
      { lot: "Margao", cars: 450 },
    ],
    Saturday: [
      { lot: "Bicholim", cars: 350 },
      { lot: "Calangute", cars: 850 }, // High rush at beaches
      { lot: "Mopa", cars: 550 },
      { lot: "Anjuna", cars: 650 }, // Increased tourist traffic
      { lot: "Porvorim", cars: 380 },
      { lot: "Panaji", cars: 750 },
      { lot: "Mapusa", cars: 600 },
      { lot: "Dabolim", cars: 500 },
      { lot: "Quepem", cars: 350 },
      { lot: "Cacacona", cars: 400 },
      { lot: "Colva", cars: 450 },
      { lot: "Vasco", cars: 550 },
      { lot: "Curchorem", cars: 300 },
      { lot: "Margao", cars: 550 },
    ],
    Sunday: [
      { lot: "Bicholim", cars: 300 },
      { lot: "Calangute", cars: 900 }, // Peak tourist traffic
      { lot: "Mopa", cars: 600 },
      { lot: "Anjuna", cars: 800 },
      { lot: "Porvorim", cars: 400 },
      { lot: "Panaji", cars: 850 },
      { lot: "Mapusa", cars: 700 },
      { lot: "Dabolim", cars: 650 },
      { lot: "Quepem", cars: 400 },
      { lot: "Cacacona", cars: 500 },
      { lot: "Colva", cars: 600 },
      { lot: "Vasco", cars: 650 },
      { lot: "Curchorem", cars: 350 },
      { lot: "Margao", cars: 650 },
    ],
  };
  


  const daysOfWeek = Object.keys(parkingData);

  return (
    <div className='px-4 py-6 md:px-8 md:py-12 height:100vh'>
      <Header/>
      <h1>Parking Lot Data - Weekly Overview</h1>
      {daysOfWeek.map((day) => (
        <div key={day}>
          <h2>{day}</h2>
          <ParkingGraph data={parkingData[day]} day={day} />
        </div>
      ))}
    </div>
  );
};

export default Graph;
