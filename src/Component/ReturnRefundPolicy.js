import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const ReturnRefundPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-red-600 px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-red-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-white">Return & Refund Policy</h1>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-gray-700">
            At Packnd, we strive to provide exceptional service and quality in all our offerings. Our Return & Refund Policy outlines the process and conditions under which returns and refunds may be made:
          </p>

          <div className="space-y-4">
            {/* Policy Point 1 */}
            <div className="flex items-start">
              <span className="bg-red-100 text-red-800 font-bold rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1">1</span>
              <p className="text-gray-700">
                No refunds will be issued unless the order was incorrect or undelivered.
                All refund requests must be raised within 2 hours of the scheduled delivery time.
              </p>
            </div>

            {/* Policy Point 2 */}
            <div className="flex items-start">
              <span className="bg-red-100 text-red-800 font-bold rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1">2</span>
              <p className="text-gray-700">
                In case of payment failures, refund amounts will be credited within 7-10 business days from the date of approval. The refund amount will be credited to the original payment method used during the purchase.
              </p>
            </div>


            {/* Policy Point 4 */}
            <div className="flex items-start">
              <span className="bg-red-100 text-red-800 font-bold rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1">3</span>
              <p className="text-gray-700">
                Cancellations are allowed if made within the specified timeframe before order preparation begins.
                Once order preparation has started, cancellations are no longer permitted.
              </p>
            </div>

            {/* Policy Point 5 */}
            <div className="flex items-start">
              <span className="bg-red-100 text-red-800 font-bold rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1">4</span>
              <p className="text-gray-700">
                In case of disputes or discrepancies, Packnd reserves the right to make the final decision on returns and refunds.
              </p>
            </div>

            {/* Policy Point 6 */}
            <div className="flex items-start">
              <span className="bg-red-100 text-red-800 font-bold rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1">5</span>
              <p className="text-gray-700">
                Returns for delivered food items must be initiated within 2 hours of delivery. The replacement of the returned product will be completed within the same 2-hour window.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-gray-700">
              If you have any questions or require further assistance, please contact our support team at:
            </p>
            <p className="mt-2 text-red-600 font-medium">
              Email: <a href="mailto:info@packnd.com" className="hover:underline">info@packnd.com</a> <br/>
              Name : ALPESH SANTOSH BHATE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnRefundPolicy;