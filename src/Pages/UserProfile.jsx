import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../Firebase";
import { useNavigate } from "react-router";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../Context/AuthProvider";

const UserProfile = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [userProfile, setUserProfile] = useState({
        fullName: "",
        mobile: "",
        email: user?.email || ""
    });
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            if (!user?.uid) return;

            try {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    setUserProfile({
                        fullName: userDoc.data().fullName || userDoc.data().displayName || "User",
                        mobile: userDoc.data().mobile || "Not provided",
                        email: user.email || ""
                    });
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [user]);

    // Fetch applications (both from Firestore and localStorage)
    useEffect(() => {
        const fetchApplications = async () => {
            if (!user?.uid) return;

            setLoading(true);
            try {
                const forms = [];

                // 1. Get applications from Firestore (submitted forms)
                // Undergraduate forms
                const undergradQuery = query(collection(db, "undergraduate-forms"),
                    where("userId", "==", user.uid));
                const undergradSnapshot = await getDocs(undergradQuery);
                undergradSnapshot.forEach(doc => {
                    forms.push({
                        id: doc.id,
                        program: "Undergraduate National Program",
                        cycle: "CMEEF Scholarship",
                        status: "Submitted",
                        type: "undergraduate",
                        ...doc.data()
                    });
                });

                // Continue with other form types...

                // 2. Get in-progress forms from localStorage
                // Undergraduate forms in progress
                const localUndergradForm = localStorage.getItem(`undergraduate_form_${user.uid}`);
                if (localUndergradForm) {
                    try {
                        const formData = JSON.parse(localUndergradForm);
                        if (Object.keys(formData).length > 0) {
                            forms.push({
                                id: `local-undergrad-${Date.now()}`,
                                program: "Undergraduate National Program",
                                cycle: "CMEEF Scholarship",
                                status: "In Progress",
                                type: "undergraduate-draft"
                            });
                        }
                    } catch (e) {
                        console.error("Error parsing localStorage form data", e);
                    }
                }

                // Graduate forms in progress
                const localGraduateForm = localStorage.getItem(`graduate_form_${user.uid}`);
                if (localGraduateForm) {
                    try {
                        const formData = JSON.parse(localGraduateForm);
                        if (Object.keys(formData).length > 0) {
                            forms.push({
                                id: `local-graduate-${Date.now()}`,
                                program: "Graduate National Program",
                                cycle: "CMEEF Scholarship",
                                status: "In Progress",
                                type: "graduate-draft"
                            });
                        }
                    } catch (e) {
                        console.error("Error parsing localStorage form data", e);
                    }
                }

                // PhD forms in progress
                const localPhdForm = localStorage.getItem(`phd_form_${user.uid}`);
                if (localPhdForm) {
                    try {
                        const formData = JSON.parse(localPhdForm);
                        if (Object.keys(formData).length > 0) {
                            forms.push({
                                id: `local-phd-${Date.now()}`,
                                program: "PhD International Program",
                                cycle: "CMEEF Scholarship",
                                status: "In Progress",
                                type: "phd-draft"
                            });
                        }
                    } catch (e) {
                        console.error("Error parsing localStorage form data", e);
                    }
                }

                // Research forms in progress
                const localResearchForm = localStorage.getItem(`research_form_${user.uid}`);
                if (localResearchForm) {
                    try {
                        const formData = JSON.parse(localResearchForm);
                        if (Object.keys(formData).length > 0) {
                            forms.push({
                                id: `local-research-${Date.now()}`,
                                program: "Research Registration",
                                cycle: "Research Program",
                                status: "In Progress",
                                type: "research-draft"
                            });
                        }
                    } catch (e) {
                        console.error("Error parsing localStorage form data", e);
                    }
                }

                setApplications(forms);
                // Log after state update
                console.log("Forms loaded:", forms.length);
            } catch (error) {
                console.error("Error fetching applications:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [user]);

    const handleContinueForm = (type) => {
        switch (type) {
            case "undergraduate-draft":
                navigate("/scholarships/CMEEF/details/UnNationalProgram");
                break;
            case "graduate-draft":
                navigate("/scholarships/CMEEF/details/GraduateNationalProgram");
                break;
            case "phd-draft":
                navigate("/scholarships/CMEEF/details/PHDInternational");
                break;
            case "research-draft":
                navigate("/research/registration");
                break;
            default:
                // For submitted forms, view details
                alert("View details for completed application");
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/user/login");
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mx-auto py-8">
            {/* Profile Section */}
            <div className="md:w-1/3">
                <div className="bg-white rounded-lg shadow p-6 w-full max-w-xs mx-auto">
                    <div className="flex flex-col items-center">
                        {/* Avatar */}
                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1112 21a8.963 8.963 0 01-6.879-3.196z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>

                        {/* User info */}
                        <div className="w-full">
                            <div className="mb-4">
                                <div className="flex items-center gap-2 text-green-800 font-semibold">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1112 21a8.963 8.963 0 01-6.879-3.196z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Full Name
                                </div>
                                <div className="bg-gray-100 rounded px-3 py-2 mt-1 text-gray-800">{userProfile.fullName}</div>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-center gap-2 text-green-800 font-semibold">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h2l.4 2M7 13h10l4-8H5.4" />
                                        <circle cx="7" cy="21" r="2" />
                                        <circle cx="17" cy="21" r="2" />
                                    </svg>
                                    Mobile
                                </div>
                                <div className="bg-gray-100 rounded px-3 py-2 mt-1 text-gray-800">{userProfile.mobile}</div>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 text-green-800 font-semibold">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm-8 0V8a4 4 0 118 0v4" />
                                    </svg>
                                    Email
                                </div>
                                <div className="bg-gray-100 rounded px-3 py-2 mt-1 text-gray-800 break-all">{userProfile.email}</div>
                            </div>
                        </div>

                        {/* Logout button */}
                        <button
                            onClick={handleLogout}
                            className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </div>

            {/* Applications Section */}
            <div className="md:w-2/3">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold text-center mb-6">My Applications</h2>
                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="text-center py-4">Loading your applications...</div>
                        ) : (
                            <table className="min-w-full border border-gray-200 rounded-lg">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-700">
                                        <th className="py-2 px-4 border-b">#</th>
                                        <th className="py-2 px-4 border-b">Program</th>
                                        <th className="py-2 px-4 border-b">Cycle</th>
                                        <th className="py-2 px-4 border-b">Status</th>
                                        <th className="py-2 px-4 border-b">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applications.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="text-center py-6 text-gray-400">No applications found.</td>
                                        </tr>
                                    ) : (
                                        applications.map((app, idx) => (
                                            <tr key={app.id} className="border-b hover:bg-gray-50">
                                                <td className="py-2 px-4 font-semibold">{idx + 1}</td>
                                                <td className="py-2 px-4">{app.program}</td>
                                                <td className="py-2 px-4">{app.cycle}</td>
                                                <td className="py-2 px-4">
                                                    <span className={`inline-block px-3 py-1 rounded font-semibold text-sm
                                                    ${app.status === "In Progress"
                                                            ? "bg-yellow-100 text-yellow-800"
                                                            : app.status === "Submitted"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-gray-200 text-gray-700"
                                                        }`}>
                                                        {app.status}
                                                    </span>
                                                </td>
                                                <td className="py-2 px-4">
                                                    <button
                                                        onClick={() => handleContinueForm(app.type)}
                                                        className={`px-4 py-1 rounded transition ${app.type.includes("draft")
                                                                ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                                                : "bg-green-100 text-green-800 hover:bg-green-200"
                                                            }`}
                                                    >
                                                        {app.type.includes("draft") ? "Continue" : "View Details"}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;