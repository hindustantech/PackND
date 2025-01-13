import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const [formData, setFormData] = useState({ newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  
  // Using useLocation to get the email from URL
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get('email');
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for resetting password
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if the passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      setLoading(false);
      return;
    }

    try {
      const resetPasswordData = new FormData();
      resetPasswordData.append('email', email);
      resetPasswordData.append('newPassword', formData.newPassword);

      // API call to reset the password
      await axios.post(`${apiBaseUrl}/reset_password`, resetPasswordData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Password reset successfully!');
      navigate('/Login');
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('Error resetting password, please try again.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 2xl:w-1/4">
        <div className="text-center mb-6 bg-red-500 py-1  rounded">
          <img
            src="/logo1.png"
            alt="Logo"
            className="mx-auto  max-w-xs w-40   md:max-w-md lg:max-w-lg"
          />
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <p className="text-center text-lg font-semibold text-gray-800 mb-4">Change Your Password</p>

          {/* New Password Input */}
          <div className="mb-4">
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4">
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Changing Password...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
