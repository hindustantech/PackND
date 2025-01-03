import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import { PartyPopper, Gift, Sun, Moon, Award } from 'lucide-react';
import Lunch from './Lunch';
import Dinner from './Dinner';
import Coupon from './Coupon';

const Meal = () => {
    const [mealTime, setMealTime] = useState('lunch'); // State for meal time selection
    const [UserData, setUserData] = useState([]);
    const [error, setError] = useState(null);
    const user_id = localStorage.getItem("id");
    const getUser = async () => {
        try {
            // Ensure "id" is a string
            if (!user_id) {
                throw new Error("User ID not found in localStorage.");
            }

            const response = await fetch(`http://projectdemo.ukvalley.com/api/getuser/${user_id}`);

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
                console.log(data.user)
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="d-flex flex-column min-vh-100 mb-4">
            {/* Scrollable Content */}
            <div className="flex-grow-1 overflow-auto mb-4">
                {/* Hero Section with Happy New Year */}
                <div className="position-relative">
                    <div
                        className=" p-4 text-white rounded-bottom-4 bg-img"
                        // style={{ backgroundImage: 'linear-gradient(to bottom, #4a148c, #7b1fa2)' }}
                    >
                        <div className="d-flex justify-content-between align-items-start mb-4">
                            {/* <img src="/logo1.png" alt="PacknD" className="h-8" /> */}
                            {/* <img src="/icon/lang.png" className="px-3 py-1 border border-white rounded-full hover:bg-white hover:text-blue-600 transition-colors" /> */}

                        </div>
                        {/* <h1 className="text-center display-6 fw-bold mb-4">HAPPY NEW YEAR</h1> */}
                        <div className=" mb-3">
                            {/* <Coupon /> */}
                        </div>
                    </div>
                </div>

                {/* Meal Time Selection */}
                <div className="p-3">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center">
                            <div className="me-2">
                                <div className="text-danger fw-bold ">03</div>
                                <div className="text-muted">Jan</div>
                            </div>
                            <div>
                                <div className="fw-bold text-dark" style={{ fontSize: '12px', fontWeight: 'bold' }}>Today’s menu</div>
                                <div className="text-muted" style={{ fontSize: '9px', color: '6F6F6F' }}>{UserData.address}</div>
                            </div>
                        </div>

                        <button className="btn btn-outline-danger rounded-3 text-xl" style={{ fontSize: '10px' }}>Show Balance</button>
                    </div>
                    <div className="row g-0 mb-4 rounded-4" style={{ border: '1px solid red', overflow: 'hidden' }}>


                        {/* Lunch Button */}
                        <div className="col-6" style={{ borderRight: '2px solid red' }}>
                            <button
                                className={`btn w-100 ${mealTime === 'lunch' ? '' : 'btn-light text-muted'}`}
                                onClick={() => setMealTime('lunch')}
                                style={{
                                    backgroundColor: mealTime === 'lunch' ? '#FFD3D3' : '',
                                    color: mealTime === 'lunch' ? 'red' : '',
                                    borderRadius: '0px',
                                }}
                            >
                                <div className="d-flex align-items-center justify-content-center">
                                    <Sun />
                                    <span className="ms-2">Lunch Meal</span>
                                </div>
                                <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                                    9:00 AM to 01:00 PM
                                </small>
                            </button>
                        </div>

                        {/* Dinner Button */}
                        <div className="col-6">
                            <button
                                className={`btn w-100 ${mealTime === 'dinner' ? '' : 'btn-light text-muted'}`}
                                onClick={() => setMealTime('dinner')}
                                style={{
                                    backgroundColor: mealTime === 'dinner' ? '#FFD3D3' : '',
                                    color: mealTime === 'dinner' ? 'red' : '',
                                    borderRadius: '0px',
                                }}
                            >
                                <div className="d-flex align-items-center justify-content-center">
                                    <Moon />
                                    <span className="ms-2">Dinner Meal</span>
                                </div>
                                <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                                    7:00 PM to 10:00 PM
                                </small>
                            </button>
                        </div>
                    </div>


                    {/* Membership */}
                    <h6 className="text-danger text-center mb-3">Your Membership Meal</h6>
                    <div className="d-flex">
                        <div style={{ minWidth: '60px' }} className="d-flex align-items-start">
                            <img
                                src="/api/placeholder/60/60"
                                alt="Full Meal"
                                className="rounded object-fit-cover"
                                style={{ width: '60px', height: '60px' }}
                            />
                        </div>

                        <div className="card-body p-2 p-sm-3 bg-light ">
                            <div className="d-flex gap-2 gap-sm-3">

                                <div className="flex-grow-1">
                                    <div className="mb-1">
                                        <h6 className="mb-1 fs-7" style={{ fontSize: '0.9rem' }}>Full Meal</h6>
                                        <span className=" bg-light text-dark border" style={{ fontSize: '0.7rem', fontWeight: 'normal' }}>
                                            Pure veg
                                        </span>
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap gap-1">
                                        <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                                            Dal, Rice, Bread, 2 Sabji
                                        </small>

                                    </div>
                                    <hr className="my-2" style={{ margin: '0.4rem 0' }} />
                                    <div className="d-flex flex-column gap-1">
                                        <div className="d-flex align-items-center gap-1">
                                            <Gift size={14} className="text-danger" />
                                            <span className="badge text-dark" style={{ fontSize: '0.5rem', fontWeight: 'normal' }}>
                                                Surprise Item Today!
                                            </span>
                                            <Award size={14} className="text-warning" />
                                            <span className="badge text-dark" style={{ fontSize: '0.4rem', fontWeight: 'normal' }}>
                                                Complete 5 non-stop orders and one free
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Render Lunch or Dinner Component Based on mealTime */}
                    {mealTime === 'lunch' && <Lunch />}
                    {mealTime === 'dinner' && <Dinner />}
                </div>
            </div>

            {/* Fixed Navigation */}
            <div className="bg-white shadow-lg">
                <Nav />
            </div>
        </div>
    );
};

export default Meal;
