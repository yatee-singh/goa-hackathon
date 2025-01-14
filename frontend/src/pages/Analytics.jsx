import BookTickets from "./BookTickets";
import Desp from "./Desp";
import Header from "../Normal";
import { useNavigate } from 'react-router-dom';

function Analytics() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/booking');
  };

  return (
    <div className="px-4 py-6 md:px-8 md:py-12 height:100vh">
      <Header/>
      <h1 className="mb-4 mt-56 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
      Analyti<span className="text-blue-600 dark:text-blue-500 font-bold">cs</span>
      </h1>
      <p className="text-base font-normal text-gray-500 lg:text-lg dark:text-gray-400 px-6">
      Unlock the power of data to enhance decision-making and drive operational efficiency. 
      </p>

      {/* Button group with responsive layout */}
      <div className="inline-flex flex-col md:flex-row rounded-md shadow-sm mt-6" role="group">
        <button
          onClick={() => { navigate('/pol'); }}
          type="button"
          className="mb-2 md:mb-0 md:mr-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Police Deployment Predictor
        </button>
        {/* <button
          onClick={() => { navigate('/analytics'); }}
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
        Probability of getting a parking space
        </button> */}

         <button
          onClick={() => { navigate('/graph'); }}
          type="button"
          className="px-4 py-2 mb-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Location Based Analytics
        </button>

        <button
          onClick={() => { navigate('/new'); }}
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Suggest New Parking Spaces 
        </button>
      </div>
    </div>
  );
}

export default Analytics;
