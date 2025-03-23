import React from 'react';
import cmeef from '../../assets/cmeef.jpg';
import { Link } from 'react-router';

const CMEEF = () => {
    return (
        <div className="container mx-auto text-center mt-10 p-5">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="md:w-1/2 text-left">
                    <h2 className="text-2xl md:text-4xl font-semibold text-black mb-4">CHIEF MINISTER EDUCATION ENDOWMENT FUND (CMEEF)</h2>
                    <p className="mt-4 text-gray-700">
                        Chief Minister Education Endowment Fund Scholarships (CMEEF) has been established for the talented and deserving students of Khyber Pakhtunkhwa purely on a merit-cum-affordability basis in selected leading national institutions both at Undergraduate and Graduate levels and internationally in the top 300 Universities of the world (QS ranking) in Ph.D.
                    </p>
                </div>
                <img src={cmeef} alt="CMEEF" className="md:w-1/2 rounded-lg shadow-lg" />
            </div>

            <div className="overflow-x-auto mt-10">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className="p-2 border">S.No.</th>
                            <th className="p-2 border">Nature of Scholarship</th>
                            <th className="p-2 border">No. of Scholarships Awarded</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border">
                            <td className="p-2 border">1</td>
                            <td className="p-2 border">Undergraduate Inland</td>
                            <td className="p-2 border">366</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">2</td>
                            <td className="p-2 border">Graduate Inland</td>
                            <td className="p-2 border">150</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">3</td>
                            <td className="p-2 border">Graduate International</td>
                            <td className="p-2 border">10</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="mt-10 text-left">
                <h3 className="text-xl font-semibold">Eligibility Criteria for CMEEF Inland Undergraduate Scholarships:</h3>
                <ul className="list-disc ml-5 mt-2 text-gray-700 mb-4">
                    <li>The candidate must have a domicile of Khyber Pakhtunkhwa.</li>
                    <li>The candidate must fulfill admission criteria (merit) for the degree program in an approved institution.</li>
                    <li>Must not be a recipient of any other scholarship for the degree program.</li>
                    <li>Monthly income of the candidate’s parents/guardian shall not exceed Rs. 100,000/-.</li>
                </ul>
                <h3 className="text-xl font-semibold">Eligibility Criteria for CMEEF Inland Graduate National Programme:</h3>
                <ul className="list-disc ml-5 mt-2 text-gray-700 mb-4">
                    <li>The candidate must have a domicile of Khyber Pakhtunkhwa.</li>
                    <li>The candidate’s age must be less than 50 years at the time of application.</li>
                    <li>The candidate must have a first-class academic career (CGPA 3.00/4.00 or 3.75/5.00).</li>
                    <li>Minimum 50% score in GRE/GAT for MS/M.Phil., while 60% score for Ph.D.</li>
                    <li>Monthly income of the candidate’s parents/guardian shall not exceed Rs. 100,000/-.</li>
                </ul>
                <h3 className="text-xl font-semibold">Eligibility Criteria for CMEEF Graduate International Programme:</h3>
                <ul className="list-disc ml-5 mt-2 text-gray-700">
                    <li>The candidate must have a domicile of Khyber Pakhtunkhwa.</li>
                    <li>The candidate’s age must be less than 45 years at the time of application.</li>
                    <li>Minimum 60% score in GRE/GAT for Ph.D.</li>
                    <li>Must have admission to a top 300 university worldwide.</li>
                    <li>Monthly income of the candidate’s parents/guardian shall not exceed Rs. 100,000/-.</li>
                </ul>
            </div>

            <div className="mt-10 text-center">
                <h3 className="text-2xl font-semibold text-secondary">How to Apply:</h3>
                <h2 className="text-lg font-semibold mt-4">Undergraduate National Program:</h2>
                <ul className=" ml-5 text-gray-700 list-none">
                    <li>The candidates directly applying in the selected institution in the approved discipline.</li>
                </ul>
                <div className='mt-6'>
                    <Link to="/scholarships/CMEEF/details/UnNationalProgram" className=" mt-2 bg-primary hover:bg-secondary cursor-pointer text-white font-bold w-full md:w-40 py-3.5 px-10 rounded">Apply Now</Link>
                </div>
                <h2 className="text-lg font-semibold mt-10">Graduate National Program:</h2>
                <ul className="list-none ml-5 text-gray-700">
                    <li>The candidates directly applying in the selected institution in the approved discipline.</li>
                </ul>
                <div className='mt-6'>
                    <Link to="/scholarships/CMEEF/details/GraduateNationalProgram" className="bg-primary hover:bg-secondary cursor-pointer text-white font-bold w-full md:w-40 py-3.5 px-10 rounded">Apply Now</Link>
                </div>
            </div>

            {/* Undergraduate Scholarships Table */}
            <div className="overflow-x-auto mt-10">
                <h3 className="text-primary text-xl font-semibold mb-4">List of Institutions and Disciplines for Undergraduate Scholarships</h3>
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className="p-2 border">Institutions</th>
                            <th className="p-2 border">Discipline/Degree</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border">
                            <td className="p-2 border">Agha Khan Medical University Karachi</td>
                            <td className="p-2 border">MBBS</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">UET Peshawar</td>
                            <td className="p-2 border">Industrial Engineering, Mining Engineering</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">COMSATS Abbottabad</td>
                            <td className="p-2 border">Power Engineering</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">UET Lahore</td>
                            <td className="p-2 border">Petroleum Engineering</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">NED Karachi</td>
                            <td className="p-2 border">Petroleum Engineering</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">GIK Institute, Swabi</td>
                            <td className="p-2 border">Laser & Opto-Electronic Physics</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">NUST Islamabad</td>
                            <td className="p-2 border">Computer Science, Geo-informatics (GIS/RS)</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">GCU-Lahore</td>
                            <td className="p-2 border">Mathematics</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">University of Peshawar</td>
                            <td className="p-2 border">Geology, Economics, Social Work, Disaster Management</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">IBA Karachi</td>
                            <td className="p-2 border">Accounting & Finance</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">IM Sciences, Peshawar</td>
                            <td className="p-2 border">BBA (Hons)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Graduate Scholarships Table */}
            <div className="overflow-x-auto mt-10">
                <h3 className="text-primary text-xl font-semibold mb-4">List of Institutions and Disciplines for Graduate Scholarships</h3>
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className="p-2 border">Institutions</th>
                            <th className="p-2 border">Discipline/Degree</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border">
                            <td className="p-2 border">Quaid-e-Azam University Islamabad</td>
                            <td className="p-2 border">Geo-Physics, Anthropology, Mathematics</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">PIEAS, Islamabad</td>
                            <td className="p-2 border">Medical Physics, Biotechnology at NIBGE, Nuclear Medicine</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">KMU, Peshawar</td>
                            <td className="p-2 border">Anatomy, Microbiology</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">University of Peshawar</td>
                            <td className="p-2 border">Pharmacy,   Environmental Sciences, Microbiology</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">Islamia College University</td>
                            <td className="p-2 border">English Literature</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">University of Agriculture,Peshawar</td>
                            <td className="p-2 border">Biotechnology & Generic Engineering</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">GCU-Lahore</td>
                            <td className="p-2 border">Mathematics, English Literature</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">  UET, Peshawar</td>
                            <td className="p-2 border">Mining Engineering, Industrial Engineering</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">PIDE, Islamabad</td>
                            <td className="p-2 border">Economics</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* PhD Scholarships Table */}
            <div className="overflow-x-auto mt-10">
                <h3 className="text-secondary text-2xl font-semibold mb-4">Graduate (Ph.D.) International Program</h3>
                <p className="text-gray-700 mb-4">Under the Chief Minister Education Endowment Fund Ph.D. scholarship, students are awarded scholarships in the top 300 universities of the world (QS ranking) in the following disciplines:</p>
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className="p-2 border">Category</th>
                            <th className="p-2 border">Discipline</th>
                            <th className="p-2 border">Degree</th>
                            <th className="p-2 border">Universities</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border">
                            <td className="p-2 border">Grad: International only</td>
                            <td className="p-2 border">Anatomy, Physiology,
                                Microbiology, Energy, Laser and
                                Opto-Electronics; Communication,
                                Power Engineering, GIS/RS
                                Computer Network &amp; Security,
                                Modeling and Simulation,
                                Petroleum Engineering,
                                Biotechnology, Forensic Sciences,
                                Molecular Biology, Applied
                                Biology, Genetic Engineering,
                                Biomedical Engineering, Applied
                                Chemistry, Minerals, Water
                                Resource Management, Advanced
                                and Smart Materials, Development
                                Studies and Economics. </td>
                            <td className="p-2 border">PhD/D.Phil</td>
                            <td className="p-2 border">Top 300 QS Ranking Universities(Quacquarelli Symonds)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='flex flex-col mt-8'>
                <h3 className='text-2xl font-semibold text-secondary'>How to Apply:</h3>
                <p className='text-gray-700' >Candidates having valid unconditional offer of admission from top 300
                    universities of world (QS ranking) for the discipline shall apply on the form as
                    specified in the Rules.The candidate must submit the application forms along with all the supporting
                    documents to Project Management Unit Office well before the closing date.</p>
                <div className='mt-8'>
                    <Link to="/scholarships/CMEEF/details/PHDInternational" className="bg-primary hover:bg-secondary cursor-pointer text-white font-bold w-full md:w-40 py-3.5 px-10 rounded">Apply Now</Link>
                </div>
            </div>

            {/* FAQs Section */}
            <div className="overflow-x-auto mt-10">
                <h3 className="text-primary text-xl font-semibold mb-4">FAQs</h3>
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className="p-2 border">S.No</th>
                            <th className="p-2 border">Question</th>
                            <th className="p-2 border">Answer</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border">
                            <td className="p-2 border">1</td>
                            <td className="p-2 border">Who can apply for these scholarships?</td>
                            <td className="p-2 border">Candidates having domicile of KP</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">2</td>
                            <td className="p-2 border">How can I submit the application form
                                both for the scholarship at
                                undergraduate and graduate level?</td>
                            <td className="p-2 border">Application forms must be submitted to the focal
                                person of the concern universities well before the
                                closing date notified by the universities</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">3</td>
                            <td className="p-2 border">What is the income ceiling level?</td>
                            <td className="p-2 border">Monthly income of the parents or guardians of the
                                candidates must be less than Rs.1, 00,000/- from
                                all sources.</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">4</td>
                            <td className="p-2 border">What education is required if the
                                applicant wants to apply
                                Undergraduate program?</td>
                            <td className="p-2 border">The applicant must have completed
                                HSSC/Intermediate or equivalent qualification.</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">5</td>
                            <td className="p-2 border">Which subjects I can apply for?</td>
                            <td className="p-2 border">Mentioned in the advertisement and above</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">6</td>
                            <td className="p-2 border">What is age limit for Masters/PhD?</td>
                            <td className="p-2 border">45 year inland and 50 year for international

                                scholarships.</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">7</td>
                            <td className="p-2 border">What education is required if the
                                applicant wants to apply for Graduate
                                program Postgraduate program?</td>
                            <td className="p-2 border">16 year Education for MS/M.Phil and 18 years
                                Education for PH.D</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">  8</td>
                            <td className="p-2 border">How much score in GAT (G) or GAT
                                (S) is required for the graduate scholarship</td>
                            <td className="p-2 border">Minimum 50% in GAT(G/S) for MS/M.Phil and
                                60% score in GAT (S) for Ph.D</td>
                        </tr>
                        <tr className="border">
                            <td className="p-2 border">9</td>
                            <td className="p-2 border">What is the scholarship coverage?</td>
                            <td className="p-2 border">Chief Minister Education Endowment Fund
                                scholarships are fully funded. It covers all the
                                expenses like, tuition fee, admission fee, hostel fee
                                and monthly stipend of Rs. 5,000/-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CMEEF;
