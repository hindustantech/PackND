import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import { Package, Gift, Sun, Moon, Award } from 'lucide-react';
import Lunch from './Lunch';
import Dinner from './Dinner';
import TrailMeal from './TrailMeal';

const Meal = () => {
    const [mealTime, setMealTime] = useState('lunch');
    const [UserData, setUserData] = useState([]);
    const [Membership, setMembership] = useState(null);
    const [error, setError] = useState(null);
    const [showMembershipModal, setShowMembershipModal] = useState(false);
    const [showBalance, setShowBalance] = useState(false);
    const user_id = localStorage.getItem("id");
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
    const today = new Date();


    // Modal body class effect
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
                console.log(data.user);
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
    return (
        <div className="d-flex flex-column min-vh-100 mb-4">
            <div className="flex-grow-1 overflow-auto mb-4">
                {/* Hero Section */}
                <div className="position-relative">
                    <div className="p-3 text-white rounded-bottom-4 bg-img">

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

                    </div>
                </div>

                {/* Main Content */}
                <div className="p-3">
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center">
                            <div className="me-2">
                                <div className="text-danger fw-bold">{today.getDate()}</div>
                                <div className="text-muted"> {today.toLocaleString('default', { month: 'short' })}</div>
                            </div>
                            <div>
                                <div className="fw-bold text-dark"
                                    style={{ fontSize: '12px' }}>
                                    Welcome {UserData?.first_name} !
                                </div>
                                <div className="text-muted"
                                    style={{ fontSize: '9px', color: '#6F6F6F' }}>
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
                                    backgroundColor: mealTime === 'dinner' ? '#FFD3D3' : '',
                                    color: mealTime === 'dinner' ? 'red' : '',
                                    borderRadius: '0px',
                                }}>
                                <div className="d-flex align-items-center justify-content-center">
                                    <Moon />
                                    <span className="ms-2 nowrape" style={{ fontSize: '10px', fontWeight: 'bold', textWrap: 'nowrap' }}>Dinner Meal</span>
                                </div>
                                <small className="text-muted" style={{ fontSize: '8px' }}>
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
                                    src="/meal.png"
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
                            {mealTime === 'lunch' && <TrailMeal mealTime='morning' />}
                            {mealTime === 'dinner' && <TrailMeal mealTime='evening' />}
                        </>

                    )}

                    {/* Meal Components */}
                    {Membership && (
                        <>
                            {mealTime === 'lunch' && <Lunch />}
                            {mealTime === 'dinner' && <Dinner />}
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
        </div>
    );
};

export default Meal;