  import React, { useState } from 'react';
  import { ChevronRight, ChevronLeft } from 'lucide-react';
  import Nav from './Nav';

  // Meal Card Component
  const MealCard = ({ meal }) => (
    <div className='d-flex mb-4'>
      <span className="text-secondary justify-content-center align-items-center mt-2 mx-2">
        {meal.type}
      </span>
      <div
        className="rounded-2 p-3 mb-3"
        style={{ backgroundColor: 'rgba(121, 144, 248, 0.1)' }}
      >
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className='d-flex'>
            <div className='icon-circle mx-2'></div>
            <h4 className="h6 mb-0" style={{ fontSize: '10px' }}>{meal.title}</h4>
          </div>
          <span className="text-secondary" style={{ fontSize: '10px' }}>{meal.quantity}</span>
        </div>
        <p className="text-secondary small mb-0 mx-2" style={{ fontSize: '10px' }}>{meal.items}</p>
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
      if (dayData.Lunch && dayData.Dinner) return 'text-success'; // Both meals - Green
      if (dayData.Lunch || dayData.Dinner) return 'text-warning'; // One meal - Yellow
      return 'text-danger'; // Default - Red
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
            <div key={day} className="text-center" style={{ width: '14.28%' }}>
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

          // Get date key for current calendar cell
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
              <div key={`empty-${i}`} className="text-center" style={{ width: '14.28%' }}>
                <div className="p-2"></div>
              </div>
            );
          } else {
            const dateColor = getDateColor(dayData);
            days.push(
              <div
                key={currentDay}
                className="text-center"
                style={{ width: '14.28%', cursor: 'pointer' }}
                onClick={() => handleDateClick(currentDay)}
              >
                <div className={`p-2 ${isSelected ? 'bg-danger text-white rounded text-white' : ''}`}>
                  <div className={!isSelected ? dateColor : ''} >{currentDay}</div>
                  {dayData?.Lunch && <small className="d-flex text-success" style={{ fontSize: '12px' }}>Lunch</small>}
                  {dayData?.Dinner && <small className="d-flex text-gray" style={{ fontSize: '12px' }}>Dinner</small>}
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
    const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 31));
    const [selectedDate, setSelectedDate] = useState(new Date(2024, 11, 31));

    // Sample meal history data with proper date formatting
    const mealHistory = {
      '2024-12-05': [
        {
          type: 'Lunch',
          title: 'Full Meal',
          items: 'Dal, Rice, Paneer sabji, Salad, Papad, Aloo Sabji, Phulke 5, Fruits',
          quantity: '2 Meals',
        }
      ],
      '2024-12-14': [
        {
          type: 'Dinner',
          title: 'Full Meal',
          items: 'Dal, Rice, Paneer sabji, Salad, Papad, Aloo Sabji, Phulke 5, Fruits',
          quantity: '1 Meal',
        }
      ],
      '2024-12-20': [
        {
          type: 'Lunch',
          title: 'Full Meal',
          items: 'Dal, Rice, Paneer sabji, Salad, Papad, Aloo Sabji, Phulke 5, Fruits',
          quantity: '1 Meal',
        },
        {
          type: 'Dinner',
          title: 'Full Meal',
          items: 'Dal, Rice, Paneer sabji, Salad, Papad, Aloo Sabji, Phulke 5, Fruits',
          quantity: '1 Meal',
        }
      ],
      // Example data for different months
      '2024-11-15': [
        {
          type: 'Lunch',
          title: 'Full Meal',
          items: 'Dal, Rice, Paneer sabji, Salad, Papad, Aloo Sabji, Phulke 5, Fruits',
          quantity: '1 Meal',
        }
      ],
      '2025-01-10': [
        {
          type: 'Dinner',
          title: 'Full Meal',
          items: 'Dal, Rice, Paneer sabji, Salad, Papad, Aloo Sabji, Phulke 5, Fruits',
          quantity: '1 Meal',
        }
      ]
    };

    // Convert meal history to calendar data format
    const generateCalendarData = () => {
      const calendarData = {};
      Object.entries(mealHistory).forEach(([date, meals]) => {
        calendarData[date] = meals.reduce((acc, meal) => {
          if (meal.type === 'Lunch') acc.Lunch = true;
          if (meal.type === 'Dinner') acc.Dinner = true;
          return acc;
        }, {});
      });
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

    return (
      <div className="bg-light min-vh-100 mb-4">
        {/* Header Section */}
        <div className="bg-dark p-4 rounded-bottom-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <img
              src="/logo1.png"
              alt="PacknD"
              className="h-8"
              loading="lazy"
            />

            
              <button className="px-3 py-1 border  rounded-full text-white transition-colors">
                立A
              </button>
          </div>
          <div className="text-white text-center">
            <p className="fw-bold text-white mb-2">Hey Pankaj you have ordered</p>
            <h1
              className="display-4 fw-bold mb-0"
              style={{
                background: 'linear-gradient(90deg, #ECAD0B 95%, #F2C34B 89%, #F6D47D 84%, #FAE1A1 79%, #FCE9B6 75%, #FDECBF 73%, #FCE9B7 66%, #FAE2A3 55%, #F7D581 41%, #F2C553 26%, #F0BC39 19%, #A37400 4%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              200 Meals
            </h1>
            <small className="text-white">claim reward &gt;</small>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="p-4">
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
            <div className="bg-white rounded-4 p-3">
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
            <h3 className="mb-4 fw-bold" style={{ fontSize: '12px' }}>
              YOUR ORDERS ON {selectedDate.toDateString()}
            </h3>
            {getSelectedDateMeals().map((meal, index) => (
              <MealCard key={index} meal={meal} />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <Nav />
      </div>
    );
  };

  export default History;