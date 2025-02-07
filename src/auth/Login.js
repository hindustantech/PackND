import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { GoogleLogin } from '@react-oauth/google';
import { signInWithGoogle } from '../services/authService';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

// import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // login with Api
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    if (!formData.email || !formData.password) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      const id = result.user.id;


      setLoading(false);

      if (response.ok) {
        toast(response.message)
        localStorage.setItem("id", id);
        navigate('/');

      } else {
        setError(result.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setLoading(false);
      toast.error('Invalid email & password');

    }
  };
  // Login With Google

  const checkStorageAccess = () => {
    try {
      // Test sessionStorage access
      sessionStorage.setItem('test', 'test');
      sessionStorage.removeItem('test');
      return true;
    } catch (e) {
      console.warn('SessionStorage is not accessible:', e);
      return false;
    }
  };

  const fallbackStorage = new Map();

  const storageService = {
    setItem: (key, value) => {
      try {
        if (checkStorageAccess()) {
          sessionStorage.setItem(key, value);
          localStorage.setItem(key, value); // Backup in localStorage
        } else {
          fallbackStorage.set(key, value);
        }
      } catch (e) {
        console.warn('Storage write failed, using fallback:', e);
        fallbackStorage.set(key, value);
      }
    },

    getItem: (key) => {
      try {
        if (checkStorageAccess()) {
          return sessionStorage.getItem(key) || localStorage.getItem(key);
        }
        return fallbackStorage.get(key);
      } catch (e) {
        console.warn('Storage read failed, using fallback:', e);
        return fallbackStorage.get(key);
      }
    },

    removeItem: (key) => {
      try {
        if (checkStorageAccess()) {
          sessionStorage.removeItem(key);
          localStorage.removeItem(key);
        }
        fallbackStorage.delete(key);
      } catch (e) {
        console.warn('Storage deletion failed:', e);
        fallbackStorage.delete(key);
      }
    }
  };

  const handleGoogleLogin = async () => {
    // Initialize state key for tracking login process
    const loginStateKey = `google_login_${Date.now()}`;

    try {
      // Set initial login state
      storageService.setItem(loginStateKey, JSON.stringify({
        status: 'started',
        timestamp: Date.now()
      }));

      // Step 1: Check for existing auth state
      const existingState = await firebase.auth().getRedirectResult().catch(() => null);
      if (existingState?.user) {
        console.log('Recovered existing auth state');
        const user = existingState.user;
        return await handleUserAuthentication(user);
      }

      // Step 2: Perform Google Sign-In
      const user = await signInWithGoogle();
      if (!user) throw new Error('Google sign-in failed');

      return await handleUserAuthentication(user);

    } catch (error) {
      console.error('Error during Google login:', error);
      handleLoginError(error);
      throw error;
    } finally {
      // Cleanup login state
      storageService.removeItem(loginStateKey);
    }
  };

  const handleUserAuthentication = async (user) => {
    const { displayName, email } = user;

    if (!displayName || !email) {
      throw new Error('Failed to retrieve user details from Google.');
    }

    try {
      // Step 3: Backend Authentication
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/login_google`,
        {
          name: displayName,
          email,
          client_timestamp: Date.now() // For request validation
        },
        {
          headers: {
            'X-Request-ID': crypto.randomUUID() // Prevent duplicate requests
          }
        }
      );

      // Step 4: Handle Response
      const { token, user_id } = response.data;

      // Store auth details using storage service
      storageService.setItem('token', token);
      storageService.setItem('id', user_id);

      // Show success message and redirect
      if (response.status === 201) {
        toast.success('Registration Successful!');
        navigate('/user');
      } else {
        toast.success('Login Successful!');
        navigate('/');
      }

      return response.data;

    } catch (error) {
      throw new Error('Backend authentication failed: ' + error.message);
    }
  };

  const handleLoginError = (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorMessage = error.response.data.message || 'Server error occurred';
        toast.error(`Server Error: ${errorMessage}`);
        console.error('Response Error:', error.response.data);
      } else if (error.request) {
        toast.error('No response from server. Check your internet connection.');
        console.error('Request Error:', error.request);
      } else {
        toast.error('Network error occurred. Please try again.');
        console.error('Axios Error:', error.message);
      }
    } else if (error instanceof TypeError) {
      toast.error('Browser storage is not accessible. Please check your privacy settings.');
      console.error('Storage Error:', error);
    } else {
      toast.error(error.message || 'Unexpected error occurred');
      console.error('General Error:', error);
    }
  };

  // Initialize Firebase Auth state observer
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // Update storage with latest auth state
      storageService.setItem('auth_state', JSON.stringify({
        uid: user.uid,
        email: user.email,
        lastUpdated: Date.now()
      }));
    }
  });



  return (
    <div className="container-fluid min-vh-100 bg-light d-flex align-items-center justify-content-center py-5">
      <div
        className="card shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="card-header bg-danger text-white text-center py-4">
          <img src="/logo1.png" className="w-40 h-10 d-flex m-auto" />
          <h2 className="h3 mb-2">Welcome Back</h2>
          <p className="text-white-50 mb-0">Please login to your account</p>
        </div>
        <div className="card-body p-4">
          {error && <div className="alert alert-danger">{error}</div>}
          <form
            onSubmit={handleSubmit}
            className="needs-validation"
            noValidate
          >
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

            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
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

            <div className="d-flex justify-content-end mb-4">
              <Link
                to="/forgot-password"
                className="text-danger text-decoration-none"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-danger w-100 py-2 mb-3"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* <div className="position-relative my-4">
              <hr className="my-0" />
              <div className="position-absolute top-50 start-50 translate-middle bg-white px-3">
                <span className="text-muted">OR</span>
              </div>
            </div> */}
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

          <button
            className="btn w-100 mb-3 d-flex align-items-center justify-content-center"
            onClick={handleGoogleLogin}
          >
            Sign in with Google
            <img
              src="/g.png"
              className="ms-2" // Add left margin for spacing
              style={{ height: "24px", width: "24px" }}
              alt="Google Login"
            />
          </button>

          <p className="text-center text-muted mb-0">
            Don't have an account?{" "}
            <Link to="/register" className="text-danger text-decoration-none">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
