import React, { useEffect, useState } from 'react';
import { ChevronRight, Edit2 } from 'lucide-react';
import Nav from './Nav';

const Profile = () => {
  const [UserData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const user_id = localStorage.getItem("id");
  const getUser = async () => {
    try {
      // Ensure "id" is a string
      if (!user_id) {
        throw new Error("User ID not found in localStorage.");
      }

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/getuser/${user_id}`);

      if (!response.ok) {
        throw new Error(`Unexpected response status: ${response.status}`);
      }

      const data = await response.json(); // Parse JSON once
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      throw error; // Rethrow for the calling function to handle
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUser();
        setUserData(data.user);
       
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="min-vh-100 bg-light">
      {/* Profile Header */}
      <div
        className="bg-dark text-center text-white py-4 mb-4"
        style={{ borderRadius: '0 0 25px 25px' }}
      >
        <div
          className="position-relative mx-auto"
          style={{ width: '96px', height: '96px', marginBottom: '1rem' }}
        >
          <div className="rounded-circle border border-warning overflow-hidden position-relative w-100 h-100">
            <img
              src="/meal.png"
              alt="Profile"
              className="w-100 h-100 object-fit-cover"
            />
          </div>
        </div>
        <div className="text-warning small mb-2">Gold Member</div>
        <h1 className="h5">Hello, {UserData.first_name}!</h1>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="bg-light p-3 mb-3 d-flex justify-content-between align-items-center rounded shadow-sm">
          <span style={{ fontSize: '14px' }}>Your Profile</span>
          <Edit2 className="text-secondary" size={20} />
        </div>

        <div className="bg-light p-3 mb-3 d-flex justify-content-between align-items-center rounded shadow-sm">
          <span style={{ fontSize: '14px' }}>Appearance</span>
          <div className="d-flex align-items-center">
            <span className="text-secondary me-2">Light</span>
            <ChevronRight className="text-muted" size={20} />
          </div>
        </div>

        {/* Rewards Section */}
        <div className="mb-4">
          <div className="bg-light p-3 rounded shadow-sm">
            <h2 className="h6 mb-3" style={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'Rethink Sans' }}>
              REWARDS
            </h2>
            <div>
              <div className="d-flex justify-content-between align-items-center mx-2 mb-3">
                <span style={{ fontSize: '10px' }}>Refer a friend</span>
                <ChevronRight className="text-muted" size={20} />
              </div>
              <div className="d-flex justify-content-between align-items-center mx-2 mb-3">
                <span style={{ fontSize: '10px' }}>Claim a Gift Card</span>
                <ChevronRight className="text-muted" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Help & Support Section */}
        <div>
          <div className="bg-light p-3 rounded shadow-sm">
            <h2 className="h6 mb-3" style={{ fontSize: '14px', fontWeight: 'bold' }}>
              Help & support
            </h2>
            <div>
              <div className="d-flex justify-content-between align-items-center mx-2 mb-3">
                <span style={{ fontSize: '10px' }}>Contact Us</span>
                <ChevronRight className="text-muted" size={20} />
              </div>
              <div className="d-flex justify-content-between align-items-center mx-2 mb-3">
                <span style={{ fontSize: '10px' }}>Give us feedback</span>
                <ChevronRight className="text-muted" size={20} />
              </div>
              <div className="d-flex justify-content-between align-items-center mx-2 mb-3">
                <span style={{ fontSize: '10px' }}>Report an issue</span>
                <ChevronRight className="text-muted" size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Nav />
    </div>
  );
};

export default Profile;
