import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendTokenToServer } from '../firebase-notification';
// import { GoogleLogin } from '@react-oauth/google';
import Cookies from "js-cookie";

import {
  signInWithGoogle,
  handleRedirectResult,
  hasPendingSignIn,
  getReturnPath,
  authStateService
} from '../services/authService';
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

  const [isProcessing, setIsProcessing] = useState(false);

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
        toast(response.message||"Login Success")
        localStorage.setItem("id", id);
        const token = localStorage.getItem("token")
        sendTokenToServer(token, id);
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


  useEffect(() => {



    const handleRedirect = async () => {
      if (hasPendingSignIn()) {
        setIsProcessing(true);
        try {
          const user = await handleRedirectResult();
          if (user) {
            await handleSuccessfulSignIn(user);
            // Navigate to the stored return path
            const returnPath = getReturnPath();
            navigate(returnPath);
          }
        } catch (error) {
          console.error("Redirect handling error:", error);
          handleAuthError(error);
        } finally {
          setIsProcessing(false);
        }
      }
    };

    handleRedirect();
  }, [navigate]);

  const handleSuccessfulSignIn = async (user) => {
    if (!user) {
      throw new Error("No user data received");
    }

    const { displayName, email } = user;
    if (!displayName || !email) {
      throw new Error("Failed to retrieve user details from Google.");
    }

    try {
      const requestId = crypto.randomUUID();
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/login_google`,
        {
          name: displayName,
          email,
          client_timestamp: Date.now()
        },
        {
          headers: {
            'X-Request-ID': requestId,
            'Content-Type': 'application/json'
          },
          timeout: 10000 // 10 second timeout
        }
      );

      if (response.status === 200 || response.status === 201) {
        const { user_id } = response.data;
        console.log("response.data", response.data);
        localStorage.setItem("id", user_id);
        Cookies.set("id", user_id, { expires: 365, path: "/", secure: true, sameSite: "Lax" });


        const token = localStorage.getItem("token")
        console.log("token", token);
        sendTokenToServer(token, user_id);

        // Try to store auth details with fallback

        try {
          authStateService.setAuthState({
            token,
            userId: user_id,
            timestamp: Date.now()
          });

        } catch (storageError) {
          console.error("Storage error:", storageError);
          toast.warning("Login successful but session storage is limited. Some features may not work properly.");
        }

        // Show success message and navigate
        if (response.status === 201) {
          toast.success("Registration Successful!");
          navigate("/");
        } else {
          toast.success("Login Successful!");
          navigate("/");
        }
      } else {
        throw new Error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Backend authentication error:", error);
      throw error;
    }
  };

  const handleAuthError = (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorMessage = error.response.data.message || "Server error occurred";
        toast.error(`Server Error: ${errorMessage}`);
        console.error("Server error details:", error.response.data);
      } else if (error.request) {
        toast.error("Unable to reach the server. Please check your connection.");
        console.error("Network error details:", error.request);
      } else if (error.code === 'ECONNABORTED') {
        toast.error("Request timed out. Please try again.");
      } else {
        toast.error("Network error occurred. Please try again.");
        console.error("Axios error:", error.message);
      }
    } else if (error instanceof TypeError) {
      toast.error("Browser storage is not accessible. Please check your privacy settings.");
      console.error("Storage error:", error);
    } else {
      toast.error(error.message || "An unexpected error occurred. Please try again.");
      console.error("General error:", error);
    }
  };

  const handleGoogleLogin = async () => {
    if (isProcessing) {
      return; // Prevent multiple simultaneous attempts
    }

    setIsProcessing(true);
    try {
      const user = await signInWithGoogle();
      if (user) {
        await handleSuccessfulSignIn(user);
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      handleAuthError(error);
    } finally {
      setIsProcessing(false);
    }
  };



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

          {/* <button
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
          </button> */}

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
