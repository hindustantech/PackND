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

  const handleGoogleLogin = async () => {
   

    try {
      // Step 1: Perform Google Sign-In using Firebase auth service
      const user = await signInWithGoogle();

      // Step 2: Extract user details from the Firebase user object
      const { displayName, email } = user;

      if (!displayName || !email) {
        throw new Error("Failed to retrieve user details from Google.");
      }

      // Step 3: Send the user's data to the Laravel backend for authentication
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/login_google`,
        { name: displayName, email }
      );

      // Step 4: Handle successful login or registration
      if (response.status === 200 || response.status === 201) {
        const { token, user_id } = response.data;

        // Store authentication details in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("id", user_id);

        if (response.status === 201) {
          toast.success("Registration Successful!");
          navigate("/user"); // Navigate to /user for registration success
        } else if (response.status === 200) {
          toast.success("Login Successful!");
          navigate("/"); // Navigate to home for login success
        }
      } else {
        throw new Error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during Google login:", error);

      // Step 5: Handle different types of errors
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Response Error:", error.response.data);
          toast.error(
            `Server Error: ${error.response.data.message || "Please try again."}`
          );
        } else if (error.request) {
          console.error("Request Error:", error.request);
          toast.error("No response from server. Check your internet connection.");
        } else {
          console.error("Axios Error:", error.message);
          toast.error("Unexpected error. Please try again later.");
        }
      } else {
        console.error("General Error:", error.message);
        toast.error(error.message || "Unexpected error. Please try again.");
      }
    }


  }



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
