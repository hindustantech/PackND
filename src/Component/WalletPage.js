import React from 'react'
import Nav from './Nav'
import { Star, Gift, RefreshCcw, ChevronRight, Medal, Wallet, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WalletPage = () => {
    const navigate = useNavigate();

    const navigateToPaymentPage = () => {
        navigate('/payment'); // Adjust the path as per your app's routing
    };
    return (
        <>
            <div className="container-fluid bg-dark text-white py-4 mb-2" style={{ borderRadius: '0 0 25px 25px' }}>
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center px-3">
                    <img
                        src="/logo1.png"
                        alt="PacknD"
                        className="h-8"
                        loading="lazy"
                    />

                    <button className="px-3 py-1 border  rounded-full hover:bg-white hover:text-blue-600 transition-colors">
                        立A
                    </button>
                </div>

                {/* Profile Section */}
                <div className="text-center my-4">
                    <div className="position-relative d-inline-block">
                        <img
                            src="https://via.placeholder.com/100"
                            alt="Profile"
                            className="rounded-circle border border-warning"
                            style={{ width: '100px', height: '100px' }}
                        />
                        <div className="position-absolute top-100 start-50 translate-middle">
                            <Star className="text-warning" size={24} />
                        </div>
                    </div>
                    <h2 className="mt-3">Gold Member</h2>
                    <p>Member since 69 Days</p>
                </div>
            </div>

            {/* Membership and Wallet Sections */}
            <div className="px-3 mt-n4 ">
                <div className="row g-3">
                    {/* Membership Section */}
                    <div className="col-6" style={{ fontSize: '0.5rem', cursor: 'pointer' }}
                        onClick={() => navigateToPaymentPage()}>
                        <div className="bg-light p-3 rounded shadow-sm">
                            <div className="d-flex align-items-center gap-2 mb-1">
                                <div style={{ width: '24px', height: '24px' }}>
                                    <Medal className="text-warning w-100 h-100" />
                                </div>
                                <span className="fw-semibold small">Membership</span>
                            </div>
                            <div className="fs-2 fw-bold text-warning mb-0 mx-2">Gold</div>
                            <p
                                className="text-muted small text-center mb-0"

                            >
                                Change Membership From Next renewal ›
                            </p>
                        </div>
                    </div>


                    {/* Wallet Section */}
                    <div className="col-6">
                        <div className="bg-light p-3 rounded shadow-sm">
                            <div className="d-flex align-items-center justify-content-between mb-1">
                                <div className="d-flex align-items-center gap-2">
                                    <div className="bg-danger rounded-circle d-flex align-items-center justify-content-center"
                                        style={{ width: '24px', height: '24px' }}>
                                        <Wallet className="text-white" style={{ width: '14px', height: '14px' }} />
                                    </div>
                                    <span className="fw-semibold small">Wallet</span>
                                </div>
                                <Plus className="text-secondary" size={16} />
                            </div>
                            <div className="fs-5 fw-bold mb-0">
                                <span className="text-black mx-2" style={{ fontSize: '2rem' }}> ₹500</span>
                                <span className="text-secondary" style={{ fontSize: '0.7rem' }}>/₹2000</span>
                            </div>
                            <p className="text-success mb-0 text-center" style={{ fontSize: '0.6rem' }}>Available Balance</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Request Changes */}
            <div className="bg-light p-3 rounded shadow-sm mx-2 mt-3">
                <div className="d-flex justify-content-between align-items-center">
                    <span>Change</span>
                    <div className="d-flex align-items-center">
                        <ChevronRight className="text-muted" size={20} />
                    </div>
                </div>
            </div>

            {/* Rewards Section */}
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

            {/* Bottom Navigation */}
            <Nav />
        </>
    )
}

export default WalletPage;
