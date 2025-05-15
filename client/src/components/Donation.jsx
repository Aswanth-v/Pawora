import React from 'react';
import { Link } from 'react-router-dom';

const Donation = () => {
  return (
    <div className='flex items-center justify-center rounded '>
      <Link
        to='/DonationPg'
        className='text-ascent-1 font-semibold px-4 py-2 rounded hover:bg-[#00ff0045] hover:text-ascent-1 transition'
      >
        Donate
      </Link>
    </div>
  );
};

export default Donation;
