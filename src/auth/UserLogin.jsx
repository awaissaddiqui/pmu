import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router";
import { auth, db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";

const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const redirectPath = params.get("redirect") || "/user/scholarships/profile";
    // Redirect if already logged in and role is "user"
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                const userRole = userDoc.exists() ? userDoc.data().role : null;
                if (userRole === "user") {
                    navigate(redirectPath); // Change to : /scholarships/CMEEF/details/UnNationalProgram
                }
            }
        });
        return () => unsubscribe();
    }, [navigate, redirectPath]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
            const userRole = userDoc.exists() ? userDoc.data().role : null;
            setLoading(false);

            if (userRole !== "user") {
                setError("This route is for users only. Please use the admin login page.");
                await auth.signOut();
                return;
            }

            navigate(redirectPath);

        } catch (error) {
            if (error.code === "auth/user-not-found") {
                setError("User not found. Please check your email or sign up.");
            }
            if (error.code === "auth/invalid-credential") {
                setError("Invalid credentials. Please try again.");
            }
            console.error("Login Error:", error);
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">User Login</h2>
                {error && <div className="mb-4 text-red-500">{error}</div>}
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
                <div className="mb-6">
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full bg-primary text-white py-2 rounded ${loading ? "cursor-not-allowed" : "cursor-pointer"} hover:bg-secondary hover:cursor-pointer transition`}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                <p className="mt-4 text-center text-sm">
                    Don't have an account? <Link to="/user/registration" className="text-secondary hover:underline">Sign Up</Link>
                </p>
            </form>
        </div>
    );
};

export default UserLogin;