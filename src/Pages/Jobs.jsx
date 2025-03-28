import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import { trefoil } from "ldrs";

// Register the Trefoil loader
trefoil.register();

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

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
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">Job Advertisements</h1>

            {/* Loading Animation */}
            {loading && (
                <div className="flex justify-center items-center py-10">
                    <l-trefoil size="50" stroke="5" speed="1.5" color="#2563EB"></l-trefoil>
                </div>
            )}

            {/* Job Listings */}
            {!loading && jobs.length === 0 ? (
                <p className="text-center text-gray-600">Jobs will be posted here soon.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {jobs.map((job) => (
                        <div key={job.id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition">
                            {job.image && (
                                <img src={job.image} alt={job.title} className="w-full h-40 object-cover rounded-md mb-4" />
                            )}
                            <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                            <p className="text-gray-700 text-sm">{job.company} - {job.location}</p>
                            <p className="text-gray-600 mt-2 text-sm">{job.description.slice(0, 100)}...</p>
                            <button className="mt-4 w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition">
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Jobs;
