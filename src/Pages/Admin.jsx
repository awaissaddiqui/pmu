import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth, db, supabaseDb } from '../Firebase';
import { collection, getDocs, doc, getDoc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { trefoil } from 'ldrs';
import { useNavigate } from 'react-router';
import AdminAlumni from './AdminAlumni';


// Register the trefoil component
trefoil.register();

const Admin = () => {
    const [news, setNews] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedNews, setEditedNews] = useState([]);
    const [formData, setFormData] = useState([]);
    const [formDataUndergrad, setFormDataUndergrad] = useState([]);
    const [formDataGraduate, setFormDataGraduate] = useState([]);
    const [formDataPhdInternational, setFormDataPhdInternational] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const now = Date.now();
                const cacheExpiry = 10 * 60 * 1000; // 10 minutes

                // Helper function to check cache validity
                const isCacheValid = (timestamp) => now - timestamp < cacheExpiry;

                // Fetch News Data
                const storedNews = JSON.parse(localStorage.getItem("newsData"));
                const newsPromise = storedNews && isCacheValid(storedNews.timestamp)
                    ? Promise.resolve(storedNews.data)
                    : (async () => {
                        const docRef = doc(db, "pmuAdminData", "newsData");
                        const docSnap = await getDoc(docRef);
                        if (docSnap.exists()) {
                            const fetchedNews = docSnap.data().news || [];
                            localStorage.setItem("newsData", JSON.stringify({ data: fetchedNews, timestamp: now }));
                            return fetchedNews;
                        }
                        return [];
                    })();

                // Fetch Research Forms Data
                const storedFormData = JSON.parse(localStorage.getItem("formData"));
                const researchFormsPromise = storedFormData && isCacheValid(storedFormData.timestamp)
                    ? Promise.resolve(storedFormData.data)
                    : (async () => {
                        const collectionRef = collection(db, "research-forms");
                        const querySnapshot = await getDocs(collectionRef);
                        const forms = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                        localStorage.setItem("formData", JSON.stringify({ data: forms, timestamp: now }));
                        return forms;
                    })();

                // Fetch Undergraduate Forms Data
                const storedFormDataUndergrad = JSON.parse(localStorage.getItem("formDataUndergrad"));
                const undergradFormsPromise = storedFormDataUndergrad && isCacheValid(storedFormDataUndergrad.timestamp)
                    ? Promise.resolve(storedFormDataUndergrad.data)
                    : (async () => {
                        const collectionRefUndergrad = collection(db, "undergraduate-forms");
                        const querySnapshotUndergrad = await getDocs(collectionRefUndergrad);
                        const formsUndergrad = querySnapshotUndergrad.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                        localStorage.setItem("formDataUndergrad", JSON.stringify({ data: formsUndergrad, timestamp: now }));
                        return formsUndergrad;
                    })();

                // Fetch Graduate Forms Data
                const storedFormDataGraduate = JSON.parse(localStorage.getItem("formDataGraduate"));
                const graduateFormsPromise = storedFormDataGraduate && isCacheValid(storedFormDataGraduate.timestamp)
                    ? Promise.resolve(storedFormDataGraduate.data)
                    : (async () => {
                        const collectionRefGraduate = collection(db, "national-graduate-form");
                        const querySnapshotGraduate = await getDocs(collectionRefGraduate);
                        const formsGraduate = querySnapshotGraduate.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                        localStorage.setItem("formDataGraduate", JSON.stringify({ data: formsGraduate, timestamp: now }));
                        return formsGraduate;
                    })();

                // Fetch Phd International Forms Data
                const storedFormDataPhdInternational = JSON.parse(localStorage.getItem("formDataPhdInternational"));
                const phdInternationalFormsPromise = storedFormDataPhdInternational && isCacheValid(storedFormDataPhdInternational.timestamp)
                    ? Promise.resolve(storedFormDataPhdInternational.data)
                    : (async () => {
                        const collectionRefPhdInternational = collection(db, "phd-international");
                        const querySnapshotPhdInternational = await getDocs(collectionRefPhdInternational);
                        const formsPhdInternational = querySnapshotPhdInternational.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                        localStorage.setItem("formDataPhdInternational", JSON.stringify({ data: formsPhdInternational, timestamp: now }));
                        return formsPhdInternational;
                    })();

                // Use Promise.allSettled to handle all promises
                const results = await Promise.allSettled([newsPromise, researchFormsPromise, undergradFormsPromise, graduateFormsPromise, phdInternationalFormsPromise]);

                // Handle results
                if (results[0].status === "fulfilled") {
                    setNews(results[0].value);
                    setEditedNews(results[0].value);
                } else {
                    console.error("Error fetching news data:", results[0].reason);
                }

                if (results[1].status === "fulfilled") {
                    setFormData(results[1].value);
                } else {
                    console.error("Error fetching research forms data:", results[1].reason);
                }

                if (results[2].status === "fulfilled") {
                    setFormDataUndergrad(results[2].value);
                } else {
                    console.error("Error fetching undergraduate forms data:", results[2].reason);
                }

                if (results[3].status === "fulfilled") {
                    setFormDataGraduate(results[3].value);
                } else {
                    console.error("Error fetching graduate forms data:", results[3].reason);
                }

                if (results[4].status === "fulfilled") {
                    setFormDataPhdInternational(results[4].value);
                } else {
                    console.error("Error fetching PhD international forms data:", results[4].reason);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };

        fetchData();
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        signOut(auth).then(() => console.log("User signed out")).catch(console.error);
        localStorage.removeItem("newsData");
        localStorage.removeItem("formData");
        localStorage.removeItem("formDataUndergrad");
        localStorage.removeItem("formDataGraduate");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-5 relative" id='dashboard'>
            {/* Loading Spinner */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <l-trefoil
                        size="40"
                        stroke="4"
                        stroke-length="0.15"
                        bg-opacity="0.1"
                        speed="1.4"
                        color="white"
                    ></l-trefoil>
                </div>
            )}
            {/* Main Content */}

            {/* Admin Navbar */}
            {
                loading ? null : (
                    <AdminNavbar handleLogout={handleLogout} />
                )
            }

            {/* Rest of your component */}
            {/* News Section */}
            <div className="w-full mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
                <h2 className="text-3xl font-semibold mb-4 text-gray-900">Latest News</h2>
                <div className="flex justify-end mb-6">
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-primary text-white p-2 rounded-lg w-full md:w-40 hover:bg-secondary transition"
                        >
                            Edit
                        </button>
                    ) : (
                        <button
                            onClick={async () => {
                                try {
                                    const docRef = doc(db, "pmuAdminData", "newsData");
                                    await updateDoc(docRef, { news: editedNews });
                                    setNews(editedNews);
                                    setIsEditing(false);
                                } catch (error) {
                                    console.log("Error updating news:", error);
                                }
                            }}
                            className="bg-secondary text-white p-2 rounded-lg w-full md:w-40 hover:bg-green-600 transition"
                        >
                            Submit
                        </button>
                    )}
                </div>
                <ul className="space-y-3">
                    {news.length > 0 ? news.map((item, index) => (
                        <li key={index} className="bg-gray-200 p-3 rounded-lg shadow-md">
                            {isEditing ? (
                                <input
                                    type="text"
                                    className="w-full p-2 rounded border border-gray-300"
                                    value={editedNews[index]}
                                    onChange={(e) => {
                                        const updatedNews = [...editedNews];
                                        updatedNews[index] = e.target.value;
                                        setEditedNews(updatedNews);
                                    }}
                                />
                            ) : (
                                item
                            )}
                        </li>
                    )) : <p className="text-gray-500">No news available.</p>}
                </ul>

            </div>

            {/* Research Forms Data Section */}
            <div id='research' className="mt-6 w-full mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-3xl font-semibold mb-4 text-gray-900">Research Form Submissions</h2>
                {formData.length > 0 ? (
                    <div className="overflow-x-auto"> {/* ✅ Wrap table inside this div */}
                        <table className="w-full border-collapse border border-gray-300 min-w-[600px]"> {/* ✅ Added min-w */}
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 p-2">Email</th>
                                    <th className="border border-gray-300 p-2">Title</th>
                                    <th className="border border-gray-300 p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData.map((form) => (
                                    <tr key={form.id} className="hover:bg-gray-100">
                                        <td
                                            className="border border-gray-300 p-2 cursor-pointer text-blue-600 underline"
                                            onClick={() => navigate(`/admin/form-details/${form.pi_email}`)}
                                        >
                                            {form.pi_email}
                                        </td>
                                        <td className="border border-gray-300 p-2">{form.title}</td>
                                        <td className="border border-gray-300 p-2 text-center flex justify-center space-x-2">
                                            <button
                                                className="bg-primary text-white px-3 py-1 rounded hover:bg-primary"
                                                onClick={() => navigate(`/admin/form-details/${form.pi_email}`)}
                                            >
                                                View
                                            </button>
                                            <DeleteForm id={form.id} collectionName="research-forms" setState={setFormData} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">No research forms submitted yet.</p>
                )}
            </div>


            {/* Undergraduate Forms Data Section */}
            <div id='undergraduate' className="mt-6 w-full mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-3xl font-semibold mb-4 text-gray-900">Undergraduate Form Submissions</h2>
                {formDataUndergrad.length > 0 ? (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-2">Email</th>
                                <th className="border border-gray-300 p-2">Name</th>
                                <th className="border border-gray-300 p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formDataUndergrad.map((form) => (
                                <tr key={form.email} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 p-2 cursor-pointer text-blue-600 underline" onClick={() => navigate(`/admin/form-details-undergrad/${form.email}`)}>
                                        {form.email}
                                    </td>
                                    <td className="border border-gray-300 p-2">{form.applicantName}</td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        <button className="bg-primary cursor-pointer text-white px-3 py-1 rounded hover:bg-secondary" onClick={() => navigate(`/admin/form-details-undergrad/${form.email}`)}>View</button>
                                        <DeleteForm id={form.id} collectionName="undergraduate-forms" setState={setFormDataUndergrad} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No undergraduate forms submitted yet.</p>
                )}
            </div>
            {/* Graduate Forms Data Section */}
            <div id='graduate' className="mt-6 w-full mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-3xl font-semibold mb-4 text-gray-900">Graduate Form Submissions</h2>
                {formDataGraduate.length > 0 ? (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-2">Email</th>
                                <th className="border border-gray-300 p-2">Name</th>
                                <th className="border border-gray-300 p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formDataGraduate.map((form) => (
                                <tr key={form.email} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 p-2 cursor-pointer text-blue-600 underline" onClick={() => navigate(`/admin/form-details-graduate/${form.email}`)}>
                                        {form.email}
                                    </td>
                                    <td className="border border-gray-300 p-2">{form.full_name}</td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        <button className="bg-primary cursor-pointer text-white px-3 py-1 rounded hover:bg-secondary" onClick={() => navigate(`/admin/form-details-graduate/${form.email}`)}>View</button>
                                        <DeleteForm id={form.id} collectionName="national-graduate-form" setState={setFormDataGraduate} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No graduates forms submitted yet.</p>
                )}
            </div>
            {/* PHD International Forms data */}
            <div id='phd' className="mt-6 w-full mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-3xl font-semibold mb-4 text-gray-900">PHD International Form Submissions</h2>
                {formDataPhdInternational.length > 0 ? (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-2">Email</th>
                                <th className="border border-gray-300 p-2">Name</th>
                                <th className="border border-gray-300 p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formDataPhdInternational.map((form) => (
                                <tr key={form.email} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 p-2 cursor-pointer text-blue-600 underline" onClick={() => navigate(`/admin/form-details-phd/${form.email}`)}>
                                        {form.email}
                                    </td>
                                    <td className="border border-gray-300 p-2">{form.full_name}</td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        <button className="bg-primary cursor-pointer text-white px-3 py-1 rounded hover:bg-secondary" onClick={() => navigate(`/admin/form-details-phd/${form.email}`)}>View</button>
                                        <DeleteForm id={form.id} collectionName="phd-international" setState={setFormDataPhdInternational} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No PHD International forms submitted yet.</p>
                )}
            </div>
            <AlumniTable />
            <AdminJob />
            {/* ... */}
        </div>
    );
};

