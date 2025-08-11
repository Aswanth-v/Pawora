import React, { useState, useEffect } from "react";
import puppyFace from "../assets/puppy-face.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountUp from "../components/Countup";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
const DonationPg = () => {
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState("");
  const [totalDonation, setTotalDonation] = useState(0);

  useEffect(() => {
    if (showForm) {
      const timer = setTimeout(() => {
        setShowForm(false);
        setAmount("");
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [showForm]);

  // 🔹 Reusable fetch function
  const fetchTotalDonation = async () => {
    try {
      const res = await fetch("http://localhost:8800/donationAm");
      const data = await res.json();
      setTotalDonation(data.total_transaction_amount || 0);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTotalDonation(); // initial load
  }, []);

  const handlePay = async (e) => {
    e.preventDefault();

    if (!amount || amount < 1) {
      toast.error("Please enter a valid amount.");
      return;
    }

    const donationData = {
      amount: amount * 100, // Convert ₹ to paise
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 1,
    };

    try {
      const response = await fetch("http://localhost:8800/donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

          // 🔹 Fetch updated total instantly
          fetchTotalDonation();
        },
        prefill: {
          name: "Donor",
          email: "donor@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F59E0B",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        toast.error(`Payment Failed: ${response.error.description}`);
      });
      rzp.open();
    } catch (error) {
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

return (
  <div className="w-full h-screen flex overflow-y-auto">
    <ToastContainer />

    {/* Left side: Content */}
    <div
      className="w-full sm:w-1/2 h-full text-white px-6 lg:px-12 2xl:px-28 overflow-y-auto"
      style={{ backgroundColor: "black" }}
    >
      <section className="flex flex-col gap-8 py-12">

        {/* Intro Text */}
        <p className="text-lg text-gray-300 leading-relaxed">
          Every day, countless stray animals struggle to survive — searching for food, shelter,
          and a little kindness. Your support can be the difference between a life of suffering
          and a chance at safety, care, and love.
        </p>

        {/* Buttons / Form */}
        {!showForm ? (
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              ❤️ DONATE
            </button>
            <button className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              ℹ️ LEARN MORE
            </button>
          </div>
        ) : (
          <form
            onSubmit={handlePay}
            className="bg-gradient-to-br from-[#967BB6] to-purple-700 p-6 rounded-xl shadow-lg text-white space-y-5"
          >
            <label className="block font-semibold text-lg tracking-wide">
              Enter Donation Amount (₹):
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 500"
              min="1"
              className="w-full px-4 py-2 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-white bg-white/10 placeholder-white/60 text-white"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 py-2.5 rounded-lg text-lg font-semibold shadow-md transition-all duration-200 hover:scale-105"
            >
              💖 Pay Now
            </button>
          </form>
        )}

        {/* Donation Progress */}
        <section className="bg-yellow-500 text-black p-6 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-baseline gap-2">
              <span className="text-xl md:text-2xl font-bold tracking-wide text-gray-700">
                Collection:
              </span>
              <CountUp
                from={0}
                to={totalDonation / 100}
                separator=","
                duration={1}
                className="gradient-text countup-animate font-extrabold text-3xl md:text-4xl leading-none"
              />
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-black h-3 rounded-full"
              style={{
                width: `${Math.min((totalDonation / 100000) * 100, 100)}%`,
              }}
            ></div>
          </div>
        </section>

        {/* Home Button */}
        <div className="flex justify-center">
          <Link
            to="/"
            className="relative inline-flex items-center px-6 py-3 overflow-hidden font-bold text-white rounded-full shadow-lg group bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 transition-all duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            🏠 Home Page
          </Link>
        </div>

      </section>
    </div>

    {/* Right side: Image */}
    <div
      className="hidden sm:block w-1/2 h-full bg-cover bg-center"
      style={{ backgroundImage: `url(${puppyFace})` }}
    />
  </div>
);

};

export default DonationPg;
