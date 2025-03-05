import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const PauseMeal = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user_id = localStorage.getItem("id");

  const togglePauseMeal = async () => {
    if (isLoading || !user_id) return;

    setIsLoading(true);

    try {
      const payload = {
        user_id,
        meal_status: !isPaused,
      };

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

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update meal status");
      }

      if (result.status === "success") {
        toast.success(result.message || "Meal status updated successfully");
        setIsPaused(!isPaused);
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
    const fetchUserMealStatus = async () => {
      try {
        if (!user_id) {
          throw new Error("User ID not found in localStorage.");
        }

        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/getuser/${user_id}`);

        if (!response.ok) {
          throw new Error(`Unexpected response status: ${response.status}`);
        }

        const data = await response.json();

        if (data.user && typeof data.user.meal_status !== 'undefined') {
          setIsPaused(data.user.meal_status);
        }
      } catch (error) {
        console.error('Fetch User Error:', error);
        toast.error("Failed to load user data");
      }
    };

    fetchUserMealStatus();
  }, [user_id]);

  return (
    <div className="p-2 mb-3 flex justify-between items-center bg-white rounded shadow-sm">
      <span className="text-sm font-medium text-gray-700">
        {isPaused ? 'Meal Paused' : 'Meal is Active'}
      </span>

      <button
        onClick={togglePauseMeal}
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