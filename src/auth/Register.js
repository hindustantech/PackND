import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, Lock, ArrowRight, Eye, EyeOff,LocateIcon ,Handshake} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    name:'',
    mobile: '',
    dob: '',
    address: '',
    password: '',
    sponcer_id: ''
  });
  const base =process.env.REACT_APP_API_BASE_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

console.log(base)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.mobile || !formData.dob || !formData.address || !formData.password) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `http://projectdemo.ukvalley.com/api/register`,
        formData
      );
      alert(response.data.message);
      console.log('Server Response:', response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while registering. Please try again.');
      console.error('Registration Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-light d-flex align-items-center justify-content-center py-5">
      <div className="card shadow-lg">
        <div className="card-header bg-danger text-white text-center py-4">
          <div
            className="rounded-circle bg-white d-flex align-items-center justify-content-center mx-auto mb-3"
            style={{ width: '80px', height: '80px' }}
          >
            <User size={40} className="text-danger" />
          </div>
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
                  placeholder="you@example.com"
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
                  type="mobile"
                  name="mobile"
                  className="form-control"
                  placeholder="6202400672"
                  value={formData.mobile}
                  onChange={handleChange}
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
                  placeholder="Username"
                  value={formData.name}
                  onChange={handleChange}
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
                  {/* <LocateIcon size={18} /> */}
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
              <label className="form-label">Referal Code</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <Handshake size={18} />
                </span>
                <input
                  type="sponcer_id"
                  name="sponcer_id"
                  className="form-control"
                  placeholder="Referal Code"
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
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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

            <p className="text-center text-muted small">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-danger text-decoration-none">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-danger text-decoration-none">
                Privacy Policy
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
