import React, { useEffect, useState } from 'react';
import { ChevronLeft, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const navigate = useNavigate();

  // State for user data
  const [user, setUser] = useState({
    name: '',
    mobile: '',
    email: '',
    dob: '',
    image: '',
    address: ''
  });
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch user data from API
  useEffect(() => {
    const fetchUser = async () => {
      const user_id = localStorage.getItem('id');
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/getuser/${user_id}`);
        const userData = response.data.user;
       
        setUser({
          name: userData.first_name,
          email: userData.email1,
          dob: userData.dob,
          mobile: userData.mobile,
          image: userData.image || '',
          address: userData.address,
          id: user_id
        });
        setPreviewImage(userData.image || '');
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        setError('Failed to load user data.');
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setUser({ ...user, profileImage: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  // Handle form submission
  const handleSubmit = async () => {


    const formData = new FormData();
    Object.keys(user).forEach((key) => {
      formData.append(key, user[key]);
    });

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/update/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error('Failed to update user data:', err);
      setError('Failed to update profile.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center p-4 bg-red-600">
        <ChevronLeft className="w-6 h-6 mr-2 text-white" onClick={() => navigate('/')} />
        <h1 className="text-xl text-white">Your Profile</h1>
      </div>

      <div className="max-w-xl mx-auto p-4">
        {/* Profile Avatar */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {previewImage ? (
              <img src={previewImage} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
            ) : (
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-4xl text-blue-600">{user.name.charAt(0)}</span>
              </div>
            )}
            <label className="absolute bottom-0 right-0 p-1 bg-white rounded-full border cursor-pointer">
              {/* <Edit2 className="w-4 h-4 text-gray-600" /> */}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          {['name', 'mobile', 'email', 'dob', 'address'].map((field) => (
            <div key={field}>
              <label className="text-sm text-gray-400 block mb-1 capitalize">{field}</label>
              {field === 'dob' ? (
                <input
                  type="date"
                  value={user.dob}
                  onChange={(e) => setUser({ ...user, dob: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                />
              ) : (
                <input
                  type="text"
                  value={user[field] || ''}
                  onChange={(e) => setUser({ ...user, [field]: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                />
              )}
            </div>
          ))}
        </div>


        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-5 p-3 bg-red-600 text-white rounded-lg"
        >
          Save Changes
        </button>

        {/* Success Message */}
        {successMessage && <div className="text-green-600 mt-3">{successMessage}</div>}
      </div>
    </div>
  );
};

export default UserProfile;
