import { useEffect, useState } from 'react';
import React from 'react';
import { Sun, Moon, } from 'lucide-react'; // Import lucide-react icons
import Nav from './Nav';
import { Link } from 'react-router-dom';
import Coupon from './Coupon';
import axios from 'axios';
const Home = () => {
    const [mealTime, setMealTime] = useState('lunch');

    const [meal, setMeal] = useState([])

    const [error, setError] = useState(null);

    // Function to fetch package data
    const getPackageData = async () => {
        try {
            const response = await axios.get('http://projectdemo.ukvalley.com/api/getPackage');
            if (response.status === 200) {
                return response.data; // Return the data if the request was successful
            } else {
                throw new Error(`Unexpected response status: ${response.status}`);
            }
        } catch (error) {
            // Handle various error scenarios
            if (error.response) {
                console.error('Error Response:', {
                    status: error.response.status,
                    data: error.response.data,
                    headers: error.response.headers,
                });
                throw new Error(`Server error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
            } else if (error.request) {
                console.error('No Response:', error.request);
                throw new Error('No response from the server. Please try again later.');
            } else {
                console.error('Request Setup Error:', error.message);
                throw new Error(`Request error: ${error.message}`);
            }
        }
    };

    // useEffect to fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPackageData();
                setMeal(data);
                console.log('Package Data:', data);
            } catch (err) {
                console.error('Error Fetching Package Data:', err.message);
                setError(err.message); // Set error state
            }
        };

        fetchData(); // Call the async function
    }, []);

    {
        error ? (
            <p style={{ color: 'red' }}>Error: {error}</p>
        ) : meal ? (
            <pre>{JSON.stringify(meal, null, 2)}</pre>
        ) : (
            <p>Loading...</p>
        )
    }

    return (
        <div className="min-vh-100 bg-light mb-4">
            {/* Hero Banner */}
            <div className="relative bg-gradient-to-b from-blue-600 to-blue-800 text-white rounded-b-3xl  " style={{ height: '264px' }}>
                <div className="container mx-auto px-4 py-4">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <img
                            src="/api/placeholder/120/40"
                            alt="PacknD Logo"
                            className="h-8"
                        />
                        <button className="px-3 py-1 border border-white rounded-full hover:bg-white hover:text-blue-600 transition-colors">
                            立A
                        </button>
                    </div>

                    {/* Coupon Section */}


                </div>
                <div className="  mt-4">
                    <Coupon />
                </div>
            </div>

            {/* Main Content */}
            <div className="container position-relative mt-3">
                <div className="bg-white rounded-4 shadow-sm p-4">
                    {/* Date and Balance */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center">
                            <div className="me-2">
                                <div className="text-danger fw-bold ">03</div>
                                <div className="text-muted">Jan</div>
                            </div>
                            <div>
                                <div className="fw-bold text-dark" style={{ fontSize: '12px', fontWeight: 'bold' }}>Today’s menu</div>
                                <div className="text-muted" style={{ fontSize: '9px', color: '6F6F6F' }}>Select your meal preferences from below</div>
                            </div>
                        </div>

                        <button className="btn btn-outline-danger rounded-3 text-xl" style={{ fontSize: '10px' }}>Show Balance</button>
                    </div>

                    {/* Meal Time Selector */}
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



                    {/* Meal Types */}
                    <h5 className="mb-3">Select the meal type</h5>
                    <div className="row g-3">
                        {meal.map((meal) => (
                            <div
                                key={meal.id}
                                className="col-12 col-sm-6 col-md-4 col-lg-3"
                            >
                                <div
                                    className="d-flex flex-column position-relative rounded-4 overflow-hidden h-100"
                                    style={{ minHeight: '200px' }}
                                >
                                    <img
                                        src="/meal.png"
                                        alt={meal.name}
                                        className="w-100"
                                        style={{ height: '130px', objectFit: 'cover' }}
                                    />
                                    <div
                                        className="flex-grow-1 position-absolute bottom-0 start-0 w-100 p-2 bg-dark bg-opacity-50 text-white d-flex flex-column justify-content-between"
                                    >
                                        <h6
                                            className="mb-1"
                                            style={{ fontSize: '0.75rem' }}
                                        >
                                            <Link
                                                to="/payment"
                                                className="text-decoration-none text-white"
                                            >
                                                {meal.package_name}
                                            </Link>
                                        </h6>
                                        <small
                                            className="text-white-50"
                                            style={{ fontSize: '0.65rem' }}
                                        >
                                            @ {meal.price} only
                                        </small>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>




                    {/* Customization Section */}
                    <div className="mt-4">
                        <h5 className="mb-3">Now customise it</h5>
                        {/* Add customization options here */}

                        <Link to='/meal'>Chose Your Meal</Link>
                    </div>
                </div>
            </div>
            <Nav />
        </div>
    );
};

export default Home;





