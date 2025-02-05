import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

const PuseMeal = ({ meal_time }) => {
    const [UserData, setUserData] = useState([]);
    const [isPaused, setIsPaused] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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

    const togglePauseMeal = async () => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            const newStatus = !isPaused; // Toggle status
            const result = await handlePauseTodayMeal(!newStatus); // Send inverted status

            if (result) {
                setIsPaused(!result.meal_status); // Invert the stored state
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUser();
                setUserData(data.user);
                // Set initial meal status from user data if available
                if (data.user && typeof data.user.meal_status !== 'undefined') {
                    setIsPaused(!data.user.meal_status);
                }
            } catch (err) {
                setError(err.message);
                toast.error("Failed to load user data");
            }
        };

        fetchData();
    }, []);

    const handlePauseTodayMeal = async (mealStatus) => {
        if (!user_id) {
            toast.error("User ID not found");
            return null;
        }

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/updateMealStatus`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: user_id,
                        meal_status: mealStatus, // Send inverted meal status
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update meal status");
            }

            const result = await response.json();

            if (result.status === "success") {
                toast.success(result.message);
                return result.data;
            } else {
                throw new Error(result.message || "Failed to update meal status");
            }
        } catch (error) {
            toast.error(error.message);
            return null; // Return null instead of throwing error
        }
    };

    return (
        <div
            className="p-3 mb-3 d-flex justify-content-between align-items-center rounded"
            style={{ backgroundColor: "#FFFFFF" }}
        >
            <span style={{ fontSize: "14px" }}>
                {isPaused ? `${meal_time} Meal Today Paused ` : `${meal_time} Meal Today Active`}
            </span>

            {/* Accessible Toggle Switch */}
            <label className="meal-toggle-switch">
                <input
                    type="checkbox"
                    id="mealToggle"
                    checked={!isPaused}
                    onChange={togglePauseMeal}
                    disabled={isLoading}
                    aria-label="Toggle Meal Status"
                />
                <span className="meal-slider meal-round"></span>
            </label>
        </div>

    )
}

export default PuseMeal