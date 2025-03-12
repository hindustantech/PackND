import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const PauseMeal = ({isPause}) => {
    
    const [isPaused, setIsPaused] = useState(isPause);
    const [isLoading, setIsLoading] = useState(false);
    console.log(isPause);

 
    const user_id = localStorage.getItem("id");

    const toggleMealStatus = async () => {
        if (isLoading || !user_id) return;

        setIsLoading(true);

        try {
            const newStatus = !isPaused;
            const payload = {
                user_id,
                meal_status: newStatus, // Send the new status directly
            };
            console.log(payload);
            const response = await fetch(
                ` ${process.env.REACT_APP_API_BASE_URL}/updateMealStatus`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to update meal status");
            }

            if (result.status == "success") {
                // Directly set the new status from payload
                setIsPaused(newStatus);

                // Store in localStorage to persist across reloads
                localStorage.setItem('mealStatus', JSON.stringify(newStatus));

                toast.success(result.message || "Meal status updated successfully");
                window.location.reload(true);

            } else {
                throw new Error(result.message || "Failed to update meal status");
            }
        } catch (error) {
            console.error('Toggle Error:', error);
            toast.error(error.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const dataset = () => {
           if (isPause == 1) {
            setIsPaused(true)
           }else{
            setIsPaused(false)
           }
        }

        dataset();
    },[isPause]);
    return (
        <div className="p-2 mb-3 flex justify-between items-center bg-white rounded shadow-sm">
            <span className="text-sm font-medium text-gray-700">
                {isPaused ? 'Meal Paused' : 'Meal is Active'}
            </span>

            <button
                onClick={toggleMealStatus}
                disabled={isLoading}
                className={`
          p-2 text-sm font-medium rounded-md transition-colors duration-200
          ${isLoading
                        ? 'text-gray-400 bg-gray-200 cursor-not-allowed'
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    }
        `}
            >
                {isLoading ? 'Processing...' : (isPaused ? 'Resume' : 'Pause')}
            </button>
        </div>
    );
};

export default PauseMeal;