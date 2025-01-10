import {  Plus, Minus } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const LoadingPlaceholder = () => (
    <div className="animate-pulse grid grid-cols-2 gap-3">
        <div className="h-16 bg-gray-200 rounded-lg"></div>
        <div className="h-16 bg-gray-200 rounded-lg"></div>
    </div>
);

const ExistingOrderDisplay = ({ order }) => {
    if (!order) return null;

    return (
        <div className="max-w-2xl mx-auto rounded-lg shadow-sm overflow-hidden mb-4">
            {/* Header Section */}
            <div className="px-6 py-4 border-b text-center">
                <div className="flex justify-center items-center gap-3">
                    <div className="p-2 rounded-full">
                        {/* Optionally, use an icon or text instead of the image */}
                        <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-red-600 text-xs">🍽️</span>
                    </div>
                    <div>
                        <h6 className="text-red-600 font-bold text-xs">Your Existing Order</h6>
                        <p className="text-red-500/70 text-xs mt-0.5">
                            Order confirmed  {order.menu_date}
                        </p>
                    </div>
                </div>
            </div>

            {/* Order Details Grid Section */}
            <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                    {/* Bread Section */}
                    <div className="rounded-lg p-4 text-center">
                        <div className="flex justify-center items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg">
                                <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-amber-800 text-xs">🍞</span>
                            </div>
                            <span className="text-xs font-medium text-amber-800">Bread</span>
                        </div>
                        <p className="text-xs font-medium text-gray-800">{order.bread_name}</p>
                    </div>

                    {/* Sabji 1 Section */}
                    <div className="rounded-lg p-4 text-center">
                        <div className="flex justify-center items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg">
                                <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-green-800 text-xs">🥦</span>
                            </div>
                            <span className="text-xs font-medium text-green-800">Sabji 1</span>
                        </div>
                        <p className="text-xs font-medium text-gray-800">{order.sabji1_name}</p>
                    </div>

                    {/* Sabji 2 Section */}
                    <div className="rounded-lg p-4 text-center">
                        <div className="flex justify-center items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg">
                                <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-green-800 text-xs">🥬</span>
                            </div>
                            <span className="text-xs font-medium text-green-800">Sabji 2</span>
                        </div>
                        <p className="text-xs font-medium text-gray-800">{order.sabji2_name}</p>
                    </div>

                    {/* Quantity Section */}
                    <div className="rounded-lg p-4 text-center">
                        <div className="flex justify-center items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg">
                                <div className="w-6 h-6 flex items-center justify-center text-blue-600 font-bold text-xs">
                                    {order.quantity}
                                </div>
                            </div>
                            <span className="text-xs font-medium text-blue-800">Quantity</span>
                        </div>
                        <p className="text-xs font-medium text-gray-800">
                            {order.quantity} {order.quantity > 1 ? 'portions' : 'portion'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div className="px-6 py-3 border-t text-center">
                <div className="flex justify-center items-center gap-2">
                    <p className="text-xs text-gray-500">Order ID: #{order.id || 'N/A'}</p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs font-medium text-green-600">Confirmed</span>
                    </div>
                </div>
            </div>
        </div>



    );
};

const MealOption = ({ option, isSelected, onSelect, category, image }) => (
    <div
        className={`w-full h-full p-2 cursor-pointer rounded-lg transition-all duration-200 
      ${isSelected ? 'ring-2 ring-red-500 bg-red-50' : 'hover:bg-gray-50'}`}
        onClick={() => onSelect(category, option.id)}
    >
        <div className="flex gap-2 items-center">
            <img
                src={image || "/meal.png"}
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

const MealSection = ({ title, description, options = [], category, selectedOption, onSelect, isLoading, error, allowMultiple = false, img }) => (
    <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
            <img
                src={img}
                alt=""
                className="w-5 h-5 rounded-full"
            />
            <div>
                <h6 className="text-sm font-bold">{title}</h6>
                <p className="text-xs text-gray-500">
                    {description}
                    {allowMultiple && " (You can select up to 2 options)"}
                </p>
            </div>
        </div>
        <div className="px-4">
            {isLoading ? (
                <LoadingPlaceholder />
            ) : error ? (
                <div className="text-gray-500 text-sm text-center py-4">
                    {error}
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-3">
                    {options.map((option) => (
                        <MealOption
                            key={option.id}
                            option={option}
                            category={category}
                            isSelected={Array.isArray(selectedOption)
                                ? selectedOption.includes(option.id)
                                : selectedOption === option.id}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            )}
        </div>
    </div>
);

const NoMenuDisplay = ({ error }) => (
    <div className="text-center p-8 bg-gray-50 rounded-lg">
        <div className="text-lg font-medium text-gray-600 mb-2">
            Menu Not Updated
        </div>
        <p className="text-sm text-gray-500">
            {error === 'Menu not Updated for selected date'
                ? 'The menu for this date has not been updated yet. Please check back later.'
                : error}
        </p>
    </div>
);

const QuantitySelector = ({ quantity, onIncrease, onDecrease }) => (
    <div className="flex items-center justify-center px-2">
        <button
            onClick={onDecrease}
            className="flex flex-col border border-red-500 items-center bg-red-500 bg-opacity-30 py-2 px-1 rounded-lg"
            aria-label="Decrease quantity"
        >
            <Minus className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center rounded-lg p-2">
            <span className=" font-extrabold text-gray-800 select-none">
                {quantity}
            </span>
        </div>
        <button
            onClick={onIncrease}
            className="flex flex-col items-center bg-red-500 bg-opacity-30 rounded-lg px-1 py-2 border border-red-500"
            aria-label="Increase quantity"
        >
            <Plus className="w-6 h-6" />
        </button>
    </div>
);

const Lunch = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [weekOffset, setWeekOffset] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isConfirming, setIsConfirming] = useState(false);
    const [existingOrder, setExistingOrder] = useState(null);
    const [selectedMeals, setSelectedMeals] = useState({
        bread: null,
        sabji1: [],
        sabji2: null
    });

    const [mealOptions, setMealOptions] = useState({
        bread: { data: [], isLoading: true, error: null },
        sabji1: { data: [], isLoading: true, error: null },
        sabji2: { data: [], isLoading: true, error: null },
        daily_menu_id: null
    });

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

    const fetchMealOptions = async () => {
        const userid = localStorage.getItem('id');
        try {
            if (!userid) {
                throw new Error('User ID not found. Please log in again.');
            }

            setMealOptions(prev => ({
                bread: { ...prev.bread, isLoading: true, error: null },
                sabji1: { ...prev.sabji1, isLoading: true, error: null },
                sabji2: { ...prev.sabji2, isLoading: true, error: null },
                daily_menu_id: null
            }));

            const dateStr = `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`;
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/getTodayMenu/${userid}/${dateStr}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const jsonData = await response.json();

            if (jsonData.status === 'success') {
                // Check for existing order first
                if (jsonData.data?.existing_orders?.morning?.[0]) {
                    setExistingOrder(jsonData.data.existing_orders.morning[0]);
                    setMealOptions(prev => ({
                        ...prev,
                        bread: { data: [], isLoading: false, error: null },
                        sabji1: { data: [], isLoading: false, error: null },
                        sabji2: { data: [], isLoading: false, error: null }
                    }));
                } else if (jsonData.data?.menu?.morning?.[0]) {
                    // No existing order, show available options
                    setExistingOrder(null);
                    const morningMenu = jsonData.data.menu.morning[0];
                    setMealOptions({
                        bread: { data: morningMenu.bread_options || [], isLoading: false, error: null },
                        sabji1: { data: morningMenu.sabji1_options || [], isLoading: false, error: null },
                        sabji2: { data: morningMenu.sabji2_options || [], isLoading: false, error: null },
                        daily_menu_id: morningMenu.id
                    });
                } else {
                    throw new Error('Menu not found for selected date');
                }
            } else {
                throw new Error('Menu not found for selected date');
            }
        } catch (error) {
            const errorMessage = error.message || 'Failed to fetch meal options';
            setMealOptions(prev => ({
                bread: { data: [], isLoading: false, error: errorMessage },
                sabji1: { data: [], isLoading: false, error: errorMessage },
                sabji2: { data: [], isLoading: false, error: errorMessage },
                daily_menu_id: null
            }));
            console.error(errorMessage);
        }
    };

    useEffect(() => {
        if (selectedDate) {
            fetchMealOptions();
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

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setSelectedMeals({
            bread: null,
            sabji1: [],
            sabji2: null
        });
        setQuantity(1);
        setExistingOrder(null);
    };

    const handleWeekChange = (direction) => {
        setWeekOffset((prev) => prev + direction);
    };

    const handleMealSelection = (category, optionId) => {
        if (category === 'sabji1') {
            setSelectedMeals(prev => {
                const currentSelections = prev.sabji1;
                let newSelections;

                if (currentSelections.includes(optionId)) {
                    newSelections = currentSelections.filter(id => id !== optionId);
                } else if (currentSelections.length < 2) {
                    newSelections = [...currentSelections, optionId];
                } else {
                    newSelections = [...currentSelections.slice(1), optionId];
                }

                return {
                    ...prev,
                    sabji1: newSelections
                };
            });
        } else {
            setSelectedMeals(prev => ({
                ...prev,
                [category]: optionId
            }));
        }
    };

    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const validateMealSelection = () => {
        if (!selectedDate) {
            throw new Error('Please select a date first');
        }

        if (!selectedMeals.bread || !selectedMeals.sabji1[0] || !selectedMeals.sabji2) {
            throw new Error('Please select required options for each category');
        }

        if (!mealOptions.daily_menu_id) {
            throw new Error('Menu information not found');
        }

        const user_id = localStorage.getItem("id");
        if (!user_id) {
            throw new Error('User ID not found. Please log in again.');
        }

        return user_id;
    };

    const confirmTodayMeal = async () => {
        try {
            const user_id = validateMealSelection();
            const menu_date = `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`;

            const payload = {
                menu_date,
                sabji1_id: selectedMeals.sabji1[0] || null,
                sabji2_id: selectedMeals.sabji2,
                bread_id: selectedMeals.bread,
                user_id,
                daily_menu_id: mealOptions.daily_menu_id,
                quantity: quantity.toString(),
                meal_time: 'morning'
            };

            setIsConfirming(true);

            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/confirmMeal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload),
            });

            const responseText = await response.text();
            let data;

            try {
                data = JSON.parse(responseText);
            } catch (e) {
                if (responseText.includes('<!DOCTYPE html>') || responseText.includes('<html>')) {
                    throw new Error('Server returned HTML instead of JSON. This might indicate a server error.');
                }
                throw new Error(`Invalid response format: ${responseText.substring(0, 100)}...`);
            }

            if (response.ok) {
                toast.success('Meal confirmed successfully!');
                fetchMealOptions(); // Refresh to show the new order
            } else {
                throw new Error(data?.message || 'Failed to confirm meal');
            }
        } catch (error) {
            toast.error(error.message || 'An error occurred while confirming the meal');
            console.error('Error confirming meal:', error);
        } finally {
            setIsConfirming(false);
        }
    };

    const dates = getWeekDates(weekOffset);


//  console.log("existingOrder",existingOrder.sabji2_name);

    return (
        <>
            <div className="max-w-2xl mx-auto p-4">
                <div className="mb-6">
                    <h6 className="text-red-500 text-center font-bold text-sm mb-1">Morning Meals</h6>
                    <p className="text-gray-500 text-center text-xs mb-4">Prepare your week meal today</p>

                    <div className="flex justify-between items-center">


                        <div className="grid grid-cols-7 gap-4 sm:grid-cols-5 md:grid-cols-7">
                            {dates.map((date) => (
                                <div
                                    key={date.day}
                                    onClick={() => handleDateClick(date)}
                                    className={`min-w-[40px] p-2 text-center cursor-pointer transition-all duration-200 rounded
          ${selectedDate?.day === date.day
                                            ? 'border border-black rounded'
                                            : 'bg-white hover:bg-gray-50 shadow-sm'}
          sm:min-w-[50px] md:min-w-[60px] lg:min-w-[70px]`}>
                                    <span className="block text-xs sm:text-sm md:text-base">{date.day}</span>
                                    <span className="text-xs sm:text-sm md:text-base">{date.weekday}</span>
                                </div>
                            ))}
                        </div>


                    </div>

                </div>

                {existingOrder ? (
                    <ExistingOrderDisplay order={existingOrder} />
                ) : (
                    <>
                        {mealOptions.bread.error ? (
                            <NoMenuDisplay error={mealOptions.bread.error} />
                        ) : (
                            <>
                                <div className="space-y-6">
                                    <MealSection
                                        title="Bread"
                                        description="Select your bread preference"
                                        options={mealOptions.bread.data}
                                        category="bread"
                                        selectedOption={selectedMeals.bread}
                                        img='/meal/Bread.png'
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
                                        img='/meal/sabji1.png'
                                        isLoading={mealOptions.sabji1.isLoading}
                                        error={mealOptions.sabji1.error}
                                        allowMultiple={true}
                                    />

                                    <MealSection
                                        title="Sabji 2"
                                        description="Select your second sabji"
                                        options={mealOptions.sabji2.data}
                                        category="sabji2"
                                        img='/meal/sabji2.png'
                                        image=''
                                        selectedOption={selectedMeals.sabji2}
                                        onSelect={handleMealSelection}
                                        isLoading={mealOptions.sabji2.isLoading}
                                        error={mealOptions.sabji2.error}
                                    />
                                </div>

                                <div className="mt-4 flex items-center border px-2 py-2 rounded-lg mb-4 w-full">
                                    <QuantitySelector
                                        quantity={quantity}
                                        onIncrease={increaseQuantity}
                                        onDecrease={decreaseQuantity}
                                    />
                                    <button
                                        className="flex-1 bg-red-500 text-white px-1 py-1 rounded-lg font-medium text-sm hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={confirmTodayMeal}
                                        disabled={!selectedDate || isConfirming || mealOptions.bread.error}
                                        style={{ fontSize: '0.4rem' }}
                                    >
                                        {isConfirming ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <span>Confirming...</span>
                                            </div>
                                        ) : selectedDate ? (
                                            `Confirm Lunch for ${selectedDate.day} ${selectedDate.month}, ${selectedDate.year}`
                                        ) : (
                                            'Select a date to confirm lunch'
                                        )}
                                    </button>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default Lunch;