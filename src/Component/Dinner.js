import { ArrowBigLeft, ArrowBigRight, Plus, Minus } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const LoadingPlaceholder = () => (
    <div className="animate-pulse grid grid-cols-2 gap-3">
        <div className="h-16 bg-gray-200 rounded-lg"></div>
        <div className="h-16 bg-gray-200 rounded-lg"></div>
    </div>
);

const MealOption = ({ option, isSelected, onSelect, category }) => (
    <div
        className={`w-full h-full p-2 cursor-pointer rounded-lg transition-all duration-200 
      ${isSelected ? 'ring-2 ring-red-500 bg-red-50' : 'hover:bg-gray-50'}`}
        onClick={() => onSelect(category, option.id)}
    >
        <div className="flex gap-2 items-center">
            <img
                src={option.image || "meal.png"}
                alt={option.name}
                className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
                <div className="text-sm font-medium">{option.name}</div>
                <div className="text-xs text-gray-500">Qty: {option.quantity || 1}</div>
            </div>
        </div>
    </div>
);

const MealSection = ({ title, description, options, category, selectedOption, onSelect, isLoading, error }) => (
    <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
            <img
                src="meal.png"
                alt=""
                className="w-5 h-5 rounded-full"
            />
            <div>
                <h6 className="text-sm font-bold">{title}</h6>
                <p className="text-xs text-gray-500">{description}</p>
            </div>
        </div>
        <div className="px-4">
            {isLoading ? (
                <LoadingPlaceholder />
            ) : error ? (
                <div className="text-gray-500 text-sm text-center py-4">Meal not updated</div>
            ) : (
                <div className="grid grid-cols-2 gap-3">
                    {options.map((option) => (
                        <MealOption
                            key={option.id}
                            option={option}
                            category={category}
                            isSelected={selectedOption === option.id}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            )}
        </div>
    </div>
);

const QuantitySelector = ({ quantity, onIncrease, onDecrease }) => (
    <div className="flex items-center justify-center gap-4 mb-6">
        <button
            onClick={onDecrease}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
            <Minus className="w-5 h-5 text-gray-600" />
        </button>
        <span className="text-lg font-medium">Quantity: {quantity}</span>
        <button
            onClick={onIncrease}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
            <Plus className="w-5 h-5 text-gray-600" />
        </button>
    </div>
);

const Dinner = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [weekOffset, setWeekOffset] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedMeals, setSelectedMeals] = useState({
        bread: null,
        sabji1: null,
        sabji2: null
    });

    const [mealOptions, setMealOptions] = useState({
        bread: { data: [], isLoading: true, error: null },
        sabji1: { data: [], isLoading: true, error: null },
        sabji2: { data: [], isLoading: true, error: null }
    });

    // Set today's date as default on component mount
    useEffect(() => {
        const today = new Date();
        const defaultDate = {
            day: today.getDate().toString().padStart(2, '0'),
            month: (today.getMonth() + 1).toString().padStart(2, '0'),
            year: today.getFullYear(),
            weekday: today.toLocaleDateString('en-US', { weekday: 'short' })
        };
        setSelectedDate(defaultDate);
    }, []);

    const fetchMealOptions = async (category) => {
        const userid = localStorage.getItem('id');
        try {
            if (!userid) {
                throw new Error('User ID not found');
            }

            setMealOptions(prev => ({
                ...prev,
                [category]: { ...prev[category], isLoading: true, error: null }
            }));
            
            const dateStr = `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`;
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/getTodayMenu/${userid}/${dateStr}`);
            const responseText = await response.text();

            try {
                const jsonData = JSON.parse(responseText);

                if (!jsonData.data?.menu?.evening?.[0]) {
                    throw new Error('Menu not found');
                }

                const eveningMenu = jsonData.data.menu.evening[0];
                let data = [];

                switch (category) {
                    case 'bread':
                        data = [{
                            id: eveningMenu.bread_id,
                            name: eveningMenu.bread_name,
                            quantity: 1
                        }];
                        break;
                    case 'sabji1':
                        data = [{
                            id: eveningMenu.sabji1_id,
                            name: eveningMenu.sabji1_name,
                            quantity: 1
                        }];
                        break;
                    case 'sabji2':
                        data = [{
                            id: eveningMenu.sabji2_id,
                            name: eveningMenu.sabji2_name,
                            quantity: 1
                        }];
                        break;
                    default:
                        data = [];
                }

                setMealOptions(prev => ({
                    ...prev,
                    [category]: { data, isLoading: false, error: null }
                }));

            } catch (e) {
                throw new Error('Menu not found');
            }

        } catch (error) {
            setMealOptions(prev => ({
                ...prev,
                [category]: { data: [], isLoading: false, error: error.message }
            }));
        }
    };

    useEffect(() => {
        if (selectedDate) {
            fetchMealOptions('bread');
            fetchMealOptions('sabji1');
            fetchMealOptions('sabji2');
        }
    }, [selectedDate]);

    const getWeekDates = (offset) => {
        const today = new Date();
        today.setDate(today.getDate() + offset * 7);

        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            return {
                day: date.getDate().toString().padStart(2, '0'),
                weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
                month: (date.getMonth() + 1).toString().padStart(2, '0'),
                year: date.getFullYear()
            };
        });
    };

    const dates = getWeekDates(weekOffset);

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const handleWeekChange = (direction) => {
        setWeekOffset((prev) => prev + direction);
    };

    const handleMealSelection = (category, optionId) => {
        setSelectedMeals(prev => ({
            ...prev,
            [category]: optionId
        }));
    };

    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const confirmTodayMeal = async () => {
        if (!selectedDate) {
            toast('Please select a date first');
            return;
        }

        if (!selectedMeals.bread || !selectedMeals.sabji1 || !selectedMeals.sabji2) {
            toast('Please select one option for each category');
            return;
        }

        const user_id = localStorage.getItem("id");
        const menu_date = `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`;

        const payload = {
            menu_date,
            sabji1_id: selectedMeals.sabji1,
            sabji2_id: selectedMeals.sabji2,
            bread_id: selectedMeals.bread,
            user_id,
            quantity,
            meal_time: 'evening'
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/confirmMeal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const responseText = await response.text();

            if (responseText.trim().startsWith('{')) {
                const data = JSON.parse(responseText);
                if (response.ok) {
                    toast('Meal confirmed successfully!');
                    setSelectedMeals({
                        bread: null,
                        sabji1: null,
                        sabji2: null,
                    });
                    setSelectedDate(null);
                    setQuantity(1);
                } else {
                    toast(`Failed to confirm meal: ${data.message || 'Unknown error'}`);
                }
            } else {
                if (response.ok) {
                    toast('Meal confirmed successfully!');
                    setSelectedMeals({
                        bread: null,
                        sabji1: null,
                        sabji2: null,
                    });
                    setSelectedDate(null);
                    setQuantity(1);
                } else {
                    toast(`Server error: ${response.status} ${response.statusText}`);
                }
            }
        } catch (error) {
            toast('An error occurred while confirming the meal. Please try again.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="mb-6">
                <h6 className="text-red-500 text-center font-bold text-sm mb-1">Evening Meals</h6>
                <p className="text-gray-500 text-center text-xs mb-4">Prepare your week meal today</p>

                <div className="flex items-center gap-2 justify-between">
                    <ArrowBigLeft
                        className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700"
                        onClick={() => handleWeekChange(-1)}
                    />

                    <div className="flex gap-2 overflow-x-auto py-2 flex-1 justify-center">
                        {dates.map((date) => (
                            <div
                                key={date.day}
                                onClick={() => handleDateClick(date)}
                                className={`min-w-[40px] rounded-lg p-2 text-center cursor-pointer transition-all duration-200
                                    ${selectedDate?.day === date.day
                                        ? 'bg-red-500 text-white'
                                        : 'bg-white hover:bg-gray-50 shadow-sm'
                                    }`}
                            >
                                <div className="text-sm font-medium">{date.day}</div>
                                <div className="text-xs opacity-80">{date.weekday}</div>
                                <div className="text-xs opacity-60">{date.month}</div>
                            </div>
                        ))}
                    </div>

                    <ArrowBigRight
                        className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700"
                        onClick={() => handleWeekChange(1)}
                    />
                </div>
            </div>

            <div className="space-y-6">
                <MealSection
                    title="Bread"
                    description="Select your bread preference"
                    options={mealOptions.bread.data}
                    category="bread"
                    selectedOption={selectedMeals.bread}
                    onSelect={handleMealSelection}
                    isLoading={mealOptions.bread.isLoading}
                    error={mealOptions.bread.error}
                />

                <MealSection
                    title="Sabji 1"
                    description="Select your first sabji"
                    options={mealOptions.sabji1.data}
                    category="sabji1"
                    selectedOption={selectedMeals.sabji1}
                    onSelect={handleMealSelection}
                    isLoading={mealOptions.sabji1.isLoading}
                    error={mealOptions.sabji1.error}
                />

                <MealSection
                    title="Sabji 2"
                    description="Select your second sabji"
                    options={mealOptions.sabji2.data}
                    category="sabji2"
                    selectedOption={selectedMeals.sabji2}
                    onSelect={handleMealSelection}
                    isLoading={mealOptions.sabji2.isLoading}
                    error={mealOptions.sabji2.error}
                />
            </div>

            <QuantitySelector
                quantity={quantity}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
            />

            <div className="mt-6">
                <button
                    className="w-full bg-red-500 text-white py-3 px-2 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={confirmTodayMeal}
                    disabled={!selectedDate}
                    style={{ fontSize: '12px' }}
                >
                    {selectedDate
                        ? `Confirm Evening Meal For the Date ${selectedDate.day} ${selectedDate.month} ${selectedDate.year}`
                        : 'Select a date to confirm'}
                </button>
            </div>
        </div>
    );
};

export default Dinner;