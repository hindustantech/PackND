import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import axios from "axios";
import { Star, Gift, RefreshCcw, ChevronRight, Medal, Wallet, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WalletPage = () => {
    const navigate = useNavigate();
    const [membership, setMembership] = useState(null);
    const [error, setError] = useState(null);
    const user_id = localStorage.getItem("id");
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
            return <p className="text-center text-danger">Membership not updated</p>;
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
                <div className="position-relative d-inline-block">
                    <img
                        src="/meal.png"
                        alt="Profile"
                        className="rounded-circle border border-warning"
                        style={{ width: "100px", height: "100px" }}
                    />
                    <div className="position-absolute top-100 start-50 translate-middle">
                        <Star className="text-warning" size={24} />
                    </div>
                </div>
                <p
                    className="text-gradient"
                    style={{
                        background: "linear-gradient(90deg, #ff7e5f, #feb47b)", // Define the gradient colors
                        WebkitBackgroundClip: "text", // Clip the background to the text
                        WebkitTextFillColor: "transparent", // Make the text fill transparent to reveal the gradient
                        fontWeight: "bold", // Optional: Add font weight for better visibility
                        fontSize: "2rem", // Optional: Adjust font size for emphasis
                    }}
                >
                    {membership.package_name}
                </p>

                <p className="text-white mx-2" style={{ fontSize: "1.5rem" }}>
                    {remainingDays}/ {totalDays} Days
                </p>


            </div>
        );
    };

    return (
        <>
            <div className="container-fluid bg-dark text-white py-4 mb-2" style={{ borderRadius: "0 0 25px 25px" }}>
                <div className="d-flex justify-content-between align-items-center px-3">
                    <img src="/logo1.png" alt="PacknD" className="h-8" loading="lazy" />
                    <button className="px-3 py-1 border rounded-full hover:bg-white hover:text-blue-600 transition-colors">
                        立A
                    </button>
                </div>

                <MembershipInfo membership={membership} />
            </div>

            <div className="px-3 mt-n2">
                <div className="row g-3">
                    <div className="col-6" style={{ fontSize: "0.5rem", cursor: "pointer" }} onClick={navigateToPaymentPage}>
                        <div className="bg-light p-3 rounded shadow-sm">
                            <div className="d-flex align-items-center gap-2 mb-1">
                                <Medal className="text-warning " size={40} />
                                <span className="fw-semibold ">Membership</span>
                            </div>
                            <div className="fs-2 fw-bold text-warning text-center mb-0 mx-2">{membership?.package_name || "N/A"}</div>
                            <p className="text-muted small text-center mb-0">Change Membership From Next Renewal ›</p>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="bg-light p-3 rounded shadow-sm">
                            <div className="d-flex align-items-center justify-content-between mb-1">
                                <div className="d-flex align-items-center gap-2">
                                    <div
                                        className="bg-danger rounded-circle d-flex align-items-center justify-content-center"
                                        style={{ width: "24px", height: "24px" }}
                                    >
                                        <Wallet className="text-white" style={{ width: "14px", height: "14px" }} />
                                    </div>
                                    <span className="fw-semibold small">Wallet</span>
                                </div>
                                <Plus className="text-secondary" size={16} />
                            </div>
                            <div className="fs-5 fw-bold mb-0">
                                <span className="text-black mx-2" style={{ fontSize: "2rem" }}>
                                    ₹500
                                </span>
                                <span className="text-secondary" style={{ fontSize: "0.7rem" }}>
                                    /₹2000
                                </span>
                            </div>
                            <p className="text-success mb-0 text-center" style={{ fontSize: "0.6rem" }}>
                                Available Balance
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-light p-3 rounded shadow-sm mx-2 mt-3">
                <div className="d-flex justify-content-between align-items-center">
                    <span>Change</span>
                    <ChevronRight className="text-muted" size={20} />
                </div>
            </div>

            <div className="text-start px-3 mx-1 mt-4">
                <h4 className="mb-3 mt-2">REWARDS</h4>

                <div className="bg-light p-3 rounded shadow-sm mb-3">
                    <div className="d-flex align-items-center">
                        <Gift className="me-2" size={20} /> Refer a Friend
                    </div>
                </div>
                <div className="bg-light p-3 rounded shadow-sm mb-3">
                    <div className="d-flex align-items-center">
                        <RefreshCcw className="me-2" size={20} /> Claim a Gift Card
                    </div>
                </div>
            </div>

            <Nav />
        </>
    );
};

export default WalletPage;
