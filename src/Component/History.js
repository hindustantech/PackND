import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Nav from './Nav';

// Meal Card Component
const MealCard = ({ meal, isLast }) => (
  <div className="flex mb-4" style={{ marginBottom: '14px' }}>
    <span className="text-gray-500 flex justify-center items-center  mx-2">
      {meal.meal_time === 'morning' ? 'Lunch' : 'Dinner'}
    </span>
    <div className="rounded-md p-2 mb-2  bg-blue-50 flex-grow">
      <div className="flex justify-between items-center mb-2">
        <div className="flex">
          <div className="w-2 h-2 rounded-full bg-blue-500 mx-2 mt-1.5"></div>
          <h4 className="text-xs font-semibold">{meal.package_name}</h4>
        </div>
        <span className="text-gray-500 text-xs">
          {meal.quantity} Meal
        </span>
      </div>
      <p className="text-gray-500 text-xs mx-2">
        {meal.sabji1_name}, {meal.sabji2_name}, {meal.bread_name},
      </p>
    </div>
  </div>
);

// Calendar Component
const Calendar = ({
  currentDate = new Date(),
  selectedDate = null,
  calendarData = {},
  handleDateClick = () => { }
}) => {
  const safeCurrentDate = currentDate instanceof Date && !isNaN(currentDate)
    ? currentDate
    : new Date();

  const getDaysInMonth = (date) => {
    try {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    } catch (error) {
      console.error('Error getting days in month:', error);
      return 31;
    }
  };

  const getFirstDayOfMonth = (date) => {
    try {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    } catch (error) {
      console.error('Error getting first day of month:', error);
      return 0;
    }
  };

  const formatDateKey = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getDateColor = (dayData) => {
    if (!dayData) return 'text-danger'; // No meals - Red
    if (dayData.morning && dayData.evening) return 'text-success'; // Both meals - Green
    return 'text-black'; // One meal - Yellow
  };

  const generateCalendar = () => {
    const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const daysInMonth = getDaysInMonth(safeCurrentDate);
    const firstDay = getFirstDayOfMonth(safeCurrentDate);
    const firstDayAdjusted = firstDay === 0 ? 6 : firstDay - 1;

    // Header row
    const headerRow = (
      <div className="d-flex justify-content-between mb-3">
        {weekDays.map((day) => (
          <div key={day} className="text-center calanderHeight">
            <small className="text-secondary">{day}</small>
          </div>
        ))}
      </div>
    );

    const generateDays = () => {
      const days = [];
      let dayCount = 1;
      const totalCells = Math.ceil((firstDayAdjusted + daysInMonth) / 7) * 7;

      for (let i = 0; i < totalCells; i++) {
        const isEmptyStart = i < firstDayAdjusted;
        const isEmptyEnd = dayCount > daysInMonth;
        const currentDay = dayCount;

        const dateKey = formatDateKey(
          safeCurrentDate.getFullYear(),
          safeCurrentDate.getMonth(),
          currentDay
        );
        const dayData = calendarData[dateKey];

        const isSelected = selectedDate && (
          selectedDate.getDate() === currentDay &&
          selectedDate.getMonth() === safeCurrentDate.getMonth() &&
          selectedDate.getFullYear() === safeCurrentDate.getFullYear()
        );

        if (isEmptyStart || isEmptyEnd) {
          days.push(
            <div key={`empty-${i}`} className="text-center  cursor-pointer border border-gray-200 calanderHeight " >
              <div className="p-2 setHeight   cursor-pointer calanderHeight ">-</div>
            </div>
          );
        } else {
          const dateColor = getDateColor(dayData);
          days.push(
            <div
              key={currentDay}
              className="text-center  cursor-pointer border border-gray-200 calanderHeight "

              onClick={() => handleDateClick(currentDay)}
            >
              <div className={`d-flex  flex-column align-items-center justify-content-center setHeight ${isSelected ? 'bg-danger text-white rounded text-white' : ''
                }`}>
                <div className={!isSelected ? dateColor : ''}>{currentDay}</div>
                {dayData?.morning && (
                  <small className="bg-light text-success border border-gray rounded px-1 font-8 mb-1">
                    Lunch
                  </small>
                )}
                {dayData?.evening && (
                  <small className="bg-light text-black border border-gray rounded px-1 font-8">
                    Dinner
                  </small>
                )}
              </div>
            </div>
          );
          dayCount++;
        }
      }
      return days;
    };

    return (
      <div>
        {headerRow}
        <div className="d-flex flex-wrap">
          {generateDays()}
        </div>
      </div>
    );
  };

  return generateCalendar();
};

