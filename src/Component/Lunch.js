import React, { useState } from 'react';

const Lunch = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [weekOffset, setWeekOffset] = useState(0);

    // Generate the dates dynamically based on the current date and week offset
    const getWeekDates = (offset) => {
        const today = new Date();
        today.setDate(today.getDate() + offset * 7); // Adjust by week offset

        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            return {
                day: date.getDate().toString().padStart(2, '0'),
                weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
                month: date.toLocaleDateString('en-US', { month: 'long' }),
                year: date.getFullYear()
            };
        });
    };

    const dates = getWeekDates(weekOffset);

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const handleNextWeek = () => {
        setWeekOffset((prevOffset) => prevOffset + 1);
    };


    return (
        <div>
            {/* Future Dates */}
            <div className="mb-4">
                <h6 className="mb-1 text-danger text-center mt-2" style={{ fontSize: '0.9rem', fontWeight: 'bold', minWidth: '50px' }}>Future Meals</h6>
                <p className="text-muted mb-3 text-center" style={{ fontSize: '0.75rem' }}>Prepare your week meal today</p>

                <div className="d-flex gap-2 overflow-auto">

                    {dates.map((date) => (
                        <div key={date.day} style={{ minWidth: '50px' }} onClick={() => handleDateClick(date)}>
                            <div className={`border rounded-3 p-2 text-center ${selectedDate?.day === date.day ? 'bg-danger text-white' : ''}`}
                                style={{
                                    backgroundColor: '#fff',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                    cursor: 'pointer'
                                }}>
                                <div className="fw-medium" style={{ fontSize: '0.9rem' }}>{date.day}</div>
                                <div style={{ fontSize: '0.7rem', color: '#666' }}>{date.weekday}</div>
                                <div style={{ fontSize: '0.7rem', color: '#999' }}>{date.month}</div>
                            </div>

                        </div>
                    ))}

                </div>
            </div>


            {/* Dinner Section (Similar structure as Lunch) */}
            <div className="mb-4 mx-4">

                <div className='d-flex ' style={{ marginLeft: '-25px' }}>
                    <img src="/meal.png" alt='' className='rounded-50 mx-2' style={{ borderRadius: '50px', width: '20px', height: '20px', }} />
                    <div className=" justify-content-between align-items-center mb-2">

                        <h6 className="mb-0 " style={{ fontSize: '12px', fontWeight: 'bold' }}>Bread</h6>
                        <small style={{ fontSize: '0.75rem', color: '#6F6F6F' }}>Select your meal preferences from below</small>
                    </div>
                </div>
                {/* Same grid structure as lunch options */}
                <div className="row g-2 mb-3 mx-4">
                    <div className="col-6">
                        <div className=" h-100">
                            <div className="card-body p-2">
                                <div className="d-flex gap-2">
                                    <img src="/meal.png" alt="Option 1"
                                        className="rounded" style={{ width: '50px', height: '50px' }} />
                                    <div>
                                        <div style={{ fontSize: '0.8rem' }}>Option 1</div>
                                        <div style={{ fontSize: '0.7rem', color: '#666' }}>Qty : 1</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className=" h-100">
                            <div className="card-body p-2">
                                <div className="d-flex gap-2">
                                    <img src="/meal.png" alt="Option 2"
                                        className="rounded" style={{ width: '50px', height: '50px' }} />
                                    <div>
                                        <div style={{ fontSize: '0.8rem' }}>Option 2</div>
                                        <div style={{ fontSize: '0.7rem', color: '#666' }}>Qty : 1</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='d-flex ' style={{ marginLeft: '-25px' }}>
                    <img src="/meal.png" alt='' className='rounded-50 mx-2' style={{ borderRadius: '50px', width: '20px', height: '20px', }} />
                    <div className=" justify-content-between align-items-center mb-2">

                        <h6 className="mb-0 " style={{ fontSize: '12px', fontWeight: 'bold' }}>Sabji 1</h6>
                        <small style={{ fontSize: '0.75rem', color: '#6F6F6F' }}>Select your meal preferences from below</small>
                    </div>
                </div>
                {/* Same grid structure as lunch options */}
                <div className="row g-2 mb-3 mx-4">
                    <div className="col-6">
                        <div className=" h-100">
                            <div className="card-body p-2">
                                <div className="d-flex gap-2">
                                    <img src="/meal.png" alt="Option 1"
                                        className="rounded" style={{ width: '50px', height: '50px' }} />
                                    <div>
                                        <div style={{ fontSize: '0.8rem' }}>Option 1</div>
                                        <div style={{ fontSize: '0.7rem', color: '#666' }}>Qty : 1</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className=" h-100">
                            <div className="card-body p-2">
                                <div className="d-flex gap-2">
                                    <img src="/meal.png" alt="Option 2"
                                        className="rounded" style={{ width: '50px', height: '50px' }} />
                                    <div>
                                        <div style={{ fontSize: '0.8rem' }}>Option 2</div>
                                        <div style={{ fontSize: '0.7rem', color: '#666' }}>Qty : 1</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className=" h-100">
                            <div className="card-body p-2">
                                <div className="d-flex gap-2">
                                    <img src="/meal.png" alt="Option 1"
                                        className="rounded" style={{ width: '50px', height: '50px' }} />
                                    <div>
                                        <div style={{ fontSize: '0.8rem' }}>Option 1</div>
                                        <div style={{ fontSize: '0.7rem', color: '#666' }}>Qty : 1</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className=" h-100">
                            <div className="card-body p-2">
                                <div className="d-flex gap-2">
                                    <img src="/meal.png" alt="Option 2"
                                        className="rounded" style={{ width: '50px', height: '50px' }} />
                                    <div>
                                        <div style={{ fontSize: '0.8rem' }}>Option 2</div>
                                        <div style={{ fontSize: '0.7rem', color: '#666' }}>Qty : 1</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* sabji2 */}

                <div className='d-flex ' style={{ marginLeft: '-25px' }}>
                    <img src="/meal.png" alt='' className='rounded-50 mx-2' style={{ borderRadius: '50px', width: '20px', height: '20px', }} />
                    <div className=" justify-content-between align-items-center mb-2">

                        <h6 className="mb-0 " style={{ fontSize: '12px', fontWeight: 'bold' }}>Sabji 2</h6>
                        <small style={{ fontSize: '0.75rem', color: '#6F6F6F' }}>Select your meal preferences from below</small>
                    </div>
                </div>
                {/* Same grid structure as lunch options */}
                <div className="row g-2 mb-3 mx-4">
                    <div className="col-6">
                        <div className=" h-100">
                            <div className="card-body p-2">
                                <div className="d-flex gap-2">
                                    <img src="/meal.png" alt="Option 1"
                                        className="rounded" style={{ width: '50px', height: '50px' }} />
                                    <div>
                                        <div style={{ fontSize: '0.8rem' }}>Option 1</div>
                                        <div style={{ fontSize: '0.7rem', color: '#666' }}>Qty : 1</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className=" h-100">
                            <div className="card-body p-2">
                                <div className="d-flex gap-2">
                                    <img src="/meal.png" alt="Option 2"
                                        className="rounded" style={{ width: '50px', height: '50px' }} />
                                    <div>
                                        <div style={{ fontSize: '0.8rem' }}>Option 2</div>
                                        <div style={{ fontSize: '0.7rem', color: '#666' }}>Qty : 1</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>




            {selectedDate && (
                <div className="text-center mb-4">
                    <button className="btn btn-danger w-100" style={{ borderRadius: '12px' }}>
                        Confirm Lunch For {selectedDate.day} {selectedDate.weekday}, {selectedDate.month} {selectedDate.year}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Lunch;

