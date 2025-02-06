import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const PauseMeal = ({ meal_time }) => {
    const [userData, setUserData] = useState([]);
    const [isPaused, setIsPaused] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

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
            console.error('GetUser Error:', error);
            throw error;
        }
    };

    const togglePauseMeal = () => {
        if (isLoading) return;
        setIsModalOpen(true);
    };

    const formatDateToMySQLString = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;

        if (!startDate || !endDate) {
            toast.error("Please select both start and end dates");
            return;
        }

        setIsLoading(true);
        try {
            const result = await handlePauseTodayMeal(
                true,
                formatDateToMySQLString(startDate),
                formatDateToMySQLString(endDate)
            );

            if (result) {
                setIsPaused(!result.meal_status);
                setIsModalOpen(false);
                setStartDate('');
                setEndDate('');
            }
        } catch (error) {
            console.error('Submit Error:', error);
            toast.error(error.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUser();
                setUserData(data.user);
                if (data.user && typeof data.user.meal_status !== 'undefined') {
                    setIsPaused(data.user.meal_status);
                }
            } catch (err) {
                console.error('Fetch Data Error:', err);
                setError(err.message);
                toast.error("Failed to load user data");
            }
        };

        fetchData();
    }, []);

    const handlePauseTodayMeal = async (mealStatus, startDate, endDate) => {
        if (!user_id) {
            toast.error("User ID not found");
            return null;
        }

        try {
            const payload = {
                user_id: user_id,
                meal_status: mealStatus,
                pause_time_from: startDate,
                pause_time_to: endDate
            };

            console.log('API Request Payload:', payload);

            const response = await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/updateMealStatus`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const responseText = await response.text();
            console.log('API Response Text:', responseText);

            let result;
            try {
                result = JSON.parse(responseText);
            } catch (e) {
                console.error('Failed to parse response as JSON:', e);
                throw new Error('Invalid response format from server');
            }

            if (!response.ok) {
                throw new Error(result.message || "Failed to update meal status");
            }

            if (result.status === "success") {
                toast.success(result.message || "Meal status updated successfully");
                return result.data;
            } else {
                throw new Error(result.message || "Failed to update meal status");
            }
        } catch (error) {
            console.error('API Error:', error);
            toast.error(error.message || "Failed to update meal status");
            return null;
        }
    };

    // Get today's date in YYYY-MM-DD format for min date attribute
    const today = new Date().toISOString().split('T')[0];

    const formatDisplayDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <>
            <div className="p-2 mb-3 flex justify-between items-center bg-white rounded">
                <span className="text-sm">
                    {isPaused ? (
                        `Meal Paused ${formatDisplayDate(userData.pause_time_from)} to ${formatDisplayDate(userData.pause_time_to)}`
                    ) : (
                        'Meal is Active'
                    )}
                </span>

                {!isPaused && (<button
                    onClick={togglePauseMeal}
                    disabled={isLoading || isPaused}

                    className="p-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Pause
                </button>
                )}

            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    <div className="relative z-50 w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Pause Meal Duration</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <span className="text-2xl">&times;</span>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    min={today}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    min={startDate || today}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    {isLoading ? 'Confirming...' : 'Confirm'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default PauseMeal;