import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Normal';

function User() {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-6 md:px-8 md:py-12">
      <Header/>
      <h1 className="mb-4 mt-56 text-3xl md:text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white text-center">
        User
      </h1>
      <p className="text-base md:text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-center">
      Easily find your next parking spot with <span className="text-blue-600 dark:text-blue-500">Search Parking Space</span> and get real-time updates on <span className="text-blue-600 dark:text-blue-500">Availability </span>at your fingertips. Stay informed and navigate effortlessly, making every moment in Goa enjoyable!
      </p>

      <div className="inline-flex rounded-md shadow-sm flex flex-col md:flex-row justify-center mt-6" role="group">
        <button 
          onClick={() => { navigate('/avail'); }} 
          type="button" 
          className="mb-2 md:mb-0 md:mr-2 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
        Predict Availability
        </button>
        <button 
          onClick={() => { navigate('/search'); }} 
          type="button" 
          className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Search Parking Spaces
        </button>
      </div>
    </div>
  );
}

export default User;
