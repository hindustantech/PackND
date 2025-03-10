import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import axios from "axios";
import { ChevronRight, Wallet, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';

const WalletPage = () => {
    const navigate = useNavigate();
    const [membership, setMembership] = useState(null);
    const [amount, setAmount] = useState(null);
    const [Bonus, setBonus] = useState(0);
    const [error, setError] = useState(null);
    const [imageu, setUserimage] = useState(null)
    const user_id = localStorage.getItem("id");
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const image = localStorage.getItem("image")
    // console.log("image)
    console.log("image 232:", Bonus)

    const getUserPackageAndMenu = async () => {
        try {
            if (!user_id) {
                throw new Error("User ID not found in localStorage.");
            }

            const response = await axios.get(`${BASE_URL}/getUserPackageAndMenu/${user_id}`);

            return response.data;

        } catch (error) {
            console.error("Error fetching user data:", error.message);
            throw error;
        }
    };


    // const user_id = localStorage.getItem("id");

    console.log(user_id);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUser();
                setUserimage(data.user.image);
                // const set=localStorage.setItem("image", data.user.image);

                // console.log("set", data.user.image);
                // Set initial meal status from user data if available

            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserPackageAndMenu();
                setMembership(data?.data?.user_package || null);
                console.log("data?.data?", data?.data);
                setBonus(data?.data?.bonusAmount)
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);


    const getUserPackageHistory = async () => {
        try {
            if (!user_id) {
                throw new Error("User ID not found in localStorage.");
            }


            const response = await axios.get(`${BASE_URL}/getUserPackageHistory/${user_id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching user data:", error.message);
            throw error;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserPackageHistory();
                setAmount(data?.data[0]);
                console.log("data.data.[0]", data?.data)
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    const navigateToPaymentPage = () => {
        navigate("/payment");
    };

    const MembershipInfo = ({ membership }) => {
        if (!membership) {
            return <p className="text-center text-danger"> Purchase Membership  </p>;
        }

        // Parse dates
        const startDate = new Date(membership.start_date);
        const endDate = new Date(membership.end_date);
        const currentDate = new Date();

        // Calculate total and remaining days
        const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        const remainingDays = Math.max(
            0,
            Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24))
        );

        return (
            <div className="text-center my-4">

                <div className="position-relative d-inline-block mb-5">
                    <div
                        className="position-absolute top-100 start-50 translate-middle mt-4" // Increased margin-top
                        style={{
                            backgroundImage: `url('/m/${membership?.package_name || "default"}.png')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            width: "80px",  // Further reduced width
                            height: "80px", // Further reduced height
                        }}
                    >
                        <img
                            src={imageu ? `${process.env.REACT_APP_PROFILE_IMAGE_GET}/${imageu}` : "/meal.png"}
                            // src={`${process.env.REACT_APP_PROFILE_IMAGE_GET}/${image}`}
                            alt="Profile"
                            className="rounded-circle  object-fit-cover"
                            style={{
                                width: "50px",  // Further reduced image size
                                height: "50px",
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                objectFit: "cover"
                            }}

                        />
                    </div>
                </div>

                <p className="custom-text-gradient mt-3">
                    {membership.package_name} Member
                </p>

                <p className="text-white mx-2" style={{ fontSize: "1.5rem", fontWeight: 'bolder' }}>

                    {Math.floor((amount?.balance_amount || 0) / (membership?.per_tiffin_price || 1))}  Tiffin Left
                </p>


            </div>
        );
    };

    return (
        <>
            <div className="container-fluid bg-dark text-white py-4 mb-2" style={{ borderRadius: "0 2px 35px 35px" }}>
                <div className="d-flex justify-content-between align-items-center ">
                    <img src="/logo1.png" alt="PacknD" className="h-6" loading="lazy" />
                    <NavLink to="/profile" className="nav-link">
                        <div className="bg-light d-flex justify-content-center align-items-center rounded-full p-2">
                            <User className="user-style" />

                        </div>
                    </NavLink>
                </div>


                <MembershipInfo membership={membership} />
            </div>

            <div className="mt-2" >
                <div className="container-fluid p-3 bg-white">
                    <div className="row g-3">
                        {/* Membership Card */}
                        <div className="col-6">
                            <div
                                className="bg-light p-3 rounded h-100"
                                style={{ cursor: "pointer" }}
                                onClick={navigateToPaymentPage}
                            >
                                <div className="d-flex align-items-center gap-2 mb-1">
                                    <img
                                        src={
                                            membership?.package_name
                                                ? `/m/${membership.package_name.toLowerCase()[0]}.png`
                                                : `/m/default.png`
                                        }
                                        className="img-fluid"
                                        style={{ height: "1.25rem" }}
                                        alt={`${membership?.package_name || "Default"} Membership`}
                                    />
                                    <span className="fw-semibold small">Membership</span>
                                </div>
                                <div
                                    className="fw-bold text-black mb-1"
                                    style={{ fontSize: "1rem" }}
                                >
                                    {membership?.package_name || "N/A"}
                                </div>
                                <small className="text-muted d-block" style={{ fontSize: "0.7rem" }}>
                                    Change Membership on Next Renewal
                                </small>
                            </div>
                        </div>

                        {/* Wallet Card */}
                        <div className="col-6">
                            <div className="bg-light p-3 rounded h-100">
                                <div className="d-flex align-items-center justify-content-between mb-1">
                                    <div className="d-flex align-items-center gap-2">
                                        <div
                                            className="bg-danger rounded-circle d-flex align-items-center justify-content-center"
                                            style={{ width: "20px", height: "20px" }}
                                        >
                                            <Wallet className="text-white" style={{ width: "12px", height: "12px" }} />
                                        </div>
                                        <span className="fw-semibold small">Wallet</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-baseline mb-1">
                                    <span className="text-black fw-bold" style={{ fontSize: "1rem" }}>
                                        ₹ {Math.trunc(amount?.balance_amount || 0)}
                                    </span>
                                    <span className="text-secondary ms-1" style={{ fontSize: "0.75rem" }}>
                                        / ₹{Math.trunc(amount?.total_amount || 0)}
                                    </span>
                                </div>
                                <p className="text-success mb-0" style={{ fontSize: "0.7rem" }}>
                                    Available Balance
                                </p>
                                <button
                                    className="px-2  bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition duration-200 cursor-pointer border-none
             md:w-auto md:inline-block"
                                    style={{ fontSize: "0.875rem" }}  // Adjusting font size slightly
                                    onClick={() => navigate('/list_upcoming')}
                                >
                                    Upcoming
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-start px-3 mx-1 mt-4" style={{ backgroundColor: "#FFFFFF" }}>

                    <div className="mb-4" style={{ backgroundColor: "#FFFFFF" }}>
                        <div className=" p-2 rounded bg-light">
                            <div>
                                <h2 className="h6 mb-3" style={{
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    fontFamily: 'Rethink Sans',
                                    display: 'flex',  // Flexbox use kar rahe hain
                                    justifyContent: 'space-between',  // Text ko dono side spread karne ke liye
                                    alignItems: 'center'  // Vertical alignment ke liye
                                }}>
                                    REWARDS
                                    <span className="earning-box px-3">
                                        Your Earning : {Bonus}
                                    </span>
                                </h2>
                            </div>



                            <div>
                                <div className="d-flex justify-content-between align-items-center mx-2 mb-3" onClick={() => { navigate('/ref') }}>
                                    <span style={{ fontSize: '10px' }}>Refer a friend</span>

                                    <ChevronRight className="text-muted" size={20} />
                                </div>
                                <div className="d-flex justify-content-between align-items-center mx-2 mb-3">
                                    {/* <span style={{ fontSize: '10px' }}>Claim a Gift Card</span>
                                    <ChevronRight className="text-muted" size={20} /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Nav />
        </>
    );
};

export default WalletPage;
