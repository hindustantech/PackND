import React, { useState } from "react";

const OtpLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const generateAndSaveOTP = async () => {
    if (!phoneNumber) {
      setMessage("Please enter a phone number.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://projectdemo.ukvalley.com/api/generateAndSaveOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("OTP sent successfully!");
      } else {
        setMessage(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-500 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background food elements */}
      {/* <div className="absolute top-4 left-4 transform -rotate-12">
        <div className="w-12 h-12 bg-red-600 rounded-full"></div>
      </div>
      <div className="absolute bottom-16 right-8">
        <div className="w-16 h-16 bg-green-500 rounded-full transform rotate-45"></div>
      </div>
      <div className="absolute top-1/4 right-8">
        <div className="w-10 h-10 bg-red-600 rounded-full"></div>
      </div>
      <div className="absolute bottom-1/3 left-6">
        <div className="w-14 h-14 bg-green-400 rounded-full"></div>
      </div> */}

      {/* Main content container */}
      <div className="w-full max-w-md flex flex-col items-center z-10">
        {/* Header text */}
        <div className="text-center mb-6">
          <h2 className="text-white text-2xl font-bold mb-1">Nashik's No.1 Meal Service!</h2>
          <div className="mb-2">
            <img src="/logo1.png" alt="PacknD Logo" className="h-12 mx-auto" />
          </div>
          <p className="text-white text-xl font-medium">Fresh, Fast & Delicious</p>
        </div>

        {/* Food boxes - visible on larger screens */}
        <div className="w-full grid grid-cols-3 gap-4 mb-8 px-4">
          <div className="bg-black rounded-lg overflow-hidden h-32 md:h-40 transform -rotate-6">
            <img src="/api/placeholder/150/150" alt="Food box" className="w-full h-full object-cover" />
          </div>
          <div className="bg-black rounded-lg overflow-hidden h-32 md:h-40 transform translate-y-4">
            <img src="/api/placeholder/150/150" alt="Food box" className="w-full h-full object-cover" />
          </div>
          <div className="bg-black rounded-lg overflow-hidden h-32 md:h-40 transform rotate-6">
            <img src="/api/placeholder/150/150" alt="Food box" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Login form */}
        <div className="w-full mt-4 md:mt-8">
          <h1 className="text-white text-4xl font-bold text-center mb-2">Log in or sign up</h1>
          <p className="text-white text-xl text-center mb-6">Enter phone or email to continue</p>

          <div className="mb-4">
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="Phone number"
              className="w-full px-2 py-1 rounded-lg bg-pink-50 text-gray-700 text-lg focus:outline-none"
            />
          </div>

          <button
            onClick={generateAndSaveOTP}
            disabled={loading}
            className="w-full bg-white text-red-500 font-bold text-xl rounded-lg py-1 mb-2 hover:bg-gray-100 transition duration-300"
          >
            {loading ? "Sending OTP..." : "Get OTP"}
          </button>

          {message && <p className="text-white text-center">{message}</p>}

          <div className="flex items-center justify-center mb-6">
            <div className="flex-1 h-px bg-white/40"></div>
            <div className="px-4 text-white text-lg">OR</div>
            <div className="flex-1 h-px bg-white/40"></div>
          </div>

          

          <p className="text-white text-center text-sm">
            By creating an account, you agree to our Terms of Service & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpLogin;
