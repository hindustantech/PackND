import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
            console.log("id",id);

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
            setError('An error occurred. Please try again.',err.message);
        }
    };

    const handleGoogleLogin = () => {
        console.log('Google login clicked');
        // Implement Google OAuth logic here
    };

    return (
        <div className="container-fluid min-vh-100 bg-light d-flex align-items-center justify-content-center py-5">
            <div className="card shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="card-header bg-danger text-white text-center py-4">
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
                                    placeholder="you@example.com"
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
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
{/* 
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="btn btn-outline-dark w-100 py-2 mb-3 d-flex align-items-center justify-content-center gap-2"
                        >
                            <svg
                                width="18"
                                height="18"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                            >
                                <path
                                    fill="#EA4335"
                                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                                />
                                <path
                                    fill="#4285F4"
                                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                                />
                            </svg>
                            <span>Continue with Google</span>
                        </button> */}

                        <p className="text-center text-muted mb-0">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-danger text-decoration-none">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
