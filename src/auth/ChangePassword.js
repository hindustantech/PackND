import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';

const ChangePassword = () => {
  const [formData, setFormData] = useState({ newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get('email');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      setLoading(false);
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    

    if (!passwordRegex.test(formData.newPassword)) {
      toast.error('Password must be at least 8 characters long and contain both letters and numbers.');
      setLoading(false);
      return;
    }


    try {
      const resetPasswordData = new FormData();
      resetPasswordData.append('email', email);
      resetPasswordData.append('newPassword', formData.newPassword);

      await axios.post(`${apiBaseUrl}/reset_password`, resetPasswordData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Password reset successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Error resetting password, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 2xl:w-1/4">
        <div className="text-center mb-6 bg-red-500 py-1 rounded">
          <img
            src="/logo1.png"
            alt="Logo"
            className="mx-auto max-w-xs w-40 md:max-w-md lg:max-w-lg"
          />
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <p className="text-center text-lg font-semibold text-gray-800 mb-4">
            Change Your Password
          </p>

          {/* New Password Input */}
          <div className="mb-4 relative">
            <input
              type={showNewPassword ? "text" : "password"}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-500 focus:outline-none"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <Eye className="h-5 w-5" />

              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4 relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-500 focus:outline-none"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (

                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </button>
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