import React, { useState } from 'react';
import { PartyPopper, Percent, ChevronLeft, ChevronRight } from 'lucide-react';

const Coupon = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      buttons: [
        {
          text: "Plan a Party",
          icon: <PartyPopper className="ml-2" size={16} />,
          borderColor: "border-yellow-400"
        },
        {
          text: "New Year Offers",
          icon: <Percent className="ml-2" size={16} />,
          borderColor: "border-blue-400"
        }
      ]
    },
    {
      id: 2,
      buttons: [
        {
          text: "Special Deals",
          icon: <Percent className="ml-2" size={16} />,
          borderColor: "border-green-400"
        },
        {
          text: "Holiday Fun",
          icon: <PartyPopper className="ml-2" size={16} />,
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
    <div className="relative w-full max-w-4xl mx-auto rounded-lg">
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        {/* Slides */}
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="w-full flex-shrink-0">
              <div className="flex justify-center items-center gap-4">
                {slide.buttons.map((button, buttonIndex) => (
                  <button
                    key={buttonIndex}
                    className={`flex items-center px-2 py-2 text-xl bg-black text-white border-2 ${button.borderColor} rounded-lg hover:opacity-80 transition-opacity duration-300`}
                    style={{fontSize:'18px'}}
                  >
                    {button.text}
                    {button.icon}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

    
      

        {/* Indicators */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === activeSlide ? 'bg-white' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Coupon;
