import React, { useState, useEffect } from 'react';
import Nav from './Nav';

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// ShareReferralButton component
const ShareReferralButton = ({ referralCode }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join using my referral code!',
          text: `Use my referral code: ${referralCode} to get started and earn rewards!`,
          url: window.location.origin
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      alert('Copy the referral code above to share!');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="fixed bottom-20 left-0 right-0 mx-auto w-11/12 max-w-md bg-pink-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-pink-700 transition-colors"
    >
      Invite Friends
    </button>
  );
};

const Referral = () => {
  const [copied, setCopied] = useState(false);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user_id = localStorage.getItem("id");
  const referralCode = userData.email; // Assuming email is used as referral code

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy to clipboard');
    }
  };

  const getUser = async () => {
    try {
      if (!user_id) {
        throw new Error("User ID not found in localStorage");
      }

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/getuser/${user_id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getUser();
        setUserData(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);




  return (
    <>
      <div className="min-h-screen bg-gray-100 mb-3">
        {/* Header Section */}
        <div
          className="bg-gray-900 text-white p-8 mb-4"
          style={{ borderRadius: '0 0 25px 25px' }}
        >

          <div className="d-flex   ">
            <ChevronLeft className="w-10 h-10 mr-2 text-white" onClick={() => navigate('/')} />


          </div>
          <div className="flex flex-col items-center ">


            <div
              className="w-24 h-24 mb-6 bg-gray-800 rounded-full flex items-center justify-center " style={{marginTop:'-12px'}}
            >
              <svg
                className="w-12 h-12 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-yellow-500">Earn ₹200</h1>
              <p className="text-lg font-medium text-pink-500">
                for every friend you refer
              </p>
              <p className="text-sm text-gray-400">
                Earn ₹1000 for the first 5 referrals
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 pb-24">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            {/* Share Code Section */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-700 mb-4">Your Referral Code</h3>
              <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                <span className="font-mono font-bold text-gray-700">{referralCode}</span>
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* How It Works Section */}
            <div>
              <h3 className="text-lg font-bold text-gray-700 mb-6">How referral works?</h3>
              <div className="space-y-6">
                {[
                  "Share referral code with friends.",
                  "When they register using your referral code, you both earn rewards.",
                  "Redeem your coupons at checkout to claim your rewards."
                ].map((text, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-pink-600 text-white font-bold rounded-full">
                      {index + 1}
                    </div>
                    <p className="ml-4 text-gray-600">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Invite Button */}

        </div>

        {/* Navigation */}

      </div>


      <Nav />

    </>
  );
};

export default Referral;