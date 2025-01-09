import React, { useState, useEffect } from 'react';
import Nav from './Nav';

const Referal = () => {
    const [copied, setCopied] = useState(false);
    const [UserData, setUserData] = useState([]);
    const [error, setError] = useState(null);
    const user_id = localStorage.getItem("id");
    const referralCode = UserData.email; // Assuming `email` is the referral code for this example

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
            console.error("Error fetching user data:", error.message);
            setError(error.message);
            throw error; // Rethrow for the calling function to handle
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUser();
                setUserData(data.user);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    // Component for sharing referral code
    const ShareReferralButton = ({ referralCode }) => {
        const handleShare = () => {
            // Get the current URL
            const currentUrl = window.location.href;

            // Dynamically generate the referral link by appending the referral code to the current URL
            const referralLink = `${currentUrl}?code=${referralCode}`;

            // Check if the Web Share API is supported
            if (navigator.share) {
                navigator.share({
                    title: 'Join me on Ear For You!',
                    text: 'Earn ₹200 by referring a friend to Ear For You.',
                    url: referralLink,
                }).then(() => {
                    console.log('Referral link shared successfully!');
                }).catch((error) => {
                    console.error('Error sharing referral link:', error);
                });
            } else {
                // Fallback: Show the referral link for manual copying
                alert(`Copy this link to share with your friend: ${referralLink}`);
            }
        };

        // Function to copy referral code to clipboard
        const copyToClipboard = () => {
            navigator.clipboard.writeText(referralCode).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Reset the copied status after 2 seconds
            });
        };

        return (
            <>
                <div
                    className="bg-dark text-center text-white mb-4"
                    style={{ borderRadius: '0 0 25px 25px' }}
                >
                    <div className="d-flex flex-column align-items-center">
                        <div
                            style={{
                                width: '96px',
                                height: '96px',
                                marginBottom: '1.5rem',
                            }}
                        >
                            {/* Placeholder for an icon or image */}
                        </div>
                        <div className="text-center mb-4">
                            <h1 className="text-3xl font-bold text-yellow-600">Earn ₹200</h1>
                            <p className="text-lg font-medium text-danger-300">
                                for every friend you refer
                            </p>
                            <p className="text-sm text-gray-400">
                                Earn ₹1000 for the first 5 referrals
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col p-4 bg-gray-100 min-h-screen">
                    {/* Share Code Section */}
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
                        {/* Share Code Section */}
                        <div className="mt-6 text-center">
                            <div className="bg-gray-100 px-4 py-2 rounded-lg flex justify-between items-center">
                                <span className="font-bold">Share code</span>
                                <button
                                    className="text-pink-600 font-medium"
                                    onClick={copyToClipboard}
                                >
                                    <span className="font-bold text-pink-600">{referralCode}</span>  
                                    {copied ? "Copied!" : "Copy"}
                                </button>
                            </div>
                        </div>

                        {/* How Referral Works Section */}
                        <div className="mt-6">
                            <h3 className="text-lg font-bold text-gray-700 mb-4 text-center">
                                How referral works?
                            </h3>
                            <div className="space-y-6">
                                {/* Step 1 */}
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-pink-500 text-white font-bold rounded-full">
                                        1
                                    </div>
                                    <p className="ml-4 text-gray-600">
                                        Share referral code with friends.
                                    </p>
                                </div>
                                {/* Step 2 */}
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-pink-500 text-white font-bold rounded-full">
                                        2
                                    </div>
                                    <p className="ml-4 text-gray-600">
                                        When they register using your referral code, you both earn rewards.
                                    </p>
                                </div>
                                {/* Step 3 */}
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-pink-500 text-white font-bold rounded-full">
                                        3
                                    </div>
                                    <p className="ml-4 text-gray-600">
                                        Redeem your coupons at checkout to claim your rewards.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Invite Button */}
                    <ShareReferralButton referralCode={referralCode} />
                </div>
                <Nav />
            </>
        );
    };

    return (
        <>
            {error ? (
                <div className="text-center text-red-500">{error}</div>
            ) : (
                <Referal />
            )}
        </>
    );
};

export default Referal;
