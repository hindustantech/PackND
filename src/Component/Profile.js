import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Edit2 } from 'lucide-react';
import Nav from './Nav';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [UserData, setUserData] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const user_id = localStorage.getItem("id");

  const getUser = async () => {
    try {
      if (!user_id) {
        throw new Error("User ID not found in localStorage.");
      }

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/getuser/${user_id}`);

      if (!response.ok) {
        throw new Error(`Unexpected response status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {

      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUser();
        setUserData(data.user);
        // Set initial meal status from user data if available

      } catch (err) {
        setError(err.message);
        toast.error("Failed to load user data");
      }
    };

    fetchData();
  }, []);




  return (
    <>
      <div className="min-vh-100 mb-5 bg-light">
        {/* Profile Header */}
        <div
          className="bg-dark text-center text-white py-4 mb-4"
          style={{ borderRadius: '0 0 25px 25px' }}
        >
          <div className="d-flex justify-content-between align-items-center mx-3">
            <ChevronLeft size={24} onClick={() => { navigate('/') }} />
            <div className=" h-7 w-7 d-flex justify-content-center aling-item-center rounded">
              {/* <img src="/nav/Translate.png" alt="PacknD" className="h-6" loading="lazy" /> */}
            </div>
          </div>
          <div
            className="position-relative mx-auto"
            style={{ width: '96px', height: '96px', marginBottom: '1rem' }}
          >
            <div
              style={{
                backgroundImage: `url('/m/${UserData.package_name}.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              <div
                className="rounded-circle overflow-hidden position-absolute"
                style={{
                  width: "60px",
                  height: "60px",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <img
                  src="/meal.png"
                  alt="Profile"
                  className="w-100 h-100 object-fit-cover"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
          <p className="custom-text-gradient-profile mt-2">
            {UserData.package_name} Member
          </p>
          <h1 className="h3">Hello, {UserData.first_name}!</h1>
        </div>

        {/* Main Content */}
        <div className="container">
          <div className="p-3 mb-3 d-flex justify-content-between align-items-center rounded"
            style={{ backgroundColor: "#FFFFFF" }}
            onClick={() => { navigate('/user') }}>
            <span style={{ fontSize: '14px' }}>Your Profile</span>
            <img className='h-6' src='/nav/Pencil.png' alt="Edit" />
          </div>

          {/* Meal Status Toggle */}


          {/* Rewards Section */}
          <div className="mb-4" style={{ backgroundColor: "#FFFFFF" }}>
            <div className="p-3 rounded">
              <h2 className="h6" style={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'Rethink Sans' }}>
                REWARDS
              </h2>
              <div>
                <div className="d-flex justify-content-between align-items-center mx-2"
                  onClick={() => { navigate('/ref') }}>
                  <span style={{ fontSize: '10px' }}>Refer a friend</span>
                  <ChevronRight className="text-muted" size={20} />
                </div>
                <div className="d-flex justify-content-between align-items-center mx-2 mb-3">
                </div>
              </div>
            </div>
          </div>

          {/* Help & Support Section */}
          <div className='mb-4'>
            <div className="p-3 rounded" style={{ backgroundColor: "#FFFFFF" }}>
              <h2 className="h6 mb-3" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                Help & support
              </h2>
              <div>
                <div className="d-flex justify-content-between align-items-center mx-2 mb-3"
                  onClick={() => { navigate('/ContactUs') }}>
                  <span style={{ fontSize: '10px' }}>Contact Us</span>
                  <ChevronRight className="text-muted" size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className='text-center mt-2'>
            <button
              style={{
                fontSize: '14px',
                padding: '8px 16px',
                backgroundColor: '#ff4d4f',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginBottom: '80px'
              }}
              className='mt-2 w-100'
              onClick={() => {
                localStorage.removeItem('id');
                window.location.href = '/login';
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Nav style={{ marginBottom: '20px' }} />
    </>
  );
};

export default Profile;