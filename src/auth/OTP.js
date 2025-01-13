import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const OTP = () => {
  const [otp, setOtp] = useState('');
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  // Using useLocation to get the email from URL
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get('email'); // Retrieve the email from the URL

  // Create refs for each input field
  const confirmPinRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  // Handle OTP input
  const handleInputChange = (e, index, refs) => {
    const value = e.target.value;

    // Ensure only numbers are allowed
    if (!/^\d*$/.test(value)) {
      e.target.value = ''; // Clear invalid input
      return;
    }

    // Update OTP state
    const newOtp = otp.split(''); // Convert string to array
    newOtp[index] = value; // Update the current index with the entered value
    setOtp(newOtp.join(''));

    // Move focus to the next input if a number is entered
    if (value.length === 1 && index < refs.length - 1) {
      refs[index + 1].current.focus();
    }

    // Move focus back on backspace
    if (e.key === 'Backspace' && index > 0 && value.length === 0) {
      refs[index - 1].current.focus();
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP.');
      return;
    }
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('otp', otp);
      formDataToSend.append('email', email);

      await axios.post(`${apiBaseUrl}/otp`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success("OTP verified successfully");
      navigate(`/ChangePassword?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Error verifying OTP, please try again.');
    }
  };

  // Handle paste event for pasting the entire OTP
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    confirmPinRefs.forEach((ref, i) => {
      ref.current.value = pastedData[i] || '';
    });

    // Update OTP state
    setOtp(pastedData);

    // Move focus to the last input field if pasted data is complete
    confirmPinRefs[pastedData.length - 1]?.current.focus();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 2xl:w-1/4">
        

        <form className="space-y-4 " onSubmit={handleSubmit}>

        <div className="text-center mb-6 h-15  rounded bg-red-600">
          <img
            src="/logo1.png"
            alt="Logo"
            className="mx-auto mb-4 w-40 max-w-xs md:max-w-md lg:max-w-lg py-2"
          />
        </div>
          <p className="text-center text-lg font-semibold text-gray-800 mb-4">Enter Your OTP</p>

          {/* OTP Input Fields */}
          <div className="flex justify-between gap-2 sm:gap-4 mb-6">
            {confirmPinRefs.map((ref, index) => (
              <input
                key={index}
                type="text"
                className="w-10 h-10 text-center text-2xl border border-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                maxLength="1"
                ref={ref}
                onKeyUp={(e) => handleInputChange(e, index, confirmPinRefs)}
                onPaste={handlePaste} // Handle paste event
                required
              />
            ))}
          </div>
          <div className="d-flex justify-content-end mb-1">
                            <button to="/forgot-password" className="text-danger text-decoration-none">
                                Resend OTP
                            </button>
                        </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-red-600 text-white rounded-md hover:bg-red-600 focus:outline-none disabled:opacity-50"
            disabled={otp.length !== 6}
          >
            Validate OTP
          </button>
         
        </form>
      </div>
    </div>
  );
};

export default OTP;
