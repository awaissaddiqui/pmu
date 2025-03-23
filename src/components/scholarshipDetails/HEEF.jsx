import React from 'react';
import heefImage from '../../assets/heef.jpg'; // Ensure the path to your image is correct

const HEEF = () => {
    return (
        <div className="container mx-auto text-center mt-5 pt-5">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                <div className="href-content-text md:w-1/2">
                    <h2 className="text-2xl md:text-4xl font-semibold text-black mb-4">HIGHER EDUCATION ENDOWMENT FUND (HEEF)</h2>
                    <p className="text-gray-700 text-start">
                        The Higher Education Endowment Fund (HEEF) scholarships are provided to the
                        students of BS Programs studying in Govt colleges of the province on merit cum affordability
                        basis. The said Scholarships are provided to top-02 position holders in each semester.
                    </p>
                </div>
                <img src={heefImage} alt="HEEF Image" className="md:w-1/2 mt-5 md:mt-0 rounded-lg shadow-lg" />
            </div>

            {/* Eligibility Criteria */}
            <div className="criteria-section mb-8">
                <h3 className="text-2xl font-semibold text-secondary mb-4 md:text-start text-center">Eligibility Criteria for HEEF Scholarships:</h3>
                <ul className="list-disc list-inside text-gray-700 text-start">
                    <li>A student of BS 4-year Degree Programme in any of the Public Sector College.</li>
                    <li>Not be in receipt of any other educational scholarship.</li>
                    <li>Monthly income of his father/guardian (from all sources) should not be more than Rs.50000/per month.</li>
                    <li>Only students of 2nd semester and onward shall be eligible for the scholarship.</li>
                    <li>Students having excellent performance in the 1st semester shall be refunded admission fee in addition to the scholarship for the 2nd semester.</li>
                    <li>Have secured at least 65% marks (GPA 3.0) in the last attended Exam.</li>
                </ul>
            </div>

            {/* How to Apply Section */}
            <div className="apply-section mb-8">
                <h3 className="text-2xl font-semibold text-secondary mb-4">How to Apply:</h3>
                <p className='text-gray-700' >The recommendations are provided by the Focal Persons nominated by their concerned Principal to Project Management Unit, Higher Education Department.</p>
            </div>

            {/* FAQs */}
            <div className="container mx-auto">
                <h3 className="text-center text-2xl font-bold text-secondary mt-10 mb-6">FAQs:</h3>
                <table className="min-w-full bg-white border border-gray-300 mb-4">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className="py-2 px-4 border">S.No</th>
                            <th className="py-2 px-4 border">Question</th>
                            <th className="py-2 px-4 border">Answers</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-2 px-4 border text-center">1</td>
                            <td className="py-2 px-4 border">Who can apply for these scholarships?</td>
                            <td className="py-2 px-4 border">Candidates having domicile of Pakistani</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border text-center">2</td>
                            <td className="py-2 px-4 border">How can I submit the application form for the scholarship at graduate level?</td>
                            <td className="py-2 px-4 border">The Principal of the college concerned are responsible for wide dissemination of information regarding the scholarships in their institutions.</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border text-center">3</td>
                            <td className="py-2 px-4 border">What is the income ceiling level?</td>
                            <td className="py-2 px-4 border">Monthly income of the parents or guardians of the candidates must be less than Rs.50000/- from all sources.</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border text-center">4</td>
                            <td className="py-2 px-4 border">What criteria is required if the applicant wants to apply program?</td>
                            <td className="py-2 px-4 border">The applicant must have 3.0 Gpa in last exam.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HEEF;