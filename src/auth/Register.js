import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, MapPin, Lock, ArrowRight, Eye, EyeOff, LocateIcon, Handshake } from 'lucide-react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    mobile: '',
    dob: '',
    address: '',
    password: '',
    sponcer_id: ''
  });
  const navigate = useNavigate();
  const base = process.env.REACT_APP_API_BASE_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const user_id = localStorage.getItem('id');
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/getuser/${user_id}`);
        const userData = response.data.user.email;

        setUser(userData);


      } catch (err) {



      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSuccess = async (credentialResponse) => {
    try {
      const decodedData = jwtDecode(credentialResponse?.credential);
  
      const name = decodedData.name;
      const email = decodedData.email;
  
      // Make API call to Laravel backend
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login_google`, {
        name,
        email
      });
  
      // Check for both 200 (OK) and 201 (Created) status codes
      if (response.status === 200 || response.status === 201) {
        const token = response.data.token;
        const id = response.data.user_id;
  
        // Store the token and user id in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("id", id);
  
        // Show success toast based on the status code
        if (response.status === 201) {
          toast.success("Registration Successful!");
        } else {
          toast.success("Login Successful!");
        }
  
        // Redirect to the home page
        navigate('/');
      } else {
        // Handle other statuses or errors
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };
  

  const onError = () => {

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);



    if (!formData.email || !formData.mobile || !formData.dob || !formData.address || !formData.password) {
      toast('Please fill out all fields.');
      return;
    }
    const phoneRegex = /^[0-9]{10}$/;
    const nameRegex = /^[A-Za-z\s]{2,}$/;  // At least 2 letters, only alphabets and spaces

    if (!phoneRegex.test(formData.mobile)) {
      toast('Phone number must be exactly 10 digits.');
      return;
    }


    // Name Validation
    if (!nameRegex.test(formData.name)) {
      toast('Name must contain only letters and be at least 2 characters long.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/register`,
        formData
      );
      toast(response.data.message);

      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while registering. Please try again.');

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-light d-flex align-items-center justify-content-center py-5">
      <div className="card shadow-lg">
        <div className="card-header bg-danger text-white text-center py-4">

          <img src='/logo1.png' className='w-40 h-10 d-flex m-auto' />

          <h2 className="h3 mb-2">Create Account</h2>
          <p className="text-white-50 mb-0">Join us and order your first meal</p>
        </div>

        <div className="card-body p-4">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-4">
              <label className="form-label">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label">Phone</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <Phone size={18} />
                </span>
                <input
                  type="tel"
                  name="mobile"
                  className="form-control"
                  placeholder="9999999999"
                  value={formData.mobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ''); // Only digits
                    if (value.length <= 10) {
                      setFormData((prev) => ({
                        ...prev,
                        mobile: value,
                      }));
                    }
                  }}
                  pattern="\d{10}"
                  maxLength="10"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Name</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^A-Za-z\s]/g, ''); // Only letters and spaces
                    setFormData((prev) => ({
                      ...prev,
                      name: value,
                    }));
                  }}
                  minLength="2"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Date of Birth</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <Calendar size={18} />
                </span>
                <input
                  type="Date"
                  name="dob"
                  className="form-control"
                  placeholder="Date of Birth"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label"> Address</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <LocateIcon size={18} />
                </span>
                <input
                  type="address"
                  name="address"
                  className="form-control"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label">Referral Code</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <Handshake size={18} />
                </span>
                <input
                  type="sponcer_id"
                  name="sponcer_id"
                  className="form-control"
                  placeholder="Referral Code"
                  value={formData.sponcer_id}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Other Form Fields */}

            <div className="mb-4">
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-danger w-100 py-2 mb-3 d-flex align-items-center justify-content-center gap-2"
              disabled={loading}
            >
              <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
              <ArrowRight size={18} />
            </button>

          </form>


          <button
            type="submit"
            className="btn w-100  mb-3 d-flex align-items-center justify-content-center  "
            disabled={loading}
          >

            <GoogleLogin onSuccess={onSuccess}
              useOneTap
              render={(renderProps) => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="btn w-100 mb-3 d-flex align-items-center justify-content-center">
                  <img src="/g.png" className="h-10 w-10" alt="Google Login" />
                  Login with Google
                </button>
              )}
            />

          </button>
          <p className="text-center text-muted small">
            By creating an account, you agree to our{' '}
            <Link to="https://sites.google.com/view/packndterms" target="_blank" rel="noopener noreferrer" className="text-danger text-decoration-none" >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="https://sites.google.com/view/packndprivacy" target="_blank" rel="noopener noreferrer" className="text-danger text-decoration-none"  >
              Privacy Policy
            </Link>
          </p>

          <div className="text-center mt-2">
            <span className="text-muted">Already have an account ?</span>
            <Link
              to="/login"
              className="text-red-600 fw-bold text-decoration-none ms-2"

            >
              Login
            </Link>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Register;