export default Admin;




const AlumniTable = () => {
    const [alumni, setAlumni] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false); // ✅ State to control modal

    // Fetch alumni from Firestore
    useEffect(() => {
        const fetchAlumni = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "pmu-alumni"));
                const alumniList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setAlumni(alumniList);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching alumni:", error);
                setLoading(false);
            }
        };

        fetchAlumni();
    }, []);

    // Handle Delete
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this alumni?");
        if (!confirmDelete) return;

        try {
            await deleteDoc(doc(db, "pmu-alumni", id));
            setAlumni(alumni.filter((item) => item.id !== id));
            alert("Alumni deleted successfully!");
        } catch (error) {
            console.error("Error deleting alumni:", error);
            alert("Failed to delete alumni.");
        }
    };

    return (
        <div id='alumni' className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
            <h2 className="text-3xl font-semibold mb-4 text-gray-900">Alumni List</h2>
            {/* Add New Button */}
            <div className="m-6  flex justify-end">
                <button
                    onClick={() => setModalOpen(true)} // ✅ Open modal
                    className="bg-primary w-full md:w-36 text-white px-6 py-2 rounded-md font-semibold hover:bg-secondary transition"
                >
                    Add New
                </button>
            </div>

            {loading ? (
                <p className="text-center text-gray-600">Loading alumni...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Title</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alumni.length > 0 ? (
                                alumni.map((alum) => (
                                    <tr key={alum.id} className="text-center border border-gray-300">
                                        <td className="border border-gray-300 px-4 py-2">{alum.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{alum.title}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button
                                                onClick={() => handleDelete(alum.id)}
                                                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center text-gray-600 py-4">
                                        No alumni found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}



            {/* ✅ Modal Component */}
            {modalOpen && (
                <div className="fixed inset-0  bg-secondary flex justify-center items-center z-100">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setModalOpen(false)} // ✅ Close modal
                            className="absolute cursor-pointer top-5 right-3 text-gray-600 hover:text-gray-900 text-xl"
                        >
                            ✖
                        </button>

                        {/* Render AdminAlumni Form Inside Modal */}
                        <AdminAlumni closeModal={() => setModalOpen(false)} />
                    </div>
                </div>
            )}
        </div>
    );
};

// export default AlumniTable;




const AdminNavbar = ({ handleLogout }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    // Smooth scrolling function
    const handleSmoothScroll = (event, targetId) => {
        event.preventDefault(); // Prevent default anchor behavior
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start" // Scrolls to the top of the element
            });
        }
    };

    return (
        <nav className="bg-gray-200 shadow-md p-4 rounded-lg mb-6 sticky top-0 z-50">
            <div className="w-full mx-auto flex justify-between items-center">
                {/* Logo / Title */}
                <a onClick={(e) => handleSmoothScroll(e, "dashboard")} href="#dashboard" className="flex items-center space-x-2 cursor-pointer">
                    <p className="text-2xl font-bold text-secondary" >PMU Admin Dashboard</p>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    {/* <a href="#dashboard" className="block text-gray-700 hover:text-blue-600 transition">Dashboard</a> */}
                    <a href="#research" onClick={(e) => handleSmoothScroll(e, "research")} className="text-gray-700 hover:text-blue-600 transition">Research Forms</a>
                    <a href="#undergraduate" onClick={(e) => handleSmoothScroll(e, "undergraduate")} className="text-gray-700 hover:text-blue-600 transition">Undergraduate</a>
                    <a href="#graduate" onClick={(e) => handleSmoothScroll(e, "graduate")} className="text-gray-700 hover:text-blue-600 transition">Graduate</a>
                    <a href="#phd" onClick={(e) => handleSmoothScroll(e, "phd")} className="text-gray-700 hover:text-blue-600 transition">PhD International</a>
                    <a href="#alumni" onClick={(e) => handleSmoothScroll(e, "alumni")} className="text-gray-700 hover:text-blue-600 transition">Alumni</a>
                    <a href="#job" onClick={(e) => handleSmoothScroll(e, "job")} className="text-gray-700 hover:text-blue-600 transition">Job</a>

                    <button
                        onClick={handleLogout}
                        className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition"
                    >
                        Logout
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-700 focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? (
                        <span className="text-2xl">✖</span>
                    ) : (
                        <span className="text-2xl">☰</span>
                    )}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <div className="md:hidden mt-4 space-y-2 text-center bg-white shadow-md rounded-lg p-4">
                    {/* <a href="#dashboard" className="block text-gray-700 hover:text-blue-600 transition">Dashboard</a> */}
                    <a href="#research" onClick={(e) => handleSmoothScroll(e, "research")} className="block text-gray-700 hover:text-blue-600 transition">Research Forms</a>
                    <a href="#undergraduate" onClick={(e) => handleSmoothScroll(e, "undergraduate")} className="block text-gray-700 hover:text-blue-600 transition">Undergraduate</a>
                    <a href="#graduate" onClick={(e) => handleSmoothScroll(e, "graduate")} className="block text-gray-700 hover:text-blue-600 transition">Graduate</a>
                    <a href="#phd" onClick={(e) => handleSmoothScroll(e, "phd")} className="block text-gray-700 hover:text-blue-600 transition">PhD International</a>
                    <a href="#alumni" onClick={(e) => handleSmoothScroll(e, "alumni")} className="block text-gray-700 hover:text-blue-600 transition">Alumni</a>
                    <a href="#job" onClick={(e) => handleSmoothScroll(e, "job")} className="block text-gray-700 hover:text-blue-600 transition">Job</a>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-700 text-white py-2 rounded-lg hover:bg-red-800 transition"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};



// make a job component in which we can add a job and show the list of jobs and delete the job.

const AdminJob = () => {
    // State for job list
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    // State for new job form
    const [jobData, setJobData] = useState({
        title: "",
        company: "",
        location: "",
        description: "",
    });

    // Fetch jobs from Firestore
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "pmu-jobs"));
                const jobList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setJobs(jobList);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching jobs:", error);
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const fileName = `${Date.now()}_${file.name}`;
        const filePath = `jobs/${fileName}`; // Define the storage path

        try {
            setLoading(true); // Set loading to true while uploading
            const { data, error } = await supabaseDb.storage.from("alumni").upload(filePath, file);
            if (error) throw error;

            // Get the Public URL
            const { data: publicUrlData } = supabaseDb.storage.from("alumni").getPublicUrl(filePath);
            const downloadURL = publicUrlData.publicUrl; // Correct way to get the URL

            console.log("Image URL:", downloadURL);
            setJobData((prev) => ({ ...prev, image: downloadURL }));
            alert("Image uploaded successfully!");
            setLoading(false); // Set loading to false after uploading
        } catch (error) {
            alert("Error uploading image. Please try again.");
            console.error("Error uploading image:", error);
        }
    };


    // Handle Input Change
    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    // Add Job
    const handleAddJob = async (e) => {
        e.preventDefault();

        if (!jobData.title || !jobData.description || !jobData.image) {
            alert("Please fill all fields including the image!");
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "pmu-jobs"), jobData);
            setJobs((prev) => [...prev, { id: docRef.id, ...jobData }]); // Update list dynamically
            alert("Job added successfully!");
            setJobData({ title: "", company: "", location: "", description: "", image: "" }); // Reset form
        } catch (error) {
            console.error("Error adding job:", error);
            alert("Failed to add job.");
        }
    };


    // Delete Job
    const handleDeleteJob = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this job?");
        if (!confirmDelete) return;

        try {
            setLoading(true); // Set loading to true while deleting
            await deleteDoc(doc(db, "pmu-jobs", id));
            setJobs(jobs.filter((job) => job.id !== id));
            alert("Job deleted successfully!");
        } catch (error) {
            console.error("Error deleting job:", error);
            alert("Failed to delete job.");
        }
    };

    return (
        <div className="w-full mx-auto  bg-white shadow-md rounded-lg p-6 mt-12" id='job'>
            <h2 className="text-3xl font-semibold mb-4 text-gray-900">Job Management</h2>

            {/* Add Job Form */}
            <form className="space-y-6 mt-6" onSubmit={handleAddJob}>
                <div className="flex justify-end">
                    {
                        loading ? (
                            <button
                                type="submit"
                                className="bg-primary text-white px-8 w-full md:w-36 py-2 rounded-lg hover:bg-secondary transition cursor-not-allowed"
                                disabled
                            >
                                Adding...
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="bg-primary text-white px-8 w-full md:w-36 py-2 rounded-lg hover:bg-secondary transition"
                            >
                                Add Job
                            </button>
                        )
                    }

                    {/* <button
                        type="submit"
                        className="bg-primary text-white px-8 w-full md:w-36 py-2 rounded-lg hover:bg-secondary transition"
                    >
                        Add Job
                    </button> */}
                </div>
                <input
                    type="text"
                    name="title"
                    value={jobData.title}
                    onChange={handleChange}
                    placeholder="Job Title"
                    required
                    className="w-full p-2 border border-gray-700 rounded-lg"
                />
                {/* image upload */}
                <div className="w-full">
                    <label className="block text-gray-700 font-medium mb-2">Upload Image</label>

                    {/* Hidden File Input */}
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        id="fileInput"
                        onChange={handleImageUpload}
                        className="hidden"
                        required
                    />

                    {/* Custom File Upload Button */}
                    <label
                        htmlFor="fileInput"
                        className="w-full flex items-center justify-center gap-2 cursor-pointer p-3 rounded-lg border border-gray-700 bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
                    >
                        📤 Upload Image
                    </label>

                    {/* Show selected file name */}
                    {jobData.image && (
                        <p className="mt-2 text-sm text-gray-600">
                            Image uploaded for : <span className="font-medium">{jobData.title}</span>
                        </p>
                    )}
                </div>
                <textarea
                    name="description"
                    value={jobData.description}
                    onChange={handleChange}
                    placeholder="Job Description"
                    rows="3"
                    required
                    className="w-full p-2 border border-gray-700 rounded-lg"
                ></textarea>

            </form>


            {/* Job List */}
            <h3 className="text-2xl font-semibold mt-8 mb-6 text-gray-900">Job Listings</h3>
            {loading ? (
                <p className="text-center text-gray-600">Loading jobs...</p>
            ) : jobs.length > 0 ? (
                <ul className="space-y-4">
                    {jobs.map((job) => (
                        <li key={job.id} className="p-4 border border-gray-300 rounded-lg flex justify-between items-center">
                            <div>
                                <h4 className="text-lg font-semibold">{job.title}</h4>
                                {/* <p className="text-sm text-gray-600">{job.Description}</p> */}
                            </div>
                            <button
                                onClick={() => handleDeleteJob(job.id)}
                                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-600">No jobs available.</p>
            )}
        </div>
    );
};



const DeleteForm = ({ setState, collectionName, id }) => {
    // console.log(id);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, collectionName, id));
            setState((prev) => prev.filter((item) => item.id !== id));
            setShowConfirm(false);
            alert("Alumni deleted successfully!");
        } catch (error) {
            console.error("Error deleting alumni:", error);
            alert("Failed to delete alumni.");
        }
    };

    return (
        <>
            <button
                className="bg-red-500 text-white cursor-pointer px-3 py-1 rounded hover:bg-red-700 ml-2"
                onClick={() => setShowConfirm(true)}
            >
                Delete
            </button>

            {/* Global Modal */}
            {showConfirm && (
                <div className="fixed inset-0 bg-secondary bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 w-96">
                        <p className="text-gray-700 text-center">Are you sure you want to delete?</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                className="bg-gray-300 cursor-pointer px-4 py-2 rounded hover:bg-gray-400"
                                onClick={() => setShowConfirm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-red-700"
                                onClick={handleDelete}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};




