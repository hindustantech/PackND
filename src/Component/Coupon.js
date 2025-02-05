import React, { useState } from 'react';
import { PartyPopper, Percent } from 'lucide-react';

const Coupon = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: 1,
      buttons: [
        {
          text: "Plan a Party",
          icon: <PartyPopper className="ml-2" size={30} />,
          borderColor: "border-yellow-400"
        },
        {
          text: "New  Offers",
          icon: <Percent className="ml-2" size={30} />,
          borderColor: "border-blue-400"
        }
      ]
    },
    {
      id: 2,
      buttons: [
        {
          text: "Special Deals",
          icon: <Percent className="ml-2" size={30} />,
          borderColor: "border-green-400"
        },
        {
          text: "Holiday Fun",
          icon: <PartyPopper className="ml-2" size={30} />,
          borderColor: "border-purple-400"
        }
      ]
    }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-xl ">
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-in-out mb-3  "
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="w-full flex-shrink-0">
              <div className="flex justify-center items-center text-center gap-4 coupn-card ">
                {slide.buttons.map((button, buttonIndex) => (
                  <button
                    key={buttonIndex}
                    className={`flex items-center gap-2 px-4 py-2 text-lg font-semibold bg-black text-white border-2 ${button.borderColor} rounded-3xl  focus:ring-offset-2 focus:ring-gray-300`}
                  >
                    <span className="text-white">{button.text}</span>
                    <span className="text-2xl">{button.icon}</span>
                  </button>

                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === activeSlide ? 'bg-white' : 'bg-gray-400'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Coupon;
