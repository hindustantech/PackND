import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PartyPopper, Percent } from 'lucide-react';

const Coupon = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchBanners();
  }, []);

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">Error: {error}</div>;
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-xl">
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out mb-3"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >

          <div key={banners.id} className="w-full flex-shrink-0">
            <div className="flex justify-center items-center text-center gap-4 coupn-card">
              <div className="relative">
                
                <div className="flex gap-3 justify-center ">
                  <button
                    className="flex items-center gap-2 p-2 py-2 text-lg font-semibold bg-black text-white border-2 border-yellow-400 rounded-2xl focus:ring-offset-2 focus:ring-gray-300"
                  >
                    <span className="text-white">{banners.heading1}</span>
                    <PartyPopper className="ml-2" size={30} />
                  </button>
                  <button
                    className="flex items-center gap-2 p-2 py-2 text-lg font-semibold bg-black text-white border-2 border-blue-400 rounded-2xl focus:ring-offset-2 focus:ring-gray-300"
                  >
                    <span className="text-white">{banners.heading2}</span>
                    <Percent className="ml-2" size={30} />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {banners.length > 1 && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${index === activeSlide ? 'bg-white' : 'bg-gray-400'
                  }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Coupon;