const History = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealHistory, setMealHistory] = useState({});
  const [totalMeals, setTotalMeals] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setUsername] = useState('UserName');

  const fetchMealHistory = async () => {
    const user_id = localStorage.getItem('id');
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/getUserOrderHistory/${user_id}`);

      if (!response.ok) throw new Error('Failed to fetch meal history');

      const data = await response.json();

      // Transform the orders data into the required format
      const transformedHistory = {};
      if (data.data.orders && Array.isArray(data.data.orders)) {
        data.data.orders.forEach(order => {
          const dateKey = order.menu_date;
          if (!transformedHistory[dateKey]) {
            transformedHistory[dateKey] = [];
          }
          transformedHistory[dateKey].push(order);
        });
      }
      setUsername(data.data.summary.date_range.username)
      setMealHistory(transformedHistory);
     
      setTotalMeals(data.data.summary.total_orders);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching meal history:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMealHistory();
  }, []);

  const generateCalendarData = () => {
    const calendarData = {};
    if (mealHistory && typeof mealHistory === 'object') {
      Object.entries(mealHistory).forEach(([date, meals]) => {
        if (Array.isArray(meals)) {
          calendarData[date] = meals.reduce((acc, meal) => {
            if (meal.meal_time === 'morning') acc.morning = true;
            if (meal.meal_time === 'evening') acc.evening = true;
            return acc;
          }, {});
        }
      });
    }
    return calendarData;
  };

  const calendarData = generateCalendarData();

  const changeMonth = (increment) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
  };

  const handleDateClick = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  const getSelectedDateMeals = () => {
    const dateKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    return mealHistory[dateKey] || [];
  };

  // if (error) {
  //   return (
  //     <div className="p-4 text-center text-danger">
  //       <p>Error loading meal history: {error}</p>
  //       <button className="btn btn-primary" onClick={fetchMealHistory}>
  //         Retry
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="bg-light min-vh-100 mb-5">
        {/* Header Section */}
        <div className="bg-dark p-4 rounded-bottom-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <img
              src="/logo1.png"
              alt="PacknD"
              className="h-8"
              loading="lazy"
            />
            <div className="bg-light h-7 w-7 d-flex justify-content-center aling-item-center rounded ">
              <img src="/nav/Translate.png" alt="PacknD" className="h-6" loading="lazy" />
            </div>
          </div>
          <div className="text-white text-center">
            <p className="fw-bold text-white mb-2">Hey {name} you have ordered</p>
            <h1
              className="display-4 fw-bold mb-0 custom-text-gradient"
              // style={{
              //   background: '',
              //   WebkitBackgroundClip: 'text',
              //   WebkitTextFillColor: 'transparent'
              // }}
            >
              {isLoading ? 'Loading...' : `${totalMeals} Meals`}
            </h1>
            {/* <small className="text-white">claim reward &gt;</small> */}
          </div>
        </div>

        {/* Calendar Section */}
        <div className="p-4 mb-3">
          <div className="mb-4">
            <h2 className="h4 mb-3">Choose Date</h2>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <span className="h5">{currentDate.getFullYear()}</span>
                <span className="ms-4 h5">
                  {currentDate.toLocaleString('default', { month: 'short' })}
                </span>
              </div>
              <div>
                <button
                  className="btn btn-light me-2"
                  onClick={() => changeMonth(-1)}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  className="btn btn-light"
                  onClick={() => changeMonth(1)}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            <div className="bg-white rounded-4 p-2">
              <Calendar
                currentDate={currentDate}
                selectedDate={selectedDate}
                calendarData={calendarData}
                handleDateClick={handleDateClick}
              />
            </div>
          </div>

          {/* Orders Section */}
          <div>
            <h3 className="mb-2 fw-bold" style={{ fontSize: '12px' }}>
              YOUR ORDERS ON {selectedDate.toDateString()}
            </h3>
            {getSelectedDateMeals().map((meal, index) => (
              <MealCard key={index} meal={meal} isLast={index === meal.length - 1} />
            ))}
          </div>
        </div>

        {/* Navigation */}

      </div>
      <Nav /></>
  );
};

export default History;