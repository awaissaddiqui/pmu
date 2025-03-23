import React, { useEffect } from 'react';
import Slider from '../components/Slider';
import HomeImg from '../assets/cr3.jpeg'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase';
// const newsItems = [
// "New Scholarship Opportunities Available for 2025!",
//     "Project Management Unit receives new funding for research.",
//     "Upcoming Webinar on Effective Project Management.",
//     "Alumni Reunion scheduled for March 2025.",
//     "Call for proposals: Research on Educational Technology.",
// ];

function Home() {
    const [news, setNews] = React.useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const dataNews = await getDoc(doc(db, "pmuAdminData", "newsData"));
                if (dataNews.exists()) {
                    setNews(dataNews.data().news);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])
    return (
        <>
            <Slider />
            <div className="p-8 bg-[#f4f7f6]">
                <div className="flex flex-col md:flex-row gap-6 mt-6">
                    {/* Left Section */}
                    <div className="bg-white p-8 rounded-lg shadow-lg flex-1">
                        <h1 className="md:text-3xl text-xl font-bold text-primary">Welcome to the Project Management Unit</h1>
                        <p className="mt-4 text-gray-700">
                            The Project Management Unit (PMU) is dedicated to the effective management of projects,
                            including scholarships, educational funds, and research initiatives. Our goal is to
                            facilitate the smooth execution of various projects that contribute to the development
                            of education and research in our region. Stay connected with us for the latest updates
                            and opportunities.
                        </p>
                    </div>

                    {/* Right Section (News & Updates) */}
                    <div className="border-2 border-primary h-72 bg-white rounded-lg shadow-lg w-full md:w-1/2 p-4">
                        <h2 className="text-xl font-bold text-primary text-center mb-4">News & Updates</h2>
                        <NewsTicker news={news} />
                    </div>
                </div>
            </div>
            {/* <div>
                <img src={HomeImg} alt="Home" className="w-full h-[500px] object-cover" />
            </div> */}
            {/* About Section */}
            <div className="flex flex-col md:flex-row gap-6 mt-6">
                <div className="bg-secondary p-8 rounded-lg shadow-lg flex-1 m-12 md:mb-22">
                    <h2 className="text-3xl font-bold text-white mb-6">About PMU</h2>
                    <p className="text-md text-white leading-relaxed">
                        The Project Management Unit (PMU) is dedicated to the efficient management and execution of various projects, both within and outside the university. We aim to bring innovation, leadership, and quality services to all projects we undertake, ensuring sustainable impact and long-term success. Our team is highly skilled and dedicated to delivering projects on time and within budget. We strive to foster collaborations with key stakeholders and empower individuals to reach their fullest potential.
                    </p>
                </div>
                <div className='w-full md:w-1/2 p-4'>
                    <Slider isRounded='rounded-md' />
                </div>
            </div>
            {/* Vision and Mission Section */}
            <div className="flex flex-col md:flex-row gap-6 mt-6 mb-8">
                {/* Vision Card */}
                <div className="flex-1 bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Vision</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Our vision is to be a leader in project management, known for innovation, quality, and sustainable development. We strive to achieve excellence in every project, setting the benchmark for others in the industry.
                    </p>
                </div>

                {/* Mission Card */}
                <div className="flex-1 bg-secondary p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-white mb-4">Mission</h2>
                    <p className="text-white leading-relaxed">
                        Our mission is to deliver successful projects through effective planning, execution, and collaboration. We are committed to providing value to stakeholders and fostering an environment of continuous improvement and innovation.
                    </p>
                </div>
                {/* Core Values Section */}
                <div className="flex-1 bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Core Values</h2>
                    <p className='text-gray-600 leading-relaxed'>
                        Integrity, collaboration, and excellence are the core values that guide our work. We uphold high ethical standards, promote teamwork, and are dedicated to delivering the best possible outcomes for all projects.
                    </p>

                </div>
            </div>



            {/* Footer  */}
            {/* <Footer /> */}
        </>
    );
}

// Animated News Ticker Component
const NewsTicker = ({ news }) => {
    return (
        <div className="relative h-[220px] overflow-hidden">
            <ul className="list-none p-0 m-0 h-full animate-scroll">
                {news.map((news, index) => (
                    <li key={index} className="p-3 text-gray-900 text-center rounded-md">
                        {news}
                    </li>
                ))}
                {/* Duplicate the news items for seamless looping */}
                {news.map((news, index) => (
                    <li key={`duplicate-${index}`} className="p-3 text-gray-900 text-center rounded-md">
                        {news}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;