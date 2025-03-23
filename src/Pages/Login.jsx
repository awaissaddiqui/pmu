import React, { useState, useEffect } from 'react';
import { auth } from '../Firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Monitor Auth State
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/admin'); // Redirect if user is already logged in
            }
        });
        return () => unsubscribe(); // Cleanup on unmount
    }, [navigate]);

    const handleSubmitForm = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate('/admin');
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === 'auth/user-not-found') {
                    setError('User not found');
                } else if (errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-email' || errorCode === 'auth/invalid-credential') {
                    setError('Invalid Email or password');
                } else if (errorCode === 'auth/too-many-requests') {
                    setError('Too many requests. Please try again later.');
                } else if (errorCode === 'auth/network-request-failed') {
                    setError('Network error. Please check your internet connection.');
                } else {
                    setError('Something went wrong. Please try again later.');
                }
                setLoading(false);
            });
    };

    return (
        <div className="flex justify-center items-center p-12 bg-gray-100 min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-center text-2xl font-bold mb-4">Admin Login</h2>

                {error && <p className="text-red-600 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmitForm}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Email address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                    </div>

                    {loading ? (
                        <button
                            type="button"
                            className="w-full bg-primary text-white py-2 rounded-md font-semibold flex justify-center items-center cursor-not-allowed"
                            disabled
                        >
                            <svg className="mr-2 h-5 w-5 animate-spin text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            Processing…
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary transition"
                        >
                            Login
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;
