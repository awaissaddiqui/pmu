import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import InfoGrid from '../components/InfoGrid';

const AdminPhdInternational = () => {
    const [formData, setFormData] = useState([]);
    const { email } = useParams();

    // Fetch Data from localStorage
    useEffect(() => {
        const fetchData = () => {
            try {
                const storedData = JSON.parse(localStorage.getItem("formDataPhdInternational")) || [];
                const userForm = storedData.data.find((item) => item.email === email); // ✅ Find the specific form by email
                console.log(userForm);
                setFormData(userForm ? [userForm] : []);
            } catch (error) {
                console.error("Error fetching form details:", error);
            }
        };

        fetchData();
    }, [email]);

    if (!formData) {
        return <h1 className="text-5xl text-center text-gray-500">No data found</h1>;
    }

    return (
        <div className="w-full mx-auto bg-white shadow-lg rounded-lg p-6 gap-8">
            <h2 className="text-3xl font-bold text-center mb-6">PHD National Form Details</h2>

            {/* Personal Information */}
            <InfoGrid
                title="Personal Information"
                data={formData?.[0] || {}} // Ensuring formData is structured properly
                fields={[
                    { label: "Full Name", name: "full_name" },
                    { label: "CNIC No", name: "cnic_no" },
                    { label: "Father Name", name: "father_name" },
                    { label: "Father CNIC No", name: "father_cnic_no" },
                    { label: "Passport No", name: "passport_no" },
                    { label: "Passport Expiry Date", name: "passport_expiry_date" },
                    { label: "Date of Birth", name: "dob" },
                    { label: "Domicile", name: "domicile" },
                    { label: "Gender", name: "gender" },
                    { label: "Age on closing date for admission", name: "age" },
                    { label: "Mailing Address", name: "mailing_address" },
                    { label: "Permanent Address", name: "permanent_address" },
                    { label: "Email", name: "email" },
                    { label: "Mobile 1", name: "mobile_1" },
                    { label: "Mobile 2", name: "mobile_2" },
                    { label: "Home", name: "home" },
                    { label: "Fax", name: "fax" },
                    { label: "Office", name: "office" },
                    { label: "References in Pakistan", name: "references" },
                    { label: "Marital Status", name: "marital_status" },
                    ...(formData[0]?.marital_status === "married" ?
                        [
                            { label: "Details", name: "spouse_details" },
                        ] : []),
                    // { label: "Dependents", name: "dependents" },
                    { label: "Other Nationality", name: "other_nationality" },
                ]}
            />
            {/* education details */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Education Details</h2>
                <table className="w-full border-collapse border border-gray-300 col-span-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Certificate/Degree</th>
                            <th className="border border-gray-300 p-2">Major Subjects</th>
                            <th className="border border-gray-300 p-2">Result Declaration Date</th>
                            <th className="border border-gray-300 p-2">Marks Obtained</th>
                            <th className="border border-gray-300 p-2">Total Marks</th>
                            <th className="border border-gray-300 p-2">CGPA</th>
                            <th className="border border-gray-300 p-2">Institution</th>
                            <th className="border border-gray-300 p-2">Board/University</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            "SSC/Matric", "HSSC/Intermediate", "Bachelors (B.A, BSc, Hons. etc.)", "Masters or Equivalent", "M. Phil", "GRE/GAT (Subject/General)", "Medals (Gold/Silver/Bronze)", "Other (please specify)"]
                            .map((title, rowIndex) => (
                                <tr className='hover:bg-gray-100' key={rowIndex}>
                                    <td className="border border-gray-300 p-2 font-semibold">{title}</td>
                                    <td className="border border-gray-300 p-2">{formData[0]?.education_details[rowIndex]?.major_subjects}</td>
                                    <td className="border border-gray-300 p-2">{formData[0]?.education_details[rowIndex]?.result_declaration_date}</td>
                                    <td className="border border-gray-300 p-2">{formData[0]?.education_details[rowIndex]?.marks_obtained}</td>
                                    <td className="border border-gray-300 p-2">{formData[0]?.education_details[rowIndex]?.total_marks}</td>
                                    <td className="border border-gray-300 p-2">{formData[0]?.education_details[rowIndex]?.cgpa}</td>
                                    <td className="border border-gray-300 p-2">{formData[0]?.education_details[rowIndex]?.institution}</td>
                                    <td className="border border-gray-300 p-2">{formData[0]?.education_details[rowIndex]?.["board/university"]}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {/* Additional Input Field */}
            <InfoGrid
                title="Additional Information"
                data={formData?.[0] || {}}
                fields={[
                    { label: "List of scholarships or fellowships held at present or in past", name: "scholarships_list" },
                    { label: "Indicate any academic honors/medals or prizes received", name: "academic_honors" },
                    { label: "Offer detail for MS/PhD/DPhil Program", name: "offer_detail" },
                    { label: "Name of University", name: "university_name" },
                    { label: "Date of Commencement of classes", name: "commencement_date" },
                    { label: "Date of Completion", name: "completion_date" },
                    { label: "University Ref/ID Code", name: "university_code" },
                    { label: "Major area", name: "major_area" },
                    { label: "Specialization", name: "specialization" },
                    { label: "Title of MS/PhD/DPhil", name: "title" },
                    { label: "Supervisor Name", name: "supervisor_name" },
                    { label: "Supervisor Email", name: "supervisor_email" },
                    { label: "Supervisor Contact", name: "supervisor_contact" },
                    { label: "Closing date of admission of the institution", name: "closing_date" },
                    { label: "Research Publication (Use extra sheet where required)", name: "research_publication" },
                ]}
            />
            {/* detail_of_courses_ms_level */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Details of Courses at MS Level</h2>
                <table className="overflow-x-auto w-full border-collapse border border-gray-300 col-span-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Course Title</th>
                            <th className="border border-gray-300 p-2">Date/Semester</th>
                            <th className="border border-gray-300 p-2">Course Type (Core/Elective)</th>
                            <th className="border border-gray-300 p-2">Total Credits</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData[0]?.detail_of_courses_ms_level?.map((course, index) => (
                            <tr key={index} className='hover:bg-gray-100'>
                                <td className="border border-gray-300 p-2 ">{course?.course_name}</td>
                                <td className="border border-gray-300 p-2">{course?.["date/semester"]}</td>
                                <td className="border border-gray-300 p-2">{course?.["course_type_(core/elective)"]}</td>
                                <td className="border border-gray-300 p-2">{course?.total_credits}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Preferred Subject Areas */}
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Preferred Subject Areas</h2>

                {[
                    "Nano-Technology", "Forensic Science", "Laser & Opto-Electronics", "Anatomy", "Physiology",
                    "Computer Communication & Network", "Economics", "Water Resource Management",
                    "Petroleum Engineering", "English Literature", "Modeling & Simulation", "Mining/Mineral Engineering"
                ]
                    .filter(field => formData[0]?.subject?.includes(field)) // Only show checked subjects
                    .map((field, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <input type="checkbox" checked={true} disabled />
                            <label className="text-lg font-semibold text-black">{field}</label>
                        </div>
                    ))}
            </div>




            {/* Reasearch Projects */}
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Research Projects</h2>
                <table className="overflow-x-auto w-full border-collapse border border-gray-300 col-span-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Title of research project</th>
                            <th className="border border-gray-300 p-2">Area of Research</th>
                            <th className="border border-gray-300 p-2">Published in International/Local Journal</th>
                            <th className="border border-gray-300 p-2">Date of Publication</th>
                            <th className="border border-gray-300 p-2">Impact Factor of Journal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData[0]?.research_projects?.map((project, index) => (
                            <tr key={index} className='hover:bg-gray-100'>
                                <td className="border border-gray-300 p-2">{project?.title_of_research_project}</td>
                                <td className="border border-gray-300 p-2">{project?.area_of_research}</td>
                                <td className="border border-gray-300 p-2">{project?.["published_in_international/local_journal"]}</td>
                                <td className="border border-gray-300 p-2">{project?.date_of_publication}</td>
                                <td className="border border-gray-300 p-2">{project?.impact_factor_of_journal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Employment Details */}
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Employment Details</h2>
                <table className="overflow-x-auto w-full border-collapse border border-gray-300 col-span-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Name of Employer with Address</th>
                            <th className="border border-gray-300 p-2">Category of Employer (Federal/Prov Govt,
                                SemiGovt, Autonomous,Corporation, Private)</th>
                            <th className="border border-gray-300 p-2">Designation with Grade BPS</th>
                            <th className="border border-gray-300 p-2">Nature of Job</th>
                            <th className="border border-gray-300 p-2">Job details (Teaching, R&D, Service, Technical, other etc)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData[0]?.employment_details?.map((employment, index) => (
                            <tr key={index} className='hover:bg-gray-100'>
                                <td className="border border-gray-300 p-2">{employment?.name_of_employer_with_address_}</td>
                                <td className="border border-gray-300 p-2">{employment?.["category_of_employer(federal/prov_govt,_semigovt,_autonomous,corporation,_private)"]}</td>
                                <td className="border border-gray-300 p-2">{employment?.["designation_with_grade_bps,_group_etc._if_applicab"]}</td>
                                <td className="border border-gray-300 p-2">{employment?.["nature_of_job(regular/contractetc.)"]}</td>
                                <td className="border border-gray-300 p-2">{employment?.["job_details(teaching,_r&d,_service,_technical,_other_etc)"]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Period Served */}

            <InfoGrid
                title="Period Served"
                data={formData?.[0] || {}}
                fields={[
                    { label: "From", name: "from" },
                    { label: "To", name: "to" },
                    { label: "Last Drawn Gross Salary (Attach Pay Slip) (Rs.) Monthly", name: "salary" },
                    { label: "Father alive ?", name: "fatherAlive" },
                    ...(formData[0]?.fatherAlive ? [
                        { label: "If yes, Full Name", name: "fatherName" },
                        { label: "Telephone No", name: "fatherPhone" },
                        { label: "Mobile No", name: "fatherMobile" },
                        { label: "Email", name: "fatherEmail" },
                        { label: "Is your Father currently employed?", name: "fatherEmployed" },
                        { label: "Designation", name: "fatherDesignation" },
                        { label: "Date of Joining (dd/mm/yy)", name: "fatherJoiningDate" },
                    ] : []),
                    { label: "Spouse Full Name", name: "spouseName" },
                    { label: "Age", name: "spouseAge" },
                    { label: "Telephone No", name: "spousePhone" },
                    { label: "Mobile No", name: "spouseMobile" },
                    { label: "Email", name: "spouseEmail" },
                    { label: "Is your Spouse currently employed?", name: "spouseEmployed" },
                    ...(formData[0]?.spouseEmployed ? [
                        { label: "Organization", name: "Organization" },
                    ] : []
                    )
                ]}
            />

            {/* Total Income */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Total Income</h2>
                <table className="w-full border-collapse border border-gray-300 col-span-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Particulars</th>
                            <th className="border border-gray-300 p-2">Monthly Salary</th>
                            <th className="border border-gray-300 p-2">From other sources if any</th>
                            <th className="border border-gray-300 p-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {["Father", "Mother", "Guardian", "Self", "Spouse", "Others"]
                            .map((title, rowIndex) => (
                                <tr key={rowIndex} className='hover:bg-gray-100'>
                                    <td className="border border-gray-300 p-2 font-semibold">{title}</td>
                                    <td className="border border-gray-300 p-2">{formData[0]?.total_income[rowIndex]?.monthly_salary}</td>
                                    <td className="border border-gray-300 p-2">{formData[0]?.total_income[rowIndex]?.from_other_sources_if_any}</td>
                                    <td className="border border-gray-300 p-2">{formData[0]?.total_income[rowIndex]?.total}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {/* Annual Income */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Annual income information from the sources mentioned below:</h2>
                <table className="w-full border-collapse border border-gray-300 col-span-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Particulars</th>
                            <th className="border border-gray-300 p-2">Rupees</th>
                        </tr>
                    </thead>
                    <tbody>
                        {["Agriculture Income", "Income from Savings (Interests/Dividends)", "Pension", "Real State Holdings", "Support from relatives", "Others(please specify)", "Total Annual household income"]
                            .map((title, rowIndex) => (
                                <tr key={rowIndex} className='hover:bg-gray-100'>
                                    <td className="border border-gray-300 p-2 font-semibold">{title}</td>
                                    <td className="border border-gray-300 p-2">{formData[0]?.annual_income[rowIndex]?.rupees}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {/* Spouced Employed */}
            <label className="block text-lg font-semibold"> Do you foresee a significant increase or decrease in your family income next year?</label>
            <div className="flex items-center space-x-4">
                <input type='checkbox' checked={formData[0]?.spouseEmployed} disabled />
                <label className="text-lg font-semibold text-black">{formData[0]?.spouseEmployed ? "Yes" : "No"}</label>
            </div>
            <p className='text-lg p-2 border rounded-lg'>{formData[0]?.spouse_explanation}</p>

            {/* House Ownership */}
            <InfoGrid
                title="House Ownership"
                data={formData?.[0] || {}}
                fields={[
                    { label: "1. Is the house you live in owned by your family?", name: "houseOwned" },
                    ...(formData[0]?.houseOwned ? [
                        { label: "If Yes, please explain:", name: "explanation" },
                        { label: "Year of Purchase:", name: "purchaseYear" },
                        { label: "Original Purchase Price (Rs.):", name: "originalPrice" },
                        { label: "Present Market Value (Rs.):", name: "presentMarketValue" },
                        { label: "House Plot Size (Kanals/Marlas/Sq. Feet):", name: "plotSize" },
                        { label: "Address:", name: "address" },
                    ] : []
                    ),
                    { label: "2. Does your family own any other plot(s), house(s), shop(s), or land(s)?", name: "otherAssets" },
                ]}
            />
            {/* Land Ownership */}
            {formData[0]?.otherAssets && (
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Land Ownership</h2>
                    <table className="w-full border-collapse border border-gray-300 col-span-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-2">Name of</th>
                                <th className="border border-gray-300 p-2">Locality</th>
                                <th className="border border-gray-300 p-2">Area (Kanals/Marlas/Sq. Feet)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {["Plots", "Houses", "Buildings", "Land", "Others (Specify)"]
                                .map((title, rowIndex) => (
                                    <tr key={rowIndex} className='hover:bg-gray-100 text-center'>
                                        <td className="border border-gray-300 p-2 font-semibold">{title}</td>
                                        <td className="border border-gray-300 p-2">{formData[0]?.land_ownership[rowIndex]?.locality}</td>
                                        <td className="border border-gray-300 p-2">{formData[0]?.land_ownership[rowIndex]?.["area_(kanals/marlas/sq._feet)"]}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}
            {/* Individual Assets */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Individual Assets</h2>
                <table className="w-full border-collapse border border-gray-300 col-span-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Particulars</th>
                            <th className="border border-gray-300 p-2">Business</th>
                            <th className="border border-gray-300 p-2">Savings and Investments</th>
                            <th className="border border-gray-300 p-2">Land and Building</th>
                            <th className="border border-gray-300 p-2">Agricultural Land</th>
                            <th className="border border-gray-300 p-2">Area/location of Agricultural Land</th>
                        </tr>
                    </thead>
                    <tbody>
                        {["Plots", "Houses", "Buildings", "Land", "Others (Specify)"]
                            .map((title, rowIndex) => (
                                <tr key={rowIndex} className='hover:bg-gray-100'>
                                    <td className="border border-gray-300 p-2 font-semibold">{title}</td>
                                    <td className="border border-gray-300 p-2">{formData[0]?.individual_assets[rowIndex]?.business}</td>
                                    <td className="border border-gray-300 p-2">{formData[0]?.individual_assets[rowIndex]?.savings_and_investments}</td>
                                    <td className="border border-gray-300 p-2">{formData[0]?.individual_assets[rowIndex]?.land_and_building}</td>
                                    <td className="border border-gray-300 p-2">{formData[0]?.individual_assets[rowIndex]?.agricultural_land}</td>
                                    <td className="border border-gray-300 p-2">{formData[0]?.individual_assets[rowIndex]?.["area/location_of_agricultural_land"]}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                {/* Automobile details */}
                {formData[0]?.automobiles && (
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Automobile Details</h2>
                        <table className="w-full border-collapse border border-gray-300 col-span-full">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 p-2">Make</th>
                                    <th className="border border-gray-300 p-2">Manufactured Year</th>
                                    <th className="border border-gray-300 p-2">Engine CC</th>
                                    <th className="border border-gray-300 p-2">Value in Rs</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData[0]?.automobiles_details.map((car, index) => (
                                    <tr key={index} className='hover:bg-gray-100'>
                                        <td className="border border-gray-300 p-2">{car.make}</td>
                                        <td className="border border-gray-300 p-2">{car.manufactured_year}</td>
                                        <td className="border border-gray-300 p-2">{car.engine_cc}</td>
                                        <td className="border border-gray-300 p-2">{car.value_in_rs}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {/* Average Family Expenses */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Average Family Expenses</h2>
                <table className="w-full border-collapse border border-gray-300 col-span-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Particulars</th>
                            <th className="border border-gray-300 p-2">Rupees</th>
                        </tr>
                    </thead>
                    <tbody>
                        {["Educational Expenses", "Food", "Medical Expenses", "Rent or Mortgage(if applicable)", "Fuel And Vehicle Maintenance", "Loan Payments", "Clothing", "Electricity Bill", "Mobile phone bill", "Entertainment", "Servants Salaries", "Taxes", "Telephone Bill", "Vactions", "Others", "Total annual expenses"]
                            .map((title, rowIndex) => (
                                <tr key={rowIndex} className='hover:bg-gray-100'>
                                    <td className="border border-gray-300 p-2 font-semibold">{title}</td>
                                    <td className="border border-gray-300 p-2">{formData[0]?.average_family_expenses[rowIndex]?.rupees}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>

            </div>
            {/* if Income is negative */}
            <div className='mt-8' >
                <label className="block text-lg font-semibold">If your income is negative, please explain:</label>
                <p className='text-lg p-2 border rounded-lg'>{formData[0]?.disposable_income}</p>
            </div>
            {/* Loans */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <label className="block text-lg font-semibold">Are there any outstanding loans?</label>
                <div className="flex items-center space-x-4">
                    <input type='checkbox' checked={formData[0]?.outstanding_loans} disabled />
                    <label className="text-lg font-semibold text-black">{formData[0]?.outstanding_loans ? "Yes" : "No"}</label>
                </div>
                {/* outstanding loans table */}
                {formData[0]?.outstanding_loans && (
                    <table className="w-full border-collapse border border-gray-300 col-span-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-2">Particulars</th>
                                <th className="border border-gray-300 p-2">Amount (Rs.)</th>
                                <th className="border border-gray-300 p-2">Repayment due on (mm/yy)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {["Bank (specify name)", "Relative (specify relationship)", "Credit Card", "Employer", "Other (please specify)"]
                                .map((title, rowIndex) => (
                                    <tr key={rowIndex} className='hover:bg-gray-100'>
                                        <td className="border border-gray-300 p-2 font-semibold">{title}</td>
                                        <td className="border border-gray-300 p-2">{formData[0]?.outstanding_loans_details[rowIndex]?.amount}</td>
                                        <td className="border border-gray-300 p-2">{formData[0]?.outstanding_loans_details[rowIndex]?.["repayment_due_on_(mm/yy)"]}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                )}

            </div>
            {/* Detail of Fee/Living Expenses on the Degree Programme: */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Detail of Fee/Living Expenses on the Degree Programme:</h2>
                <table className="w-full border-collapse border border-gray-300 col-span-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Requirement</th>
                            <th className="border border-gray-300 p-2">Per Semester(RS)</th>
                            <th className="border border-gray-300 p-2">Per Year (RS)</th>
                            <th className="border border-gray-300 p-2">Total expenses for the degree course(Approximately)(RS)</th>
                            <th className="border border-gray-300 p-2">Duration of Study</th>
                        </tr>
                    </thead>
                    <tbody>
                        {["Tution Fees", "Boarding", "Lodging", "Transport", "Books", "Misc", "Total (a)"]
                            .map((title, rowIndex) => (
                                <tr key={rowIndex} className='hover:bg-gray-100'>
                                    <td className="border border-gray-300 p-2 font-semibold">{title}</td>
                                    <td className="border border-gray-300 p-2">{formData[0]?.degree_expenses[rowIndex]?.["per_semester(rs)"]}</td>
                                    <td className="border border-gray-300 p-2">{formData[0]?.degree_expenses[rowIndex]?.["per_year_(rs)"]}</td>
                                    <td className="border border-gray-300 p-2">{formData[0]?.degree_expenses[rowIndex]?.["total_expenses_for_the_degree_course(approximately)(rs)"]}</td>
                                    <td className="border border-gray-300 p-2">{formData[0]?.degree_expenses[rowIndex]?.["duration_of_study"]}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {/* Financial Aid Agencies Section */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <table className="w-full border-collapse border border-gray-300 col-span-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Agency/Foundations/Government</th>
                            <th className="border border-gray-300 p-2">Application Date</th>
                            <th className="border border-gray-300 p-2">Award Notification Date</th>
                            <th className="border border-gray-300 p-2">Expected Amount (Rs.)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData[0]?.financial_aid_agencies?.map((agency, index) => (
                            <tr key={index} className='hover:bg-gray-100'>
                                <td className="border border-gray-300 p-2">{agency?.["agency/foundations/government"]}</td>
                                <td className="border border-gray-300 p-2">{agency?.application_date}</td>
                                <td className="border border-gray-300 p-2">{agency?.award_notification_date}</td>
                                <td className="border border-gray-300 p-2">{agency?.["expected_amount_(rs.)"]}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {/* Statement of purpose */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Statement of Purpose</h2>
                {[
                    { label: "How will the proposed degree be of benefit to Pakistan/Khyber Pakhtunkhwa?", name: "benefit_to_pakistan" },
                    { label: "What skills and knowledge do you hope to gain from your studies? How do you propose to use them (if possible, list specific actions) in Pakistan/Khyber Pakhtunkhwa?", name: "skills_and_knowledge" },
                    { label: "Is there anything else you would like to add in support of your application for this scholarship?", name: "supporting_statement" },
                    { label: "How do you relate the proposed studies to your previous study/achievements and your present job/occupation?", name: "proposed_studies" },
                    { label: "Where would you like to join in Pakistan after completion of your MS/MPhil/PhD studies? [only for those applicants who are not already employed in Pakistan]", name: "join_after_completion" }
                ].map((field, index) => (
                    <div key={index} className="mb-4">
                        <label className="block text-lg font-semibold">{field.label}</label>
                        <p className="p-4 border rounded-lg">{formData[0]?.[field.name]}</p>
                    </div>
                ))}

            </div>
            {/* Files  */}
            <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Attested Photo</h2>
                <img src={formData[0]?.attested_photo} alt="attested_photo" className="w-66 h-66" />
            </div>
            <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 ' >

                {/* attach_copy */}
                <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Attached Copy File</h2>
                    <a href={formData[0]?.attach_copy} target="_blank" rel="noreferrer" className="text-blue-500 underline">View and download Attached Copy</a>
                </div>
                {/* NOC file */}
                <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">NOC File</h2>
                    <a href={formData[0]?.noc_file} target="_blank" rel="noreferrer" className="text-blue-500 underline">View and download NOC File </a>
                </div>
                {/* Undertaking file */}
                <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Undertaking  File</h2>
                    <a href={formData[0]?.undertaking_file} target="_blank" rel="noreferrer" className="text-blue-500 underline">View and download Undertaking File </a>
                </div>
            </div>

        </div >
    );
};

export default AdminPhdInternational;