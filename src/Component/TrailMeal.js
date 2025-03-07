import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
export const MealForm = ({ selectedMeal, onSubmit, onClose }) => {
    const [imagePreview, setImagePreview] = useState(null);
    const [qrCodeImage, setQrCodeImage] = useState('/meal.png'); // Default fallback
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        Thash: '', // Transaction ID
        receipt: null, // Payment receipt file
        tiffin_quantity: '1', // Default quantity
        meal_time: '', // Empty string by default
    });

    // console.log("qrCodeImage", qrCodeImage);

    // Function to get QR code from API
    const getQr = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/qr_image`);
            if (response.ok) {
                const data = await response.json();

                // console.log("Data",);
                setQrCodeImage(data?.[0]);

            }
        } catch (error) {
            console.error("Error fetching QR code:", error);
            // Keep using the default QR code
        }
    };

    useEffect(() => {
        // Reset form fields when component mounts
        setFormData({
            Thash: '',
            receipt: null,
            tiffin_quantity: '1',
            meal_time: '', // Reset meal time
        });
        setImagePreview(null);

        // Fetch QR code
        getQr();

        // Control body scrolling
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    // Handle form field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle meal time radio selection
    const handleMealTimeChange = (e) => {
        setFormData({
            ...formData,
            meal_time: e.target.value
        });
    };

    // Handle file upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Set file for submission
            setFormData({
                ...formData,
                receipt: file
            });

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Get user ID from local storage or context
            const user_id = localStorage.getItem('id');
            // console.log("Userid", user_id)

            if (!user_id) throw new Error('User ID not found. Please login again.');
            if (!selectedMeal) throw new Error('Please select a meal package.');
            if (!formData.Thash) throw new Error('Please enter transaction ID.');
            if (!formData.receipt) throw new Error('Please upload payment receipt.');
            if (!formData.meal_time) throw new Error('Please select a meal time (morning or evening).');

            // Create FormData object for API submission
            const formDataToSend = new FormData();
            formDataToSend.append('Thash', formData.Thash);
            formDataToSend.append('user_id', user_id);
            formDataToSend.append('receipt', formData.receipt);
            formDataToSend.append('package_id', selectedMeal.id);
            formDataToSend.append('tiffin_quantity', formData.tiffin_quantity);
            formDataToSend.append('meal_time', formData.meal_time);

            // Set loading state
            setLoading(true);

            // Send API request
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/make_deposite`, {
                method: 'POST',
                body: formDataToSend,
            });

            // console.log(response)
            // Check response type
            const contentType = response.headers.get('content-type');

            if (!response.ok) {
                const errorData = contentType?.includes('application/json')
                    ? await response.json()
                    : await response.text();
                throw new Error(errorData.error || errorData);
            }

            // Handle success
            const result = await response.json();
            toast.success(result.message || 'Payment submitted successfully!');
            setLoading(false);

            // Navigate to home after success
            window.location.href = '/';
        } catch (error) {
            setLoading(false);
            toast.error(error.message || 'An error occurred. Please try again.');
        }
    };

    if (!selectedMeal) return null;

    // console.log("selectedMeal",);
    // Get package name and description safely
    const price=selectedMeal?.price
    const packageName = selectedMeal?.package_name || selectedMeal;
    const packageDesc = selectedMeal?.description ||
        (packageName === 'Gold' ? 'Premium Selection' : 'Quality Selection');
    const isGold = packageName === 'Gold';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white w-full max-w-2xl mx-auto rounded-lg shadow-xl max-h-screen overflow-y-auto">
                {/* Close button in the top right corner */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-red-50 hover:bg-red-100 transition-colors"
                    aria-label="Close"
                >
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                <div className="p-5 md:p-6">
                    <h1 className="text-xl font-bold text-red-600 mb-6 text-center">
                        Confirm {packageName} Meal
                    </h1>

                    <div className="bg-white rounded-xl border-t-4 border-red-600 p-4 md:p-6 shadow-sm">
                        {/* Meal Selection Display */}
                        <div className="mb-6">
                            {isGold ? (
                                <div className="p-3 md:p-4 rounded-lg bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-400 flex items-center shadow-md">
                                    <div className="w-full">
                                        <p className="font-bold text-yellow-800 text-sm md:text-lg">Gold Meal</p>
                                        <p className="text-yellow-700 text-xs md:text-sm">{packageDesc}</p>
                                        <p className="text-yellow-700 text-xs md:text-sm mt-2">Price {price}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-3 md:p-4 rounded-lg bg-gradient-to-r from-gray-100 to-white border-2 border-gray-400 flex items-center shadow-md">
                                    <div className="w-full">
                                        <p className="font-bold text-gray-800 text-sm md:text-lg">Silver Meal</p>
                                        <p className="text-gray-700 text-xs md:text-sm">{packageDesc}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Form with appropriate spacing */}
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                            <div>
                                <label className="block text-sm font-medium mb-1 md:mb-2 text-red-600">Meal Time</label>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="morning"
                                            name="meal_time"
                                            value="morning"
                                            className="h-4 w-4 text-red-500 focus:ring-red-500 border-red-300"
                                            checked={formData.meal_time === 'morning'}
                                            onChange={handleMealTimeChange}
                                            required
                                        />
                                        <label htmlFor="morning" className="ml-2 text-sm md:text-base text-gray-700">
                                            Morning
                                        </label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="evening"
                                            name="meal_time"
                                            value="evening"
                                            className="h-4 w-4 text-red-500 focus:ring-red-500 border-red-300"
                                            checked={formData.meal_time === 'evening'}
                                            onChange={handleMealTimeChange}
                                            required
                                        />
                                        <label htmlFor="evening" className="ml-2 text-sm md:text-base text-gray-700">
                                            Evening
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 md:mb-2 text-red-600">QR Code for Payment</label>
                                <div className="flex justify-center  rounded-lg border border-gray-200">
                                    <img
                                        src={`https://projectdemo.ukvalley.com/public/qrcode/${qrCodeImage.qr}`}
                                        alt="QR Code"
                                        className="h-50 md:h-40 object-contain"
                                    />
                                </div>
                                
                                <p className="text-center text-xs md:text-sm text-gray-500 mt-1 md:mt-2">Scan this QR code to make payment</p>
                                <p className="text-center text-xs md:text-sm text-gray-500 mt-1 md:mt-2">{qrCodeImage.address}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 md:mb-2 text-red-600">Enter Transaction ID</label>
                                <input
                                    type="text"
                                    name="Thash"
                                    value={formData.Thash}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 md:px-4 md:py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all text-sm md:text-base"
                                    placeholder="Enter transaction ID from your payment"
                                    required
                                />
                            </div>

                            <div className="bg-red-50 p-3 md:p-4 rounded-lg border border-red-100">
                                <label className="block text-sm font-medium mb-1 md:mb-2 text-red-600">Upload Payment Receipt</label>
                                <div className="border-2 border-dashed border-red-300 rounded-lg p-3 md:p-4 bg-white flex flex-col items-center justify-center">
                                    {!imagePreview ? (
                                        <>
                                            <div className="text-center mb-2 md:mb-3">
                                                <svg className="mx-auto h-8 w-8 md:h-10 md:w-10 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                </svg>
                                                {/* <p className="text-red-500 text-xs md:text-sm mt-1 md:mt-2">Drag and drop or click to upload</p> */}
                                                <p className="text-gray-500 text-xs mt-1">JPG, PNG(max. 2MB)</p>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="w-full text-xs md:text-sm"
                                                id="image-upload"
                                                required
                                            />
                                        </>
                                    ) : (
                                        <div className="relative w-full">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="h-24 md:h-32 w-full object-contain rounded-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setImagePreview(null);
                                                    setFormData({
                                                        ...formData,
                                                        receipt: null
                                                    });
                                                }}
                                                className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs"
                                                aria-label="Remove image"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Hidden tiffin quantity field with default value */}
                            <input
                                type="hidden"
                                name="tiffin_quantity"
                                value={formData.tiffin_quantity}
                            />

                            {/* Submit button within the form */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full mb-5 py-2 mt-4 ${loading ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'} text-white font-medium text-sm md:text-lg rounded-lg transition duration-300 shadow-md flex items-center justify-center`}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="mr-2">Confirm Selection</span>
                                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TrailMeal = ({ mealTime = "Daily" }) => {
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [showMealForm, setShowMealForm] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleMealSelect = (mealPackage) => {
        setSelectedMeal(mealPackage);
    };

    const handleSubmit = () => {
        if (selectedMeal) {
            setShowMealForm(true);
        } else {
            alert('Please select a meal option before submitting');
        }
    };

    const handleFormSubmit = (data) => {
        setSubmittedData(data);
        setShowMealForm(false);
        // console.log('Submitted data:', data);
        // Here you would typically send this data to your backend
    };

    const fetchPackages = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/getTrialPackage`);

            if (res.data && Array.isArray(res.data)) {
                setPackages(res.data);
            } else {
                // Handle case where API doesn't return an array
                setError("Invalid data format received from server");
                setPackages([]);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching packages:", error.message || "Something Went Wrong");
            setError("Failed to load meal packages. Please try again later.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    // If showing meal form, render as a full page
    if (showMealForm) {
        return (
            <MealForm
                selectedMeal={selectedMeal}
                onSubmit={handleFormSubmit}
                onClose={() => setShowMealForm(false)}
            />
        );
    }

    // Otherwise show the meal selection page
    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="mb-2">
                <h6 className="text-red-500 text-center font-bold text-sm mb-1 text-capitalize">{mealTime} Meal</h6>
                <p className="text-gray-500 text-center text-xs mb-4">Prepare your week meal today</p>
            </div>

            <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg border-t-4 border-red-600 mb-3">
                <h2 className="text-2xl font-bold text-center mb-6 text-red-600">Trail Meal</h2>

                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 p-4 rounded-md text-red-500 text-center">
                        {error}
                    </div>
                ) : (
                    <div className="flex gap-2 mb-6">
                        {packages && packages.length > 0 ? (
                            packages.map((p, index) => {
                                // Determine if this is Gold or Silver package
                                const isGold = p?.package_name === 'Gold';
                                const isSilver = p?.package_name === 'Silver';

                                return (
                                    <div
                                        key={index}
                                        className={`w-1/2 p-2 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${selectedMeal && selectedMeal.package_name === p.package_name
                                            ? isGold
                                                ? 'border-yellow-400 bg-gradient-to-r from-yellow-50 to-yellow-100 shadow-md transform scale-105'
                                                : 'border-gray-400 bg-gradient-to-r from-gray-50 to-gray-100 shadow-md transform scale-105'
                                            : isGold
                                                ? 'border-gray-200 hover:border-yellow-300 bg-white'
                                                : 'border-gray-200 hover:border-gray-300 bg-white'
                                            }`}
                                        onClick={() => handleMealSelect(p)}
                                    >
                                        <div className="flex flex-col items-center">
                                            <p className={`font-bold ${isGold ? 'text-yellow-800' : 'text-gray-800'}`}>
                                                {p?.package_name}
                                            </p>
                                            <p className={`text-xs ${isGold ? 'text-yellow-700' : 'text-gray-600'} text-center mt-1`}>
                                                {p?.description || (isGold ? 'Premium Selection' : 'Quality Selection')}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="w-full text-center py-4 text-gray-500">
                                No meal packages available at this time
                            </div>
                        )}
                    </div>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={loading || !packages?.length || !selectedMeal}
                    className={`w-full py-2 bg-red-600 text-white font-bold rounded-lg transition-all duration-300 shadow-md flex items-center justify-center
                        ${(loading || !packages?.length || !selectedMeal) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
                >
                    <span>Book Your Meal</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                </button>
            </div>

            {/* Success message if data was submitted */}
            {submittedData && (
                <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg shadow-md">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-red-800 font-medium">Your {submittedData.selectedMeal} meal has been successfully booked!</p>
                            <p className="text-red-600 text-sm mt-1">Thank you for your selection, {submittedData.name}!</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrailMeal;