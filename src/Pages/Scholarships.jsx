import React from 'react';
import GOV from '../assets/gov.png';
import { Link } from 'react-router'; // Fixed incorrect import

const scholarships = [
    {
        title: "CMEEF",
        description: "Chief Minister Education Endowment Fund Scholarships (CMEEF) has been established for the talented and deserving students of Khyber Pakhtunkhwa purely on a merit-cum-affordability basis in selected leading national institutions both at Undergraduate and Graduate levels and internationally in the top 300 Universities of the world (QS ranking) in Ph.D.",
        link: "/scholarships/CMEEF/details"
    },
    {
        title: "HEEF",
        description: "The Higher Education Endowment Fund (HEEF) scholarships are provided to the students of BS Programs studying in Govt colleges of the province on merit cum affordability basis. The said Scholarships are provided to top-02 position holders in each semester.",
        link: "/scholarships/HEEF/details"
    }
];

function Scholarships() {
    return (
        <div className="bg-gray-100 py-12 px-6">
            <div className="max-w-6xl xl:max-w-full mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-8">
                    {scholarships.map((scholarship, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 flex flex-col items-center text-center">
                            <img src={GOV} alt="Government of Khyber Pakhtunkhwa" className="rounded-lg w-32 h-32 mb-4" />
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">{scholarship.title}</h3>
                            <p className="text-gray-600 text-start leading-relaxed mb-6">{scholarship.description}</p>
                            <Link
                                to={scholarship.link}
                                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition duration-300"
                            >
                                View details →
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Scholarships;
