import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import { trefoil } from "ldrs";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Register the trefoil loader
trefoil.register();

const Alumni = () => {
    const [successStories, setSuccessStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSuccessStories = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "pmu-alumni"));
                const data = querySnapshot.docs.map((doc) => doc.data());
                setSuccessStories(data);
            } catch (error) {
                console.error("Error fetching success stories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSuccessStories();
    }, []);

    return (
        <div className="bg-gray-100 text-center px-6 py-10">
            {/* Section Heading */}
            <div className="max-w-3xl mx-auto">
                <h2 className="font-bold text-3xl mb-4 text-gray-900">Our Alumni</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                    The Project Management Unit takes pride in the success of its alumni.
                    Our graduates have gone on to excel in various industries, contributing
                    to the world of project management, education, and research.
                </p>
            </div>

            {/* Loading Animation */}
            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <l-trefoil size="50" stroke="5" speed="1.5" color="#2563EB"></l-trefoil>
                </div>
            ) : successStories.length === 0 ? (
                <p className="text-gray-600 text-lg mt-6">No success stories available.</p>
            ) : (
                // Swiper Slider
                <div className="w-full mx-auto mt-8">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 }
                        }}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        className="py-4"
                    >
                        {successStories.map((story, index) => (
                            <SwiperSlide key={index} className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg text-center">
                                <img src={story.image} alt={story.name} className="rounded-full w-24 h-24 mb-4 border-4 border-gray-300" />
                                <h3 className="text-lg font-semibold text-gray-800">{story.name}</h3>
                                <p className="text-gray-500 text-sm">{story.title}</p>
                                <p className="text-gray-700 mt-3 italic">"{story.description}"</p>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    );
};

export default Alumni;
