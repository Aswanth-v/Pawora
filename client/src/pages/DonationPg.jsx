import React, { useState,useEffect } from 'react';
import puppyFace from '../assets/puppy-face.jpg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DonationPg = () => {
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState('');
    const [totalDonation, setTotalDonation] = useState(0); // <-- NEW STATE
  useEffect(() => {
  if (showForm) {
    const timer = setTimeout(() => {
      setShowForm(false); 
      setAmount(''); // optional: clear amount
     
    }, 15000);

    return () => clearTimeout(timer); // clear timer on unmount or re-render
  }
}, [showForm]);


  useEffect(() => {
    const fetchTotalDonation = async () => {
      try {
        const res = await fetch('http://localhost:8800/donationAm', {
          method: 'GET', // you used POST in router, so match that
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        setTotalDonation(data.total_transaction_amount || 0);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTotalDonation();
  }, []);


  const handlePay = async (e) => {
    e.preventDefault();

    if (!amount || amount < 1) {
      toast.error("Please enter a valid amount.");
      return;
    }

    const donationData = {
      amount: amount * 100, // Convert ₹ to paise for Razorpay
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

      const options = {
        key: "rzp_test_oZo1zXbsToytOg",
        amount: donationData.amount,
        currency: "INR",
        name: "Stray Animal Support",
        description: "Donation Payment",
        image: "https://example.com/your_logo",
        order_id: order.id,
        handler: function (response) {
          toast.success("Payment Successful!");
          toast.info(`Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: "Donor",
          email: "donor@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#F59E0B" // amber-500
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        toast.error(`Payment Failed: ${response.error.description}`);
      });
      rzp.open();
    } catch (error) {
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <div className='w-full h-screen flex overflow-y-auto'>
    <ToastContainer />

    {/* Left side: Content */}
    <div className='w-full sm:w-1/2 h-full text-white px-5 lg:px-10 2xl:px-40 overflow-y-auto' style={{ backgroundColor: 'black' }}>
      <section className='flex flex-col gap-10 py-10'>
        <div>
          <p className='mb-6 text-lg text-gray-300'>
            Every day, countless stray animals wander the streets, abandoned, hungry, and exposed to danger...
          </p>

          {!showForm ? (
            <div className='flex gap-4'>
              <button
                className='text-ascent-2 font-bold py-2 px-6 rounded'
                onClick={() => setShowForm(true)}
              >
                DONATE FOR THE CAUSE
              </button>
              <button className='border border-white py-2 px-6 rounded hover:bg-white hover:text-black'>
                LEARN MORE
              </button>
            </div>
          ) : (
            <form onSubmit={handlePay} className='bg-[#967BB6] p-4 rounded shadow text-black mt-4 space-y-4'>
              <label className='block font-medium'>Enter Donation Amount (₹):</label>
              <input
                type='number'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder='e.g. 500'
                min='1'
                className='w-full px-3 py-2 border rounded bg-primary'
                required
              />
              <button type='submit' className='w-full bg-blue-600 py-2 rounded hover:bg-blue-700'>
                Pay Now
              </button>
            </form>
          )}
        </div>
      </section>

     {/* ✅ Donation Progress Section */}
    <div>
        <section className='bg-yellow-500 text-black p-6 rounded-lg mb-10'>
          <div className='flex items-center justify-between mb-2 text-lg font-semibold'>
         <span>Collection: ₹{(totalDonation / 100).toLocaleString()}</span>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-3'>
            <div
              className='bg-black h-3 rounded-full'
              style={{ width: `${Math.min((totalDonation / 100000) * 100, 100)}%` }} // Example goal: ₹1,00,000
            ></div>
          </div>
        </section>
      </div>

    {/* Right side: Image */}
    </div>
    <div
      className='hidden sm:block w-1/2 h-full bg-cover bg-center'
      style={{ backgroundImage: `url(${puppyFace})` }}
    />
  </div>
  );
};

export default DonationPg;  
