import React, { useState } from 'react';
import axios from 'axios';
import Header from "../Normal";
function Pay() {
  const [formData, setFormData] = useState({
    username: '',
    useremail: '',
    userphone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Call the displayRazorpay function after the form is submitted
    displayRazorpay();
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }
    
    console.log('Razorpay script loaded successfully.');
    
    try {
      const result = await axios.post('http://localhost:3000/payment/orders');
      console.log('Order creation result:', result);
      
      const { amount, id: order_id, currency } = result.data || {};
      
      if (!amount || !order_id || !currency) {
        console.error('Invalid order data:', result.data);
        alert('Failed to retrieve valid order data.');
        return;
      }
      
      const options = {
        key: 'rzp_test_Iiy1obECRwNbCn', // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: formData.username, // Use the username from the form
        description: 'Test Transaction',
        order_id: order_id,
        handler: async function (response) {
          console.log('Payment successful:', response);
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            userPhoneNumber: formData.userphone,
          };
          
          const result = await axios.post('http://localhost:3000/payment/success', data);
          alert(result.data.msg);
        },
        prefill: {
          name: formData.username, // Prefill with username from the form
          email: formData.useremail, // Prefill with email from the form
          contact: formData.userphone, // Prefill with phone from the form
        },
        theme: {
          color: '#61dafb',
        },
      };
      
      console.log('Razorpay options:', options);
      
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error in displayRazorpay:', error);
      alert('Something went wrong with the payment. Please try again.');
    }
  }

  return (
    
    <header>
      <Header/>
  <h1 className="mb-4 mt-56 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
    Personal Detai<span className="text-blue-600 dark:text-blue-500">ls</span>
  </h1>

  <form
    onSubmit={handleSubmit}
    className="flex flex-col max-w-md mx-auto bg-white  rounded-lg p-6 mt-4" // Added Tailwind classes for styling
  >
    <label className="mb-2 font-medium text-gray-700"> 
      Name:  
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // Input styles
      />
    </label>
    
    <label className="mb-2 font-medium text-gray-700">
      Email:
      <input
        type="email"
        name="useremail"
        value={formData.useremail}
        onChange={handleChange}
        required
        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // Input styles
      />
    </label>

    <label className="mb-2 font-medium text-gray-700">
      Contact:
      <input
        type="tel"
        name="userphone"
        value={formData.userphone}
        onChange={handleChange}
        required
        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // Input styles
      />
    </label>

    <button
      type="submit"
      className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200 mt-4" // Button styles
    >
      Pay
    </button>
  </form>
</header>

  );
}

export default Pay;
