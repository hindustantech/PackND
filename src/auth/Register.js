import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, Lock, ArrowRight, Eye, EyeOff, LocateIcon, Handshake } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { GoogleLogin } from '@react-oauth/google';
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user_id = localStorage.getItem('id');
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/getuser/${user_id}`);
        const userData = response.data.user.email;
        setUser(userData);
      } catch (err) {
        // Handle error silently
      }
    };

    fetchUser();
  }, []);

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Age validation for DOB
    if (name === 'dob') {
      const age = calculateAge(value);
      if (age < 13) {
        setError('You must be at least 13 years old to create an account.');
      } else {
        setError(null);
      }
    }
  };

  const onSuccess = async (credentialResponse) => {
    try {
      const decodedData = jwtDecode(credentialResponse?.credential);
      const name = decodedData.name;
      const email = decodedData.email;

      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login_google`, {
        name,
        email
      });

      if (response.status === 200 || response.status === 201) {
        const token = response.data.token;
        const id = response.data.user_id;

        localStorage.setItem("token", token);
        localStorage.setItem("id", id);

        if (response.status === 201) {
          toast.success("Registration Successful!");
        } else {
          toast.success("Login Successful!");
        }

        navigate('/');
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation checks
    if (!formData.email || !formData.mobile || !formData.dob || !formData.address || !formData.password) {
      toast.error('Please fill out all required fields.');
      return;
    }

    const age = calculateAge(formData.dob);
    if (age < 13) {
      toast.error('You must be at least 13 years old to create an account.');
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;

    const nameRegex = /^[A-Za-z\s]{2,25}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(formData.email)) {
      toast.error('Email is not valid');
      return;
    }


    if (!phoneRegex.test(formData.mobile)) {
      toast.error('Phone number must be exactly 10 digits.');
      return;
    }

    if (!nameRegex.test(formData.name)) {
      toast.error('Name must contain only letters and spaces, with 2 to 25 characters.');
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      toast.error('Password must be at least 8 characters long and contain both letters and numbers.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/register`,
        formData
      );
      toast.success(response.data.message);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while registering. Please try again.');
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-light d-flex align-items-center justify-content-center py-5">
      <div className="card shadow-lg">
        <div className="card-header bg-danger text-white text-center py-4">
          <img src='/logo1.png' className='w-40 h-10 d-flex m-auto' alt="Logo" />
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
                    const value = e.target.value.replace(/\D/g, '');
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
                    const value = e.target.value.replace(/[^A-Za-z\s]/g, '');
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
                  type="date"
                  name="dob"
                  className="form-control"
                  value={formData.dob}
                  onChange={handleChange}
                  max={new Date(new Date().setFullYear(new Date().getFullYear() - 13)).toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Address</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <LocateIcon size={18} />
                </span>
                <input
                  type="text"
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
                  type="text"
                  name="sponcer_id"
                  className="form-control"
                  placeholder="Referral Code"
                  value={formData.sponcer_id}
                  onChange={handleChange}
                />
              </div>
            </div>

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


          {/* <button
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

          </button> */}
          <p className="text-center text-muted small">
            By creating an account, you agree to our{' '}
            <Link to="https://sites.google.com/view/packndterms" target="_blank" rel="noopener noreferrer" className="text-danger text-decoration-none">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="https://sites.google.com/view/packndprivacy" target="_blank" rel="noopener noreferrer" className="text-danger text-decoration-none">
              Privacy Policy
            </Link>
          </p>

          <div className="text-center mt-2">
            <span className="text-muted">Already have an account?</span>
            <Link to="/login" className="text-red-600 text-decoration-none ms-2">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;