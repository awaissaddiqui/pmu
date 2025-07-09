import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { auth, db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";

const UserSignup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [mobile, setMobile] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validate inputs
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!fullName.trim()) {
            setError("Full name is required");
            return;
        }

        if (!mobile.trim()) {
            setError("Mobile number is required");
            return;
        }

        try {
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Save additional user information to Firestore
            await setDoc(doc(db, "users", userCredential.user.uid), {
                email,
                fullName,
                mobile,
                role: "user"
            });

            navigate("/user/scholarships/profile");
            setTimeout(() => setLoading(false), 1000);
        } catch (error) {
            setLoading(false);
            if (error.code === "auth/email-already-in-use") {
                setError("Email already in use. Please use a different email.");
            } else if (error.code === "auth/invalid-email") {
                setError("Invalid email format. Please check your email.");
            } else if (error.code === "auth/weak-password") {
                setError("Password is too weak. Please use a stronger password.");
            } else {
                setError("An error occurred during signup. Please try again.");
            }

            console.error("Signup Error:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Create Your Account, Sign Up</h2>
                {error && <div className="mb-4 text-red-500">{error}</div>}

                {/* Full Name Field */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Full Name</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>

                {/* Mobile Number Field */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Mobile Number</label>
                    <input
                        type="tel"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="+923001234567"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-1 font-medium">Confirm Password</label>
                    <input
                        type="password"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded hover:cursor-pointer hover:bg-secondary transition"
                    disabled={loading}
                >
                    {loading ? "Signing up..." : "Sign Up"}
                </button>
                <p className="mt-4 text-center text-sm">
                    Already have an account? <Link to="/user/login" className="text-secondary hover:cursor-pointer hover:underline">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default UserSignup;