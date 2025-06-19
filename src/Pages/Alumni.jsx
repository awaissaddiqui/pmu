import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import { trefoil } from "ldrs";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useLocation } from "react-router";

// Register the trefoil loader
trefoil.register();

const Alumni = ({ showVideos = 'true' }) => {
    const para = "The Project Management Unit (PMU) is proud to showcase the success stories of our alumni. These individuals have excelled in their respective fields, demonstrating the impact of our programs and initiatives. Their achievements inspire current and future students to strive for excellence and make a difference in their communities.";
    const location = useLocation();

    const [successStories, setSuccessStories] = useState([]);
    const [alumniVideos, setAlumniVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let storiesLoaded = false;
        let videosLoaded = false;

        const checkAllLoaded = () => {
            if (storiesLoaded && videosLoaded) setLoading(false);
        };

        const fetchSuccessStories = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "pmu-alumni"));
                const data = querySnapshot.docs.map((doc) => doc.data());
                setSuccessStories(data);
            } catch (error) {
                console.error(error);
            } finally {
                storiesLoaded = true;
                checkAllLoaded();
            }
        };

        const fetchAlumniVideos = async () => {
            try {
                const docRef = doc(db, "pm-social-media", "Alumni-videos");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setAlumniVideos(docSnap.data().videos || []);
                } else {
                    setAlumniVideos([]);
                }
            } catch (error) {
                console.error(error);
                setAlumniVideos([]);
            } finally {
                videosLoaded = true;
                checkAllLoaded();
            }
        };

        fetchSuccessStories();
        fetchAlumniVideos();
    }, []);

    function getYouTubeEmbedUrl(url) {
        // Handles both youtu.be and youtube.com URLs
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11
            ? `https://www.youtube.com/embed/${match[2]}`
            : url;
    }
    return (
        <div className="bg-gray-100 text-center px-6 py-10">
            {/* Section Heading */}
            <div className="max-w-3xl mx-auto">
                <h2 className="font-bold text-3xl mb-4 text-gray-900">Success Stories</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                    {location.pathname === "/alumni" ? para : null}
                </p>
            </div>

            {/* Loading Animation for whole component */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <l-trefoil size="50" stroke="5" speed="1.5" color="#2563EB"></l-trefoil>
                </div>
            ) : (
                <>
                    {/* Success Stories */}
                    {successStories.length === 0 ? (
                        <p className="text-gray-600 text-lg mt-6">No success stories available.</p>
                    ) : (
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
                                    <SwiperSlide
                                        key={index}
                                        className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 flex flex-col items-center text-center "
                                    >
                                        {/* Profile Image */}
                                        <img
                                            src={story.image}
                                            alt={story.name}
                                            className="rounded-full w-28 h-28 mb-4 border-4 object-cover border-gray-300"
                                        />

                                        {/* Name and Title */}
                                        <h3 className="text-lg font-semibold text-gray-800">{story.name}</h3>
                                        <p className="text-gray-500 text-sm">{story.title}</p>

                                        {/* Description with fixed height */}
                                        <p
                                            className={`text-gray-700 mt-3 text-start italic ${location.pathname === "/" ? "h-[150px]" : "h-[600px]"} overflow-hidden px-2`}
                                        >
                                            "{story.description}"
                                        </p>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}

                    {/* Alumni Videos Section */}
                    {showVideos !== false && (
                        <div className="max-w-6xl mx-auto mt-16">
                            <h2 className="font-bold text-2xl mb-6 text-gray-900">Alumni Videos</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {alumniVideos.map((video, idx) => (
                                    <div key={idx} className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
                                        <div className="w-full aspect-video mb-3">
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={getYouTubeEmbedUrl(video.url)}
                                                title={video.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="rounded-lg w-full h-60"
                                            ></iframe>
                                        </div>
                                        <p className="font-semibold text-gray-800">{video.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Alumni;
