import React from 'react';

const DonationPg = () => {
  return (
    <div className='home w-full px-5 lg:px-10 2xl:px-40 bg-secondary text-white h-screen overflow-y-auto'>
      {/* Hero Section */}
      <section className='flex flex-col lg:flex-row items-center gap-10 py-10'>
        <div className='flex-1'>
          <h1 className='text-4xl font-bold mb-4 text-[#8B4FB3] '>CHILD NUTRITION DEFICIENCY</h1>
          <p className='mb-6 text-lg text-gray-300 text-ascent-2'>
            Child nutrition deficiency has been caused by severe problems in different African countries.
            Children are not getting enough nutrition to grow their body and minds.
          </p>
          <div className='flex gap-4'>
            <button className='bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded'>
              DONATE FOR THE CAUSE
            </button>
            <button className='border border-white py-2 px-6 rounded hover:bg-white hover:text-black'>
              LEARN MORE
            </button>
          </div>
        </div>
        <div className='flex-1'>
          <img
            src='https://i.pinimg.com/736x/ff/25/a6/ff25a6e70a261415ca91b167348e1124.jpg' // Replace with actual image path
            alt='Child'
            className='rounded-lg w-full object-cover'
          />
        </div>
      </section>

      {/* Progress Section */}
      <section className='bg-yellow-500 text-black p-6 rounded-lg mb-10'>
        <div className='flex items-center justify-between mb-2 text-lg font-semibold'>
          <span>Collection: $8000</span>
          <span>Goal: $10,000</span>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-3'>
          <div className='bg-black h-3 rounded-full' style={{ width: '80%' }}></div>
        </div>
      </section>

      {/* Additional Cause Card */}
      <section className='flex items-center justify-between bg-gray-900 p-4 rounded-lg'>
        <div>
          <h2 className='text-xl font-bold mb-1'>HOME FACILITY FOR OLD AGE PEOPLE</h2>
          <a href='#' className='text-yellow-400 font-medium hover:underline'>
            READ MORE
          </a>
        </div>
        <img
          src='/path-to-elder-image.jpg' // Replace with actual image path
          alt='Old age home'
          className='w-24 h-24 object-cover rounded'
        />
      </section>
    </div>
  );
};

export default DonationPg;

