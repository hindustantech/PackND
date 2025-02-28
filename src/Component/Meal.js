import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import { Package, Gift, Sun, Moon, Award, User } from 'lucide-react';
import Lunch from './Lunch';
import Dinner from './Dinner';
// import TrailMeal from './TrailMeal';
import { NavLink } from 'react-router-dom';
// import Coupon from './Coupon';
import axios from 'axios';



const Meal = () => {
    const [mealTime, setMealTime] = useState('lunch');
    const [UserData, setUserData] = useState([]);
    const [isPaused, setIsPaused] = useState(false);
    const [Pausedtime, setIsPausedtime] = useState(false);
    const [Membership, setMembership] = useState(null);
    const [error, setError] = useState(null);
    const [banners, setBanners] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showMembershipModal, setShowMembershipModal] = useState(false);
    const [showBalance, setShowBalance] = useState(false);
    const user_id = localStorage.getItem("id");
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
    const today = new Date();


    const shouldShowLunch = !(isPaused && Pausedtime === "Morning");
    const shouldShowDinner = !(isPaused && Pausedtime === "Evening");


    const fetchBanners = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/appBanners`);
            console.log("response coupen", response.data);
            setBanners(response.data); // Store the raw data directly
        } catch (err) {
            setError(err.message);
            console.error('Error fetching banners:', err);
        } finally {
            setIsLoading(false);
        }
    };




    //   Modal body class effect
    useEffect(() => {
        if (showMembershipModal) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        // Cleanup on component unmount
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [showMembershipModal]);

    // API Functions
    const getUser = async () => {
        try {
            if (!user_id) {
                throw new Error("User ID not found in localStorage.");
            }

            const response = await fetch(`${BASE_URL}/getuser/${user_id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {

            throw error;
        }
    };

    const getUserPackageAndMenu = async () => {
        try {
            if (!user_id) {
                throw new Error("User ID not found in localStorage.");
            }

            const response = await fetch(`${BASE_URL}/getUserPackageAndMenu/${user_id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("data", data.data);
            return data;
        } catch (error) {

            throw error;
        }
    };

    // Data Fetching Effects
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUser();
                setUserData(data.user);
                setIsPaused(data.user.meal_status)
                setIsPausedtime(data.user.meal_time)
                console.log("data.user.meal_time", data.user.meal_time);
                fetchBanners();

            } catch (err) {
                setError(err.message);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchMembership = async () => {
            try {
                const data = await getUserPackageAndMenu();
                const userPackage = data.data.user_package;

                setMembership(userPackage);


                if (!userPackage) {
                    setShowMembershipModal(true);
                }
            } catch (err) {
                setError(err.message);
                setShowMembershipModal(true);
            }
        };

        fetchMembership();
    }, []);

    // Event Handlers
    const handleSubscribe = () => {
        setShowMembershipModal(false);
        document.body.classList.remove('modal-open');
        navigate('/payment');
    };

    // Membership Modal Component



    const MembershipModal = ({ isOpen, onClose, onSubscribe }) => {
        const handleClose = () => {
            document.body.classList.remove('modal-open');
            onClose();
        };

        if (!isOpen) return null;

        return (
            <>
                <div className="modal fade show"
                    style={{ display: 'block' }}
                    tabIndex="-1"
                    role="dialog"
                    aria-modal="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title d-flex align-items-center gap-2">
                                    <Package className="text-danger" size={20} />
                                    Membership Required
                                </h5>
                                <button type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={handleClose}>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p className="text-muted">
                                    You need an active membership to access meal services.
                                    Subscribe now to enjoy our delicious meals!
                                </p>
                                <div className="text-start mt-3">
                                    <p className="text-muted mb-2">Get access to:</p>
                                    <ul className="list-unstyled">
                                        <li className="mb-2">✓ Daily fresh meals</li>
                                        <li className="mb-2">✓ Special discounts</li>
                                        <li className="mb-2">✓ Surprise items</li>
                                        <li className="mb-2">✓ Reward points</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-between">
                                <button type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={handleClose}>
                                    Maybe Later
                                </button>
                                <button type="button"
                                    className="btn btn-danger"
                                    onClick={onSubscribe}>
                                    View Membership Plans
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-backdrop fade show"></div>
            </>
        );
    };



    // Main Component Render
    // Correctly implementing the conditional logic
    const MealComponent = ({ isPaused, Pausedtime, mealTime, Membership }) => {
        // First determine if we should show lunch
        const showLunch = !(isPaused && Pausedtime === 'Morning') && mealTime === 'lunch';

        // Then determine if we should show dinner
        const showDinner = !(isPaused && Pausedtime === 'Evening') && mealTime === 'dinner';

        // Check if meal is paused based on the current mealTime
        const isMealPaused = (isPaused && Pausedtime === 'Morning' && mealTime === 'lunch') ||
            (isPaused && Pausedtime === 'Evening' && mealTime === 'dinner');

        return (
            <div>
                {/* Show paused message when meal is paused */}
                {isMealPaused && (
                    <div className="p-6 bg-white rounded-lg shadow-sm mb-4  mt-3">
                        <div className="text-center">
                            <div className="mb-3">
                                <svg
                                    className="w-12 h-12 mx-auto text-yellow-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Meal Service Paused
                            </h3>
                            <p className="text-gray-600">
                                Your  meal service is temporarily paused<br />
                               
                            </p>
                        </div>
                    </div>
                )}

                {/* Only render Lunch if showLunch is true */}
                {showLunch && <Lunch membeship={Membership} />}

                {/* Only render Dinner if showDinner is true */}
                {showDinner && <Dinner membeship={Membership} />}
            </div>
        );
    };



    return (
        <div className="d-flex flex-column min-vh-100 mb-4">
            <div className="flex-grow-1 overflow-auto mb-4">
                {/* Hero Section */}
                <div className="relative w-full">
                    <div
                        className="w-full p-3 text-white rounded-b-3xl bg-img object-contain"
                        style={{
                            backgroundImage: `url(https://projectdemo.ukvalley.com/public/site_logo/${banners.banner_img})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        {/* Header Section */}
                        <div className="flex justify-between items-center mb-4 px-2 md:px-4 lg:px-6">
                            <img
                                src="/logo1.png"
                                alt="PacknD"
                                className="h-6 md:h-8 lg:h-10"
                                loading="lazy"
                            />

                            <NavLink to="/profile" className="nav-link">
                                <div className="bg-white rounded-full p-2 flex justify-center items-center shadow-md hover:bg-gray-100 transition-colors">
                                    <User className="w-5 h-5 md:w-6 md:h-6 text-red-700 fw-bold" />
                                </div>
                            </NavLink>
                        </div>

                        {/* Coupon Section */}
                        {/* <div className="w-full flex justify-center items-center mt-4 md:mt-6 lg:mt-8">
                            <div className="w-full max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
                                <Coupon />
                            </div>
                        </div> */}
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-3">
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center">
                            {/* Date display section */}
                            <div className="me-3">
                                <div className="text-danger fw-bold text-center  " style={{ fontSize: '12px' }} >{today.getDate()}</div>
                                <div className="text-muted text-center" style={{ fontSize: '9px' }}>{today.toLocaleString('default', { month: 'short' })}</div>
                            </div>

                            {/* User welcome section */}
                            <div>
                                <div
                                    className="fw-bold text-dark"
                                    style={{ fontSize: '12px' }}
                                >
                                    Welcome {UserData?.first_name}!
                                </div>
                                <div
                                    className="text-muted"
                                    style={{ fontSize: '9px', color: '#6F6F6F' }}
                                >
                                    {UserData?.address}
                                </div>
                            </div>
                        </div>
                        <button
                            className="btn btn-outline-danger rounded-3 text-black"
                            style={{ fontSize: '10px', backgroundColor: '#FFD3D3' }}
                            onClick={() => {
                                if (UserData?.my_package === 0) {
                                    // Redirect to the wallet page
                                    window.location.href = '/wallet';
                                } else {
                                    setShowBalance(!showBalance);
                                }
                            }}
                        >
                            {showBalance ? ` ₹ ${Math.trunc(Membership?.balance_amount || 0)}` : 'Show Balance'}
                        </button>


                    </div>

                    {/* Meal Time Toggle */}
                    <div className="row g-0 mb-4 rounded-4  mx-5 justify-content-center aling-item-center"
                        style={{ border: '1px solid red', overflow: 'hidden', height: '60px' }}>
                        {/* Lunch Button */}
                        <div className="col-6 mb-0" style={{ borderRight: '2px solid red' }}>
                            <button
                                className={`btn w-100 ${mealTime === 'lunch' ? '' : 'btn-light text-muted'}`}
                                onClick={() => setMealTime('lunch')}
                                style={{
                                    backgroundColor: mealTime === 'lunch' ? '#FFD3D3' : '',
                                    color: mealTime === 'lunch' ? 'red' : '',
                                    borderRadius: '0px',
                                }}>
                                <div className="d-flex align-items-center justify-content-center">
                                    <Sun />
                                    <span className="ms-2  " style={{ fontSize: '10px', fontWeight: 'bold', textWrap: 'nowrap' }}>Lunch Meal</span>
                                </div>
                                <small className="text-muted" style={{ fontSize: '8px' }}>
                                    9:00 AM to 01:00 PM
                                </small>
                            </button>
                        </div>

                        {/* Dinner Button */}
                        <div className="col-6">
                            <button
                                className={`btn w-100 ${mealTime === 'dinner' ? '' : 'btn-light text-muted'}`}
                                onClick={() => setMealTime('dinner')}
                                style={{
                                    backgroundColor: mealTime === 'dinner' ? '#453868 ' : '',
                                    color: mealTime === 'dinner' ? 'white' : '',
                                    borderRadius: '0px',
                                }}>
                                <div className="d-flex align-items-center justify-content-center">
                                    <Moon />
                                    <span className="ms-2 nowrape" style={{ fontSize: '10px', fontWeight: 'bold', textWrap: 'nowrap' }}>Dinner Meal</span>
                                </div>
                                <small className="" style={{ fontSize: '8px', }}>
                                    7:00 PM to 10:00 PM
                                </small>
                            </button>
                        </div>
                    </div>

                    {/* Membership Section */}
                    <h6 className="text-danger text-center mb-3" style={{ fontWeight: 'bold' }}>Your Membership Meal</h6>
                    {Membership ? (
                        <div className="d-flex">
                            <div style={{ minWidth: '80px' }} className="d-flex align-items-start px-2 ">
                                <img
                                    src={`https://projectdemo.ukvalley.com/public/package_image/${Membership.image}`}
                                    alt="Full Meal"
                                    className="rounded object-fit-cover"
                                    style={{ width: '110px', height: '110px' }}
                                />
                            </div>

                            <div className="card-body p-2 p-sm-3 bg-light rounded rounded-xl ">
                                <div className="d-flex gap-2 gap-sm-3">
                                    <div className="flex-grow-1">
                                        <div className="mb-1 d-flex">
                                            <h6 className="mb-1" style={{ fontSize: '0.9rem' }}>
                                                {Membership.package_name}
                                            </h6>
                                            <span className="text-dark ms-auto"
                                                style={{ fontSize: '0.5rem' }}>
                                                Pure veg
                                            </span>
                                        </div>
                                        <div className="d-flex align-items-center flex-wrap gap-1 mb-4">
                                            <small className="text-muted "
                                                style={{ fontSize: '0.5rem' }}>
                                                {Membership.description}
                                            </small>
                                        </div>
                                        <hr className="my-2" />
                                        <div className="d-flex flex-column gap-2">
                                            <div className="d-flex align-items-center flex-wrap">
                                                <div className="d-flex align-items-center me-2">
                                                    <img src='/nav/gift.png' className='h-2' />
                                                    <span className="text-dark ms-1" style={{ fontSize: '0.2rem' }}>
                                                        Surprise Item Today!
                                                    </span>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <img src='/nav/discount.png' className='h-2' />
                                                    <span className="text-dark ms-1" style={{ fontSize: '0.2rem' }}>
                                                        Complete 5 non-stop orders and get 1 free
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (

                        <>
                            {/* {mealTime === 'lunch' && <TrailMeal mealTime='morning' />}
                            {mealTime === 'dinner' && <TrailMeal mealTime='evening' />} */}

                            <div> Trail Meal </div>
                        </>

                    )}

                    {/* Meal Components */}
                    {Membership && (
                        <>




                            <MealComponent
                                isPaused={isPaused}
                                Pausedtime={Pausedtime}
                                mealTime={mealTime}
                                Membership={Membership}
                            />

                        </>
                    )}
                </div>
            </div>

            {/* Membership Modal */}
            <MembershipModal
                isOpen={showMembershipModal}
                onClose={() => setShowMembershipModal(false)}
                onSubscribe={handleSubscribe}
            />

            {/* Fixed Navigation */}
            <div className="bg-white shadow-lg">
                <Nav />
            </div>
        </div >
    );
};

export default Meal;



