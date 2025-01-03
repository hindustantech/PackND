import React, { useState, useEffect } from 'react';
import { QrCode, Receipt } from 'lucide-react';
import { toast } from 'react-toastify';

const PaymentPage = () => {
    const [meals, setMeals] = useState([]);
    const [qrDeatils, setqrDeatils] = useState([]);
    const [UserData, setUserData] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [error, setError] = useState(null);
    const user_id = localStorage.getItem("id");

    // Function to fetch package data
    const getDinerMeal = async () => {
        try {
            const response = await fetch('http://projectdemo.ukvalley.com/api/getPackage');
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Unexpected response status: ${response.status}`);
            }
        } catch (error) {
            throw new Error('Failed to fetch meal data');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDinerMeal();
                setMeals(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
    }, []);
    // qrCode Detils
    const getqr = async () => {
        try {
            const response = await fetch('http://projectdemo.ukvalley.com/api/qr_image');
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Unexpected response status: ${response.status}`);
            }
        } catch (error) {
            throw new Error('Failed to fetch meal data');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getqr();
                setqrDeatils(data);
                console.log(data)
            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
    }, []);

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
                console.log(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);


    const handleMealSelect = (e) => {
        const value = parseInt(e.target.value, 10); // Convert to a number
        const selected = meals.find(meal => meal.id === value);
        setSelectedMeal(selected);
    };

    const [formData, setFormData] = useState({
        Thash: '',
        receipt: null
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user_id = localStorage.getItem("id");

            // Validate user_id exists
            if (!user_id) {
                throw new Error('User ID not found. Please login again.');
            }

            const formDataToSend = new FormData();
            formDataToSend.append('Thash', formData.Thash);
            formDataToSend.append('user_id', user_id);
            formDataToSend.append('receipt', formData.receipt);
            formDataToSend.append('package_id', selectedMeal.id);
            formDataToSend.append('tpin', formData.tpin);

            // Debugging: Log FormData contents
            for (let [key, value] of formDataToSend.entries()) {
                console.log(`${key}: ${value}`);
            }

            const response = await fetch('http://projectdemo.ukvalley.com/api/make_deposite', {
                method: 'POST',
                body: formDataToSend,
            });

            // Check content type of response
            const contentType = response.headers.get('content-type');

            if (!response.ok) {
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    console.log("errorData",errorData.error)
                    throw new Error(errorData.message || ` ${errorData.error}`);
                } else {
                    // If response is not JSON, get the text content for debugging
                    const textError = await response.text();
                    console.error('Server response:', textError);
                    throw new Error(`Server error: ${response.status}`);
                }
            }

            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Invalid response from server. Expected JSON.');
            }

            const result = await response.json();
            alert(result.message);
            toast.success(result.message)
            console.log(result);
        } catch (error) {
            console.error('Error during payment confirmation:', error);
            toast.error(`Error: ${error.message}`);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow">
                        {/* Header */}
                        <div className="card-header bg-danger text-white p-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <h1 className="h3 mb-0">Order Details</h1>
                                <Receipt size={32} />
                            </div>
                        </div>

                        <div className="card-body p-4">
                            {/* Meal Selection Dropdown */}
                            <div className="mb-4">
                                <label className="form-label">Select a Meal</label>
                                <select
                                    className="form-select"
                                    onChange={handleMealSelect}
                                    defaultValue=""
                                >
                                    <option value="" disabled>-- Choose a meal --</option>
                                    {meals.map((meal) => (
                                        <option key={meal.id} value={meal.id}>
                                            {meal.package_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Meal Details Card */}
                            {selectedMeal && (
                                <div className="card mb-4">
                                    <div
                                        className="card-body"
                                        style={{
                                            backgroundColor:
                                                selectedMeal.package_name === 'Gold' ? '#FFD700' :
                                                    selectedMeal.package_name === 'Silver' ? '#C0C0C0' :
                                                        '#CD7F32',
                                            color:
                                                selectedMeal.package_name === 'Gold' ? '#000000' :
                                                    selectedMeal.package_name === 'Silver' ? '#000000' :
                                                        '#FFFFFF'
                                        }}
                                    >
                                        <h5 className="card-title" style={{
                                            color: 'inherit'
                                        }}>{UserData.email1}</h5>
                                        <h5 className="card-title" style={{
                                            color: 'inherit'
                                        }}>{selectedMeal.package_name}</h5>

                                        <div className="row g-4 mb-4">
                                            <div className="col-md-6 mb-0">
                                                <h6 className="mb-1" style={{
                                                    color: 'inherit'
                                                }}>Price</h6>
                                                <p className="h4" style={{
                                                    color: 'inherit'
                                                }}>₹{selectedMeal.price}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h6 className="mb-1" style={{
                                                color: selectedMeal.package_name === 'Bronze' ? '#FFFFFF' : '#666666'
                                            }}>Description</h6>
                                            <p style={{
                                                color: 'inherit'
                                            }}>{selectedMeal.description}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* QR Code Section */}
                            <div className="row">
                                {qrDeatils.map((detail, index) => (
                                    <div className="card mb-4" key={index}>
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h5 className="mb-1" >Scan to Pay</h5>
                                                    <p className="text-muted mb-0" style={{ fontSize: '12px' }}>UPI ID: {detail.address}</p>
                                                </div>
                                                {/* QR Code Image Section */}
                                                <div className="card mb-4">
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <img
                                                                src={`https://projectdemo.ukvalley.com/public/qrcode/${detail.qr}`}
                                                                alt="QR Code"
                                                                className="img-fluid"
                                                                style={{ maxWidth: '120px', height: 'auto' }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>


                            {/* Payment Form */}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="form-label">Transaction ID</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your transaction ID"
                                        value={formData.Thash}
                                        onChange={(e) => setFormData({ ...formData, Thash: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Tpin ID</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your transaction ID"
                                        value={formData.tpin}
                                        onChange={(e) => setFormData({ ...formData, tpin: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Upload Payment Screenshot</label>
                                    <div className="card">
                                        <div className="card-body text-center p-4">
                                            <input
                                                type="file"
                                                className="form-control"
                                                onChange={(e) => setFormData({ ...formData, receipt: e.target.files[0] })}
                                                required
                                            />
                                            <small className="text-muted d-block mt-2">
                                                PNG, JPG, GIF up to 10MB
                                            </small>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-danger w-100 py-2"
                                >
                                    Confirm Payment
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
