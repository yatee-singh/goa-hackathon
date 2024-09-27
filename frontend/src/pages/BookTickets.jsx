import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookTickets = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/booking');
  };

  return (
    <button onClick={handleClick}>
      Book Tickets
    </button>
  );
};

export default BookTickets;
