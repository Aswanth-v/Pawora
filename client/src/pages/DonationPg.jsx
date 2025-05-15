import React from 'react';
import puppyFace from '../assets/puppy-face.jpg';

const DonationPg = () => {
  return (
    <div className='w-full h-screen flex overflow-y-auto'>

      {/* Left side: Content with black background */}
      <div className='w-1/2 h-full bg-secondary text-white px-5 lg:px-10 2xl:px-40 overflow-y-auto'
       style={{ backgroundColor: 'black' }}>
        {/* Hero Section */}
        <section className='flex flex-col gap-10 py-10'>
          <div>
            <p className='mb-6 text-lg text-gray-300 text-ascent-2 mt-0.5'>
              Every day, countless stray animals wander the streets, abandoned, hungry, and exposed to danger. These innocent lives face harsh conditions — battling extreme weather, starvation, injuries, and disease — with no one to care for them. Often the result of neglect, overpopulation, and a lack of public awareness, the stray animal crisis is a growing concern that cannot be ignored. It is not just the responsibility of animal welfare groups; it is a cause that calls for all of us to step forward. By supporting rescue initiatives, adopting instead of buying, and spreading awareness, we can create a world where every animal is safe, loved, and protected. Together, we can be their voice.
            </p>
            <div className='flex gap-4'>
            <button
  className="bg-yellow-500 hover:bg-green-600 text-black font-bold py-2 px-6 rounded"
   style={{ backgroundColor: 'transparent', ':hover': { backgroundColor: 'green' } }}
  onClick={() => {
    console.log("donation");
  }}
>
  DONATE FOR THE CAUSE
</button>

              <button className='border border-white py-2 px-6 rounded hover:bg-white hover:text-black'>
                LEARN MORE
              </button>
            </div>
          </div>
        </section>

        {/* Progress Section */}
        <section className='bg-yellow-500 text-black p-6 rounded-lg mb-10'>
          <div className='flex items-center justify-between mb-2 text-lg font-semibold'>
            <span>Collection: $8000</span>
          
          </div>
          <div className='w-full bg-gray-200 rounded-full h-3'>
            <div className='bg-black h-3 rounded-full' style={{ width: '80%' }}></div>
          </div>
        </section>

        {/* Additional Cause Card */}

      </div>

      {/* Right side: Background image */}
      <div
        className='w-1/2 h-full bg-cover bg-center'
        style={{ backgroundImage: `url(${puppyFace})` }}
      />
    </div>
  );
};

export default DonationPg;
