import React from 'react';

const PackndServices = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-red-600 mb-2">Packnd Services</h1>
          <p className="text-lg text-gray-600">Fast, reliable delivery services</p>
        </header>

        {/* Main Content Section */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-12">
          {/* Hero Banner */}
          <div className="bg-red-600 text-white p-6">
            <h2 className="text-2xl font-bold">Our Delivery Services</h2>
            <p>Quick and efficient delivery to your doorstep</p>
          </div>

          <div className="p-8">
            {/* Service Highlights */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-red-200 pb-2">Why Choose Packnd?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-700 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Fast Delivery
                  </h3>
                  <p className="text-gray-600">Get your items delivered within 2-3 hours</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-700 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Reliable Service
                  </h3>
                  <p className="text-gray-600">Trusted by thousands of customers</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-700 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Secure Packaging
                  </h3>
                  <p className="text-gray-600">Items packed with care and safety</p>
                </div>
              </div>
            </section>

            {/* Delivery Information Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-red-200 pb-2">Delivery Information</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-red-600">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-600">We currently deliver to select locations specified during checkout. Please ensure your delivery address is accurate to avoid delays.</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-red-600">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-600">Standard delivery timeframe is between 10:00 AM to 8:00 PM, subject to operational constraints.</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-red-600">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-600">Food delivered within 2-3 hours from order placement.</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-red-600">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-600">Delays may occur due to unforeseen circumstances (natural calamities, strikes, etc.). We'll keep you informed.</p>
                </li>
              </ul>
            </section>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-red-600 text-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="mb-6">Have questions or need assistance? Our support team is here to help.</p>

            <div className="space-y-4">
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-3 text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@packnd.com" className="hover:underline">info@packnd.com</a>
              </div>




            </div>
          </div>

          <div className="bg-red-700 px-8 py-4">
            <p className="text-red-100 text-sm">© {new Date().getFullYear()} Packnd. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackndServices;