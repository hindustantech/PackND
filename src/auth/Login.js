import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
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

            
            // Assuming response contains a token or some confirmation from backend
            if (response.status === 200) {
                // Redirect to home page
                const token = response.data.token;
                const id = response.data.user_id;

                // Store the token in localStorage
                localStorage.setItem("token", token);

                localStorage.setItem("id", id);
                navigate('/');
            } else {

            }
        } catch (error) {


        }
    };

    return (
        <div className="container-fluid min-vh-100 bg-light d-flex align-items-center justify-content-center py-5">
            <div className="card shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="card-header bg-danger text-white text-center py-4">
                    <img src='/logo1.png' className='w-40 h-10 d-flex m-auto' />
                    <h2 className="h3 mb-2">Welcome Back</h2>
                    <p className="text-white-50 mb-0">Please login to your account</p>
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

                        <div className="mb-3">
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

                        <div className="d-flex justify-content-end mb-4">
                            <Link to="/forgot-password" className="text-danger text-decoration-none">
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-danger w-100 py-2 mb-3"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>

                        <div className="position-relative my-4">
                            <hr className="my-0" />
                            <div className="position-absolute top-50 start-50 translate-middle bg-white px-3">
                                <span className="text-muted">OR</span>
                            </div>
                        </div>

                    </form>
                    <button
                        type="submit"
                        className="btn w-100  mb-3 d-flex align-items-center justify-content-center  "
                        disabled={loading}
                    >

                        <GoogleLogin onSuccess={onSuccess}

                            useOneTap
                        />

                    </button>

                    <p className="text-center text-muted mb-0">
                        Don't have an account?{' '}
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
