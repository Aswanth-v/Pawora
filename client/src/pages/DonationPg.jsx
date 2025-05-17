import React from 'react';
import puppyFace from '../assets/puppy-face.jpg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DonationPg = () => {

  const DonationHandler = async (e) => {
    e.preventDefault();

    const donationData = {
      amount: 50000,
      currency: 'INR',
      receipt: 'receipt#1',
      payment_capture: 1,
    };

    try {
      const response = await fetch('http://localhost:8800/donation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });

      const order = await response.json();
      const { amount, currency } = donationData;

      const options = {
        key: "rzp_test_oZo1zXbsToytOg",
        amount,
        currency,
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id,
        handler: function (response) {
          toast.success(`Payment Successful!`);
          toast.info(`Payment ID: ${response.razorpay_payment_id}`);
          toast.info(`Order ID: ${response.razorpay_order_id}`);
          toast.info(`Signature: ${response.razorpay_signature}`);
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000"
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        toast.error(`Payment Failed: ${response.error.description}`);
      });

      rzp1.open();

    } catch (err) {
      toast.error("Failed to initiate donation. Please try again.");
    }
  };

  return (
    <div className='w-full h-screen flex overflow-y-auto'>
      {/* Toast container (important!) */}
      <ToastContainer />

      {/* Left side: Content */}
      <div className='w-1/2 h-full text-white px-5 lg:px-10 2xl:px-40 overflow-y-auto' style={{ backgroundColor: 'black' }}>
        <section className='flex flex-col gap-10 py-10'>
          <div>
            <p className='mb-6 text-lg text-gray-300'>
               Every day, countless stray animals wander the streets, abandoned, hungry, and exposed to danger. These innocent lives face harsh conditions — battling extreme weather, starvation, injuries, and disease — with no one to care for them...
            </p>
            <div className='flex gap-4'>
              <button
                className='bg-yellow-500 hover:bg-green-600 text-black font-bold py-2 px-6 rounded'
                onClick={DonationHandler}
              >
                DONATE FOR THE CAUSE
              </button>

              <button className='border border-white py-2 px-6 rounded hover:bg-white hover:text-black'>
                LEARN MORE
              </button>
            </div>
          </div>
        </section>

        {/* Donation Progress Section */}
        <section className='bg-yellow-500 text-black p-6 rounded-lg mb-10'>
          <div className='flex items-center justify-between mb-2 text-lg font-semibold'>
            <span>Collection: ₹8000</span>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-3'>
            <div className='bg-black h-3 rounded-full' style={{ width: '80%' }}></div>
          </div>
        </section>
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
