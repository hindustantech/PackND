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
    const [error, setError] = useState(null);
    const user_id = localStorage.getItem("id");
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const image = localStorage.getItem("image")
    console.log("image",image)
    
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserPackageAndMenu();
                setMembership(data?.data?.user_package || null);
                console.log(data?.data?.user_package);
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
                            src={`${process.env.REACT_APP_PROFILE_IMAGE_GET}/${image}`}
                            alt="Profile"
                            className="rounded-circle"
                            style={{
                                width: "50px",  // Further reduced image size
                                height: "50px",
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
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
                <div className="px-3 mt-n2" style={{ backgroundColor: "#FFFFFF" }}>
                    <div className="row g-3">
                        <div
                            className="col-6"
                            style={{ fontSize: "10px", cursor: "pointer" }}
                            onClick={navigateToPaymentPage}
                        >
                            <div className="bg-light p-3 rounded">
                                <div className="d-flex align-items-center gap-2">
                                    <img
                                        src={
                                            membership?.package_name
                                                ? `/m/${membership.package_name.toLowerCase()[0]}.png`
                                                : `/m/default.png`  // Fallback image when package name is not found
                                        }
                                        className="h-4 "
                                        alt={`${membership?.package_name || "Default"} Membership`}
                                    />
                                    <span className="fw-semibold">Membership</span>
                                </div>
                                <div
                                    className="fw-bold text-black mx-2"
                                    style={{ fontSize: "1.2rem" }}
                                >
                                    {membership?.package_name || "N/A"}
                                </div>
                                <small className="mx-1" style={{ fontSize: "0.2rem" }}>
                                    Change Membership on Next Renewal
                                </small>
                            </div>
                        </div>


                        <div className="col-6">
                            <div className="bg-light p-3 rounded">
                                <div className="d-flex align-items-center justify-content-between mb-1">
                                    <div className="d-flex align-items-center gap-2">
                                        <div
                                            className="bg-danger rounded-circle d-flex align-items-center justify-content-center"
                                            style={{ width: "20px", height: "20px" }}
                                        >
                                            <Wallet className="text-white" style={{ width: "14px", height: "14px" }} />
                                        </div>
                                        <span className="fw-semibold small">Wallet</span>
                                    </div>
                                    {/* <Plus className="text-secondary" size={16} /> */}
                                </div>
                                <div className="fs-5 fw-bold mb-0">
                                    <span className="text-black mx-1 " style={{ fontSize: "1rem" }}>
                                        ₹ {Math.trunc(amount?.balance_amount || 0)}/

                                    </span>
                                    <span className="text-secondary" style={{ fontSize: "0.5rem" }}>
                                        ₹{Math.trunc(amount?.total_amount || 0)}

                                    </span>
                                </div>
                                <p className=" mb-0 text-center" style={{ fontSize: "0.2rem", color: '#3FB500' }}>
                                    Available Balance
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="bg-light p-3 rounded mx-3 mt-3" style={{ backgroundColor: "#FFFFFF" }}>
                    <div className="d-flex justify-content-between align-items-center">
                        <span>Change</span>
                        <ChevronRight className="text-muted" size={20} />
                    </div>
                </div> */}



                <div className="text-start px-3 mx-1 mt-4" style={{ backgroundColor: "#FFFFFF" }}>


                    <div className="mb-4" style={{ backgroundColor: "#FFFFFF" }}>
                        <div className=" p-3 rounded bg-light">
                            <h2 className="h6 mb-3" style={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'Rethink Sans' }}>
                                REWARDS
                            </h2>
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
