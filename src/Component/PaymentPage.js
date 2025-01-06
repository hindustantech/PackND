import React, { useState, useEffect } from 'react';
import { QrCode, Receipt, ChevronDown } from 'lucide-react';
import { toast } from 'react-toastify';

const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const selected = options.find(opt => opt.id === value);
    setSelectedOption(selected);
  }, [value, options]);

  return (
    <div className="relative">
      <div
        className="w-full p-3 border rounded-lg bg-white flex justify-between items-center cursor-pointer hover:border-blue-500 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`${!selectedOption ? 'text-gray-500' : 'text-gray-900'}`}>
          {selectedOption ? selectedOption.package_name : placeholder}
        </span>
        <ChevronDown 
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          size={20}
        />
      </div>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
          {options.map((option) => (
            <div
              key={option.id}
              className="p-3 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => {
                onChange({ target: { value: option.id } });
                setIsOpen(false);
              }}
            >
              <div className="font-medium">{option.package_name}</div>
              <div className="text-sm text-gray-600">₹{option.price}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const PaymentPage = () => {
  const [meals, setMeals] = useState([]);
  const [qrDetails, setQrDetails] = useState([]);
  const [userData, setUserData] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    Thash: '',
    receipt: null,
    tpin: ''
  });

  const user_id = localStorage.getItem("id");

  const getDinerMeal = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/getPackage`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    } catch (error) {
      throw new Error('Failed to fetch meal data');
    }
  };

  const getQr = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/qr_image`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    } catch (error) {
      throw new Error('Failed to fetch QR data');
    }
  };

  const getUser = async () => {
    try {
      if (!user_id) throw new Error("User ID not found in localStorage.");
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/getuser/${user_id}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [mealsData, qrData, userData] = await Promise.all([
          getDinerMeal(),
          getQr(),
          getUser()
        ]);
        setMeals(mealsData);
        setQrDetails(qrData);
        setUserData(userData.user);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      }
    };
    fetchAllData();
  }, []);

  const handleMealSelect = (e) => {
    const value = parseInt(e.target.value, 10);
    const selected = meals.find(meal => meal.id === value);
    setSelectedMeal(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!user_id) throw new Error('User ID not found. Please login again.');
      if (!selectedMeal) throw new Error('Please select a meal package.');

      const formDataToSend = new FormData();
      formDataToSend.append('Thash', formData.Thash);
      formDataToSend.append('user_id', user_id);
      formDataToSend.append('receipt', formData.receipt);
      formDataToSend.append('package_id', selectedMeal.id);
      formDataToSend.append('tpin', formData.tpin);

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/make_deposite`, {
        method: 'POST',
        body: formDataToSend,
      });

      const contentType = response.headers.get('content-type');
      
      if (!response.ok) {
        const errorData = contentType?.includes('application/json') 
          ? await response.json()
          : await response.text();
        throw new Error(errorData.error || errorData);
      }

      const result = await response.json();
      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-danger text-white p-4">
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="h3 mb-0">Order Details</h1>
                <Receipt size={32} />
              </div>
            </div>

            <div className="card-body p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select a Meal Package
                </label>
                <CustomSelect
                  options={meals}
                  value={selectedMeal?.id}
                  onChange={handleMealSelect}
                  placeholder="-- Choose a meal package --"
                />
              </div>

              {selectedMeal && (
                <div className="card mb-4">
                  <div
                    className="card-body"
                    style={{
                      backgroundColor:
                        selectedMeal.package_name === 'Gold' ? '#FFD700' :
                        selectedMeal.package_name === 'Silver' ? '#C0C0C0' :
                        '#CD7F32',
                      color:
                        selectedMeal.package_name === 'Gold' ? '#000000' :
                        selectedMeal.package_name === 'Silver' ? '#000000' :
                        '#FFFFFF'
                    }}
                  >
                    <h5 className="card-title mb-3">{userData.email1}</h5>
                    <h5 className="card-title mb-4">{selectedMeal.package_name}</h5>

                    <div className="row g-4 mb-4">
                      <div className="col-md-6">
                        <h6 className="mb-1">Price</h6>
                        <p className="h4">₹{selectedMeal.price}</p>
                      </div>
                    </div>

                    <div>
                      <h6 className="mb-2">Description</h6>
                      <p className="mb-0">{selectedMeal.description}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="row mb-4">
                {qrDetails.map((detail, index) => (
                  <div className="col-12" key={index}>
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h5 className="mb-2">Scan to Pay</h5>
                            <p className="text-muted mb-0" style={{ fontSize: '12px' }}>
                              UPI ID: {detail.address}
                            </p>
                          </div>
                          <img
                            src={`https://projectdemo.ukvalley.com/public/qrcode/${detail.qr}`}
                            alt="QR Code"
                            className="img-fluid"
                            style={{ maxWidth: '120px', height: 'auto' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                  <label className="form-label">Transaction ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your transaction ID"
                    value={formData.Thash}
                    onChange={(e) => setFormData({ ...formData, Thash: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Enter Password</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your password"
                    value={formData.tpin}
                    onChange={(e) => setFormData({ ...formData, tpin: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Upload Payment Screenshot</label>
                  <div className="card">
                    <div className="card-body text-center p-4">
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setFormData({ ...formData, receipt: e.target.files[0] })}
                        accept="image/*"
                        required
                      />
                      <small className="text-muted d-block mt-2">
                        PNG, JPG, GIF up to 10MB
                      </small>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-danger w-100 py-2"
                  disabled={!selectedMeal}
                >
                  Confirm Payment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;