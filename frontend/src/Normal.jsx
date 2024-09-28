import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@chakra-ui/react'
function Header() {
  const [showNav, setNav] = useState(false);
    const navigate=useNavigate()
  return (
    // <header className="top-0 right-0 w-full z-50 ">
    //   <div className="text-center">
    //    <div className="flex justify-start p-4">  {/* Flex container and align to right */}
    //     <button
    //       onClick={() => setNav(true)}
    //       className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    //       type="button"
    //       aria-controls="drawer-navigation"
    //     >
    //      Menu
    //     </button>
    //   </div>
    //   </div>

    //   {showNav && (
    //     <div
    //       id="drawer-navigation"
    //       className="fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800"
    //       tabIndex="-1"
    //       aria-labelledby="drawer-navigation-label"
    //     >
    //       <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
    //         Menu
    //       </h5>
    //       <button
    //         type="button"
    //         onClick={() => setNav(false)} // Close the navigation
    //         aria-controls="drawer-navigation"
    //         className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
    //       >
    //         <svg
    //           aria-hidden="true"
    //           className="w-5 h-5"
    //           fill="currentColor"
    //           viewBox="0 0 20 20"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path
    //             fillRule="evenodd"
    //             d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
    //             clipRule="evenodd"
    //           ></path>
    //         </svg>
    //         <span className="sr-only">Close menu</span>
    //       </button>
    //       <div className="py-4 overflow-y-auto">
    //         <ul className="space-y-2 font-medium">
    //           <li>
    //             <a
    //               href="#"
    //               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" 
    //               onClick={() => {
    //                 setNav(false); // Close the navigation
    //                 navigate('/analytics'); // Redirect to /analytics
    //               }}
    //             >
    //               <svg
    //                 className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
    //                 aria-hidden="true"
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 fill="currentColor"
    //                 viewBox="0 0 22 21"
    //               >
    //                 <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
    //                 <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
    //               </svg>
    //             <span className="ml-3"  >Analytics</span>
                  
    //             </a>
    //           </li>

    //            <li>
    //             <a
    //               href="#"
    //               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" 
    //               onClick={() => {
    //                 setNav(false); // Close the navigation
    //                 navigate('/search'); // Redirect to /analytics
    //               }}
    //             >
    //               <svg
    //                 className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
    //                 aria-hidden="true"
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 fill="currentColor"
    //                 viewBox="0 0 22 21"
    //               >
    //                 <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
    //                 <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
    //               </svg>
    //             <span className="ml-3"  >Search</span>
                  
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   )}
    // </header>
    <header>
        



<Breadcrumb >
  <BreadcrumbItem >
    <BreadcrumbLink color={'blue'}  href='/'>Home</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem  >
    <BreadcrumbLink href='/user'>User</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem  >
    <BreadcrumbLink href='/analytics'>Analytics</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>




    </header>
  );
}

export default Header;
