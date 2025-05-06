import React from 'react';
import { Link } from 'react-router-dom';

const Donation = () => {
  return (
    <div className='flex items-center justify-center rounded border p-2 border-[#00ff0045]'>
      <Link
        to='/DonationPg'
        className='text-ascent-2 font-semibold px-4 py-2 rounded hover:bg-[#00ff0045] hover:text-ascent-1 transition'
      >
        Donate
      </Link>
    </div>
  );
};

export default Donation;
