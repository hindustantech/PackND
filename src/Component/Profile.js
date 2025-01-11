import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Edit2 } from 'lucide-react';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const [UserData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const user_id = localStorage.getItem("id");
  const navigate = useNavigate();
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
    <>
      <div className="min-vh-100  mb-4 bg-light">
        {/* Profile Header */}
        <div
          className="bg-dark text-center text-white py-4 mb-4"
          style={{ borderRadius: '0 0 25px 25px' }}
        >
          <div className="d-flex justify-content-between align-items-center mx-3 ">
            <ChevronLeft size={24} onClick={() => { navigate('/') }} />
            <div className="bg-light h-7 w-7 d-flex justify-content-center aling-item-center rounded ">
              <img src="/nav/Translate.png" alt="PacknD" className="h-6" loading="lazy" />
            </div>
          </div>
          <div
            className="position-relative mx-auto"
            style={{ width: '96px', height: '96px', marginBottom: '1rem' }}
          >

            <div
              style={{
                backgroundImage: `url('/m/${UserData.package_name}.png')`,
                backgroundSize: "cover", // Ensures the image covers the entire div
                backgroundPosition: "center", // Centers the image
                backgroundRepeat: "no-repeat", // Prevents the image from repeating
                width: "100%", // Ensure the div takes full width of the parent
                height: "100%", // Ensure the div takes full height of the parent
                position: "relative", // To position child elements properly
              }}
            >
              <div
                className="rounded-circle overflow-hidden position-absolute"
                style={{
                  width: "60px", // Adjust width as needed
                  height: "60px", // Adjust height as needed
                  top: "50%", // Center vertically
                  left: "50%", // Center horizontally
                  transform: "translate(-50%, -50%)", // Perfect centering
                }}
              >
                <img
                  src="/meal.png"
                  alt="Profile"
                  className="w-100 h-100 object-fit-cover"
                  style={{
                    objectFit: "cover", // Ensures the image fits within the circle
                  }}
                />
              </div>
            </div>

          </div>
          <p className="custom-text-gradient mt-2">
                    {UserData.package_name} Member
                </p>

          <h1 className="h5">Hello, {UserData.first_name}!</h1>
        </div>

        {/* Main Content */}
        <div className="container " >
          <div className=" p-3 mb-3 d-flex justify-content-between align-items-center rounded  " style={{ backgroundColor: "#FFFFFF" }} onClick={() => { navigate('/user') }}>
            <span style={{ fontSize: '14px' }} >Your Profile</span>
            <img className='h-6' src='/nav/Pencil.png' />
          </div>
          {/* 
        <div className=" p-3 mb-3 d-flex justify-content-between align-items-center rounded " style={{ backgroundColor: "#FFFFFF" }}>
          <span style={{ fontSize: '14px' }}>Appearance</span>
          <div className="d-flex align-items-center">
            <span className="text-secondary me-2">Light</span>
            <ChevronRight className="text-muted" size={20} />
          </div>
        </div> */}

          {/* Rewards Section */}
          <div className="mb-4" style={{ backgroundColor: "#FFFFFF" }}>
            <div className=" p-3 rounded ">
              <h2 className="h6 mb-3" style={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'Rethink Sans' }}>
                REWARDS
              </h2>
              <div>
                <div className="d-flex justify-content-between align-items-center mx-2 mb-3" onClick={() => { navigate('/ref') }}>
                  <span style={{ fontSize: '10px' }}>Refer a friend</span>
                  <ChevronRight className="text-muted" size={20} />
                </div>
                <div className="d-flex justify-content-between align-items-center mx-2 mb-3">
                  {/* <span style={{ fontSize: '10px' }}>Claim a Gift Card</span>
                  <ChevronRight className="text-muted" size={20} /> */}
                </div>
              </div>
            </div>
          </div>

          {/* Help & Support Section */}
          <div >
            <div className=" p-3 rounded " style={{ backgroundColor: "#FFFFFF" }}>
              <h2 className="h6 mb-3" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                Help & support
              </h2>
              <div>
                <div className="d-flex justify-content-between align-items-center mx-2 mb-3" onClick={() => { navigate('/ContactUs') }}>
                  <span style={{ fontSize: '10px' }}>Contact Us</span>
                  <ChevronRight className="text-muted" size={20} />
                </div>
                <div className="d-flex justify-content-between align-items-center mx-2 mb-3">


                </div>
                <div className="d-flex justify-content-between align-items-center mx-2 mb-3">


                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <Nav /></>
  );
};

export default Profile;
