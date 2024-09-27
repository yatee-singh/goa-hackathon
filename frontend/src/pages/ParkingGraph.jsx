import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ParkingGraph = ({ data, day }) => {
  // Map parking lot names and cars data for the chart
  const parkingLots = data.map((item) => item.lot);
  const carsData = data.map((item) => item.cars);

  const chartData = {
    labels: parkingLots, // Parking lot names as labels
    datasets: [
      {
        label: `Cars parked on ${day}`,
        data: carsData, // Number of cars for each parking lot
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default ParkingGraph;
