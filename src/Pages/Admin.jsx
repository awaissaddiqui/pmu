import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { auth, db } from '../Firebase';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';

const Admin = () => {
    const [news, setNews] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedNews, setEditedNews] = useState([]);
    const [formData, setFormData] = useState([]);
    const [formDataUndergrad, setFormDataUndergrad] = useState([]);
    const [formDataGraduate, setFormDataGraduate] = useState([]);
    const [formDataPhdInternational, setFormDataPhdInternational] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const now = Date.now();
                const cacheExpiry = 10 * 60 * 1000; // 5 minutes

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
                // Fetch Graduate forms Data
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

                // Fetch Phd International forms Data
                const storedFormDataPhdInternational = JSON.parse(localStorage.getItem("formDataPhdInternational"));
                const phdInternationalFormsPromise = storedFormDataPhdInternational && isCacheValid(storedFormDataPhdInternational.timestamp)
                    ? Promise.resolve(storedFormDataPhdInternational.data)
                    : (async () => {
                        const collectionRefPhdInternational = collection(db, "phd-international");
                        const querySnapshotPhdInternational = await getDocs(collectionRefPhdInternational);

                        const formsPhdInternational = querySnapshotPhdInternational.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                        // console.log(formsPhdInternational);
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
                }
                else {
                    console.error("Error fetching graduate forms data:", results[3].reason);
                }
                if (results[4].status === "fulfilled") {
                    setFormDataPhdInternational(results[4].value);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
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
        <div className="min-h-screen bg-gray-100 p-5 relative">
            <button onClick={handleLogout} className="absolute top-5 right-5 bg-red-700 text-white p-2 rounded-lg w-24 text-center hover:bg-red-800 transition">
                Logout
            </button>
            <h1 className="text-3xl text-center font-semibold text-blue-600 mt-10">Admin Dashboard</h1>

            {/* News Section */}
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Latest News</h2>
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
                {!isEditing ? (
                    <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white p-2 rounded-lg w-40 text-center mt-4 mx-auto block hover:bg-yellow-600 transition">
                        Edit
                    </button>
                ) : (
                    <button onClick={async () => {
                        try {
                            const docRef = doc(db, "pmuAdminData", "newsData");
                            await updateDoc(docRef, { news: editedNews });
                            setNews(editedNews);
                            setIsEditing(false);
                        } catch (error) {
                            console.log("Error updating news:", error);
                        }
                    }} className="bg-green-500 text-white p-2 rounded-lg w-40 text-center mt-4 mx-auto block hover:bg-green-600 transition">
                        Submit
                    </button>
                )}
            </div>

            {/* Research Forms Data Section */}
            <div className="mt-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Research Form Submissions</h2>
                {formData.length > 0 ? (
                    <table className="w-full border-collapse border border-gray-300">
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
                                    <td className="border border-gray-300 p-2 cursor-pointer text-blue-600 underline" onClick={() => navigate(`/admin/form-details/${form.pi_email}`)}>
                                        {form.pi_email}
                                    </td>
                                    <td className="border border-gray-300 p-2">{form.title}</td>
                                    <td className="border border-gray-300 p-2">
                                        <button className="bg-primary text-white px-3 py-1 rounded hover:bg-secondary" onClick={() => navigate(`/admin/form-details/${form.pi_email}`)}>View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No research forms submitted yet.</p>
                )}
            </div>

            {/* Undergraduate Forms Data Section */}
            <div className="mt-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Undergraduate Form Submissions</h2>
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
                                    <td className="border border-gray-300 p-2">
                                        <button className="bg-primary cursor-pointer text-white px-3 py-1 rounded hover:bg-secondary" onClick={() => navigate(`/admin/form-details-undergrad/${form.email}`)}>View</button>
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
            <div className="mt-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Graduate Form Submissions</h2>
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
                                    <td className="border border-gray-300 p-2">
                                        <button className="bg-primary cursor-pointer text-white px-3 py-1 rounded hover:bg-secondary" onClick={() => navigate(`/admin/form-details-graduate/${form.email}`)}>View</button>
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
            <div className="mt-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">PHD International Form Submissions</h2>
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
                                    <td className="border border-gray-300 p-2">
                                        <button className="bg-primary cursor-pointer text-white px-3 py-1 rounded hover:bg-secondary" onClick={() => navigate(`/admin/form-details-phd/${form.email}`)}>View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No PHD International forms submitted yet.</p>
                )}
            </div>
        </div>
    );
};

export default Admin;
