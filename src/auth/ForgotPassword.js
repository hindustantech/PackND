import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ChevronLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For handling errors
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError(null); // Reset error when user changes the email input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${apiBaseUrl}/forgotpassword`, { email });

      toast.success('OTP sent successfully to your email!');
      navigate(`/OTP?email=${encodeURIComponent(email)}`);
    } catch (error) {

      setError('Failed to send OTP. Please check your email.');
      toast.error('Failed to send OTP. Please check your email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 px-2">


        <form
          className=" p-8 bg-white  w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4"
          onSubmit={handleSubmit}
        >
          <div className="text-center d-flex  py-2  bg-red-600 rounded w-full  aling-items-center justify-center">

            <img
              src="/logo1.png"
              alt="Forgot Password"
              className="mx-auto  max-w-xs md:max-w-md lg:max-w-lg w-40 h-8 "
            />
          </div>

          <h2 className=" mt-2 text-2xl font-semibold text-center text-gray-800 mb-6">Forgot Password</h2>

          {/* Error message */}
          {error && (
            <div className="text-red-500 text-sm mb-4">
              <p>{error}</p>
            </div>
          )}

          <div className="mb-4">
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              name="email"
              placeholder="Enter Your Email"
              onChange={handleChange}
              value={email}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-md focus:outline-none hover:bg-red-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 0114.93-4.93 7.963 7.963 0 010 9.86A8 8 0 014 12z"
                  ></path>
                </svg>
                Sending...
              </div>
            ) : (
              'Change Password'
            )}
          </button>
          <div className='text-red-600 text-center mt-2' onClick={() => { navigate('/login') }}> Back to Sign in</div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
