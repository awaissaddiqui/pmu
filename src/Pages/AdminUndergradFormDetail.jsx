import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const AdminUndergradFormDetail = () => {
    const [formData, setFormData] = useState([]);
    const { email } = useParams();

    // Fetch Data from localStorage
    useEffect(() => {
        const fetchData = () => {
            try {
                const storedData = JSON.parse(localStorage.getItem("formDataUndergrad")) || [];
                console.log(storedData);
                setFormData(storedData.data);
            } catch (error) {
                console.error("Error fetching form details:", error);
            }
        };

        fetchData();
    }, [email]);

    if (Object.keys(formData).length === 0) {
        return <p className="text-center text-gray-500">No details found for this email.</p>;
    }
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-6">Undergraduate Form Details</h2>
            {/* Personal Details name, uniseristy etc */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white p-6 shadow-md rounded-lg">
                {[
                    { name: "universityName", label: "University Name" },
                    { name: "degreeTitle", label: "Degree Title" },
                    { name: "applicantName", label: "Applicant's Name" },
                    { name: "gender", label: "Gender" },
                    { name: "maritalStatus", label: "Marital Status" },
                    { name: "workingStatus", label: "Working Status" },
                    { name: "cnic", label: "CNIC No." },
                    { name: "age", label: "Age" },
                    { name: "domicile", label: "Domicile" },
                    { name: "presentAddress", label: "Present Address" },
                    { name: "permanentAddress", label: "Permanent Address" },
                    { name: "employer", label: "Employer / Company" },
                    { name: "designation", label: "Designation" },
                    { name: "mobile", label: "Mobile" },
                    { name: "email", label: "Email" },
                    { name: "grossIncome", label: "Total Monthly Gross Income (Pak Rs.)" },
                    { name: "takeHomeIncome", label: "Take Home Income (Pak Rs.)" },
                    { name: "telephone", label: "Telephone (Res.)" }
                ].map((field) => {
                    const newArray = formData.map((data) => data[field.name]);
                    const value = newArray[0];
                    return (

                        <table key={field.name} className="w-full  border-collapse border border-gray-300">
                            <tbody>
                                <tr className="border-b">
                                    <td className="font-semibold">{field.label}</td>
                                    <td className="text-black ">{value}</td>
                                </tr>
                            </tbody>
                        </table>
                    );
                })}
            </div>
            {/* Details of Family Members */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white p-6 shadow-md rounded-lg mt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Details of Family Members</h2>
                <table className="w-full border-collapse border border-gray-300 col-span-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Relation</th>
                            <th className="border border-gray-300 p-2">Marital Status</th>
                            <th className="border border-gray-300 p-2">Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData?.[0]?.FamilyMembersDetails?.length > 0 ? (
                            formData[0].FamilyMembersDetails.map((member, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 p-2">{member.name_of_family_member || "N/A"}</td>
                                    <td className="border border-gray-300 p-2">{member.relationship || "N/A"}</td>
                                    <td className="border border-gray-300 p-2">{member.marital_status || "N/A"}</td>
                                    <td className="border border-gray-300 p-2">{member.remarks || "N/A"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center p-4 text-gray-500">
                                    No family member details available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Details of Family members Earning */}
            <div className="flex flex-col bg-white p-6 shadow-md rounded-lg mt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">
                    Family Member Living with You
                </h2>
                <input type="text"
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    readOnly value={formData[0].familyMemberLivingWithYou} />

            </div>

            {/* Family Members Occupation and Earnings Table */}

            <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">
                Family Members Occupation and Earnings
            </h2>
            <table className="w-full overflow-hidden border-collapse border border-gray-300 col-span-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Relation</th>
                        <th className="border border-gray-300 p-2">Occupation</th>
                        <th className="border border-gray-300 p-2">Organization Name</th>
                        <th className="border border-gray-300 p-2">Designation</th>
                        <th className="border border-gray-300 p-2">Monthly Gross Pay</th>
                        <th className="border border-gray-300 p-2">Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    {formData?.[0]?.FamilyMembersOccupationEarnings?.length > 0 ? (
                        formData[0].FamilyMembersOccupationEarnings.map((member, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border border-gray-300 p-2">{member.name_of_family_member || "N/A"}</td>
                                <td className="border border-gray-300 p-2">{member.relationship || "N/A"}</td>
                                <td className="border border-gray-300 p-2">{member.occupation || "N/A"}</td>
                                <td className="border border-gray-300 p-2">{member.organization_name || "N/A"}</td>
                                <td className="border border-gray-300 p-2">{member.designation || "N/A"}</td>
                                <td className="border border-gray-300 p-2">{member.monthly_gross_pay || "N/A"}</td>
                                <td className="border border-gray-300 p-2">{member.remarks || "N/A"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center p-4 text-gray-500">
                                No occupation and earnings details available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Total Monthly Income  */}
            <div className="flex flex-col bg-white p-6 shadow-md rounded-lg mt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Total Monthly Income (including self-income, if applicable) in PKR</h2>
                <input type="text"
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    readOnly value={formData[0].totalMonthlyIncome} />
                {/* family Members studying  */}
                <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Brothers/Sisters/Children/Family Members Studying</h2>
                <input type="text"
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    readOnly value={formData[0].familyMembersStudying} />
            </div>
            {/* Family Members Studying Details Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white p-6 shadow-md rounded-lg mt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">
                    Educational Details of Family Members
                </h2>
                <table className="w-full border-collapse border border-gray-300 col-span-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Relation</th>

                            <th className="border border-gray-300 p-2">Institution Name</th>
                            <th className="border border-gray-300 p-2">Fee Per Month</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData?.[0]?.FamilyMembersEducationDetails?.length > 0 ? (
                            formData[0].FamilyMembersEducationDetails.map((member, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 p-2">{member.name_of_family_member || "N/A"}</td>
                                    <td className="border border-gray-300 p-2">{member.relationship || "N/A"}</td>
                                    <td className="border border-gray-300 p-2">{member.school_college_university || member.institution_name || "N/A"}</td>
                                    <td className="border border-gray-300 p-2">{member.fee_per_month || "N/A"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center p-4 text-gray-500">
                                    No family member studying details available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Input fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white p-6 shadow-md rounded-lg">
                {[
                    { name: "totalFees", label: "Total Fees and Tuition Charges", type: "number" },
                    { name: "fatherName", label: "Father's Name", type: "text" },
                    { name: "computerizedNIC", label: "Computerized N.I.C No", type: "number" },
                    { name: "status", label: "Status", type: "radio", options: ["Alive", "Decease"] },
                    { name: "professionalStatus", label: "Professional Status", type: "radio", options: ["Employed", "Retired", "Business Owner"] },
                    { name: "companyName", label: "Name of Company/Employer", type: "text" },
                    { name: "telOff", label: "Tel (Off)", type: "number" },
                    { name: "mobile", label: "Mobile", type: "number" },
                    { name: "occupationType", label: "Occupation Type", type: "text" },
                    { name: "ntn", label: "NTN", type: "number" },
                    { name: "designationGrade", label: "Designation & Grade (BPS/SPS/PTC etc)", type: "text" },
                    { name: "grossMonthlyIncome", label: "Gross Monthly Income", type: "number" },
                    { name: "totalNetMonthlyIncome", label: "Total Net Monthly Take Home Income", type: "number" },
                    { name: "supportingPerson", label: "Any Other Supporting Person (Mother/Guardian/Brother/Sister/Relative)", type: "text" },
                    { name: "supportingPersonName", label: "Name", type: "text" },
                    { name: "relationship", label: "Relationship", type: "text" },
                    { name: "occupationDesignation", label: "Occupation and Designation", type: "text" },
                    { name: "financialSupport", label: "Monthly Financial Support Available (PKR)", type: "number" }

                ].map((field) => {
                    const newArray = formData.map((data) => data[field.name]);
                    const value = newArray[0];
                    return (

                        <table key={field.name} className="w-full  border-collapse border border-gray-300">
                            <tbody>
                                <tr className="border-b">
                                    <td className="font-semibold">{field.label}</td>
                                    <td className="text-black ">{value}</td>
                                </tr>
                            </tbody>
                        </table>
                    );
                })}
            </div>
            {/* Asset Income Table */}
            <div className="flex flex-col bg-white p-6 shadow-md rounded-lg mt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Asset Income (on Monthly Basis)</h2>

                <table className="w-full border-collapse border border-gray-300 col-span-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Income Source</th>
                            <th className="border border-gray-300 p-2">Father</th>
                            <th className="border border-gray-300 p-2">Mother</th>
                            <th className="border border-gray-300 p-2">Spouse</th>
                            <th className="border border-gray-300 p-2">Self</th>
                            <th className="border border-gray-300 p-2">Other</th>
                            <th className="border border-gray-300 p-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            "Property Rent",
                            "Land Lease",
                            "Bank Deposits*",
                            "Shares/Securities*",
                            "Others (specify)",
                            "Total",
                        ].map((incomeSource, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border border-gray-300 p-2">{incomeSource}</td>
                                <td className="border border-gray-300 p-2">{formData?.[0]?.AssetIncome?.[index]?.father || ""}</td>
                                <td className="border border-gray-300 p-2">{formData?.[0]?.AssetIncome?.[index]?.mother || ""}</td>
                                <td className="border border-gray-300 p-2">{formData?.[0]?.AssetIncome?.[index]?.spouse || ""}</td>
                                <td className="border border-gray-300 p-2">{formData?.[0]?.AssetIncome?.[index]?.self || ""}</td>
                                <td className="border border-gray-300 p-2">{formData?.[0]?.AssetIncome?.[index]?.other || ""}</td>
                                <td className="border border-gray-300 p-2 font-bold">{formData?.[0]?.AssetIncome?.[index]?.total || ""}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Family Expenditure */}
            <h2 className="text-xl font-bold mb-3">Family Expenditure</h2>
            <h3 className="text-lg font-semibold mb-2">Accommodation Expenditure</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white p-6 shadow-md rounded-lg">
                {[
                    {
                        name: "type",
                        label: "Type",
                        type: "radio",
                        options: ["Bungalow", "Apartment/Flat", "Town House", "Village House"],
                    },
                    {
                        name: "status",
                        label: "Status",
                        type: "radio",
                        options: ["Rented", "Self or Family Owned", "Employer/Govt Owned"],
                    },
                    {
                        name: "rentAmount",
                        label: "Rent Payment",
                        type: "radio",
                        options: ["Self", "Employer/Govt", "Others"],
                    },
                    {
                        name: "housePlotSize",
                        label: "House Plot Size (Sq. ft.)",
                        type: "text",
                    },
                    {
                        name: "coveredArea",
                        label: "Covered Area (Sq. ft.)",
                        type: "text",
                    }
                ].map((field) => {
                    const newArray = formData.map((data) => data[field.name]);
                    const value = newArray[0];
                    return (

                        <table key={field.name} className="w-full  border-collapse border border-gray-300">
                            <tbody>
                                <tr className="border-b">
                                    <td className="font-semibold">{field.label}</td>
                                    <td className="text-black ">{value}</td>
                                </tr>
                            </tbody>
                        </table>
                    );
                })}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white p-6 shadow-md rounded-lg mt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Family Expenditure</h2>

                <table className="w-full border-collapse border border-gray-300 col-span-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">#</th>
                            <th className="border border-gray-300 p-2">Location/Address</th>
                            <th className="border border-gray-300 p-2">Bedrooms</th>
                            <th className="border border-gray-300 p-2">Air Conditioners</th>
                            <th className="border border-gray-300 p-2">Monthly Rent</th>
                            <th className="border border-gray-300 p-2">Annual Rent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData?.[0]?.FamilyExpenditure?.length > 0 ? (
                            formData[0].FamilyExpenditure.map((expense, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 p-2">{index + 1}</td>
                                    <td className="border border-gray-300 p-2">{expense["location/address"] || "N/A"}</td>
                                    <td className="border border-gray-300 p-2">{expense.bedrooms || "N/A"}</td>
                                    <td className="border border-gray-300 p-2">{expense.air_conditioners || "N/A"}</td>
                                    <td className="border border-gray-300 p-2">{expense.monthly_rent || "N/A"}</td>
                                    <td className="border border-gray-300 p-2">{expense.annual_rent || "N/A"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center p-4 text-gray-500">
                                    No expenditure details available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Page 2 details */}

            {/* Utilities Expenditures */}
            <h2 className="mt-8 text-xl font-bold mb-4">Utilities Expenditure</h2>
            <div className="mb-6 overflow-x-auto">
                <table className="w-full border border-gray-300 mb-6">
                    <thead>
                        <tr className="bg-secondary text-white ">
                            <th className="p-2 border">Utility Type</th>
                            <th className="p-2 border">Last Month Utilities Paid (PKR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { id: "Electricity Bill" },
                            { id: "Internet Bill" },
                            { id: "Gas Bill" },
                            { id: "Water Bill" },
                            { id: "Telephone Bill" },
                        ].map((item, index) => (
                            <tr key={index} className="text-center border">
                                <td className="p-2 border">{item.id}</td>
                                <td className="p-2 border">{formData[0]?.utilityExpenditure?.[item.id] || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/* Income and Expenditure Table */}
            <h2 className="mt-8 text-xl font-bold mb-4">Income & Expenditure</h2>


            <div className="mb-6 overflow-x-auto">
                <table className="w-full border border-gray-300 mb-6">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="p-2 border">S#</th>
                            <th className="p-2 border">Description</th>
                            <th className="p-2 border">Amount (PKR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { id: "sec.29A", desc: "Total Monthly Income" },
                            { id: "sec.33A", desc: "Total Monthly Expenditure" },
                            { id: "29.A-33A", desc: "Net Monthly Disposable Income" },
                            { id: "sec.29B", desc: "Total Annual Income" },
                            { id: "sec.33B", desc: "Total Annual Expenditure" },
                            { id: "29.B-33.B", desc: "Net Annual Disposable Income*" },
                        ].map((item, index) => (
                            <tr key={index} className="text-center border">
                                <td className="p-2 border">{item.id}</td>
                                <td className="p-2 border">{item.desc}</td>
                                <td className="p-2 border">{formData[0]?.income_expenditure?.[item.id] || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/*  If the monthly/annual disposable income is negative, kindly explain: */}
            <div className="flex flex-col bg-white p-6 shadow-md rounded-lg mt-6">
                <h2 className="text-xl ">  If the monthly/annual disposable income is negative, kindly explain:</h2>
                <input className="w-full border border-gray-300 p-2 rounded-lg" type="text" value={formData[0]?.disposable_income_explanation} readOnly />
                <h2 className="text-xl "> Assets (Current Market Value)</h2>
                <label className="block font-medium mb-2">
                    Does the family own any transport?
                </label>
                <div className="flex space-x-4 mb-4">
                    <label>
                        <input
                            type="radio"
                            name="familyTransport"
                            checked={formData[0]?.familyTransport === "yes"}
                            readOnly
                            className="mr-1"
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="familyTransport"
                            checked={formData[0]?.familyTransport === "no"}
                            readOnly
                            className="mr-1"
                        />
                        No
                    </label>
                </div>
            </div>
            {/* Transport Details Table */}
            {formData[0]?.familyTransport === "yes" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white p-6 shadow-md rounded-lg mt-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Transport Details</h2>

                    <table className="w-full border-collapse border border-gray-300 col-span-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-2">#</th>
                                <th className="border border-gray-300 p-2">Transport Type</th>
                                <th className="border border-gray-300 p-2">Make/Model</th>
                                <th className="border border-gray-300 p-2">Engine Capacity (CC)</th>
                                <th className="border border-gray-300 p-2">Registration No</th>
                                <th className="border border-gray-300 p-2">Ownership Period</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData[0]?.transport?.length > 0 ? (
                                formData[0].transport.map((trans, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 p-2">{index + 1}</td>
                                        <td className="border border-gray-300 p-2">{trans.transport_type || "N/A"}</td>
                                        <td className="border border-gray-300 p-2">{trans["make/model"] || "N/A"}</td>
                                        <td className="border border-gray-300 p-2">{trans["engine_capacity_(cc)"] || "N/A"}</td>
                                        <td className="border border-gray-300 p-2">{trans.registration_no || "N/A"}</td>
                                        <td className="border border-gray-300 p-2">{trans.ownership_period || "N/A"}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center p-4 text-gray-500">
                                        No transport details available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* others */}
            <h4 className="mt-4 text-gray-600">
                Others: include tractor, rickshaw, bi-cycle, motorcycle rickshaw, carriage pick, truck etc.
            </h4>
            <div className="flex flex-col">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Number of Cattle(s) (with kind)</h2>
                <input type="text" value={formData[0].cattleName} className="w-full border border-gray-300 p-2 rounded-lg" readOnly />
                <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Area and location of Land(s)/Plot(s) owned</h2>
                <input type="text" value={formData[0].landLocation} className="w-full border border-gray-300 p-2 rounded-lg" readOnly />
            </div>

            {/* Assets Information */}
            <div className="flex flex-col bg-white p-6 shadow-md rounded-lg mt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Assets Information</h2>

                <table className="w-full border-collapse border border-gray-300 col-span-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Assets Title</th>
                            <th className="border border-gray-300 p-2">Qty</th>
                            <th className="border border-gray-300 p-2">Size</th>
                            <th className="border border-gray-300 p-2">Location (Address)</th>
                            <th className="border border-gray-300 p-2">Cultivative Area</th>
                            <th className="border border-gray-300 p-2">Agricultural Yield per Area</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            ["Residential", "Commercial", "Agricultural", "Employer/Govt Scheme"]
                                .map((assetsInfo, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 p-2">{assetsInfo}</td>
                                        <td className="border border-gray-300 p-2">{formData?.[0]?.AssetsInformation?.[index]?.qty || ""}</td>
                                        <td className="border border-gray-300 p-2">{formData?.[0]?.AssetsInformation?.[index]?.size || ""}</td>
                                        <td className="border border-gray-300 p-2">{formData?.[0]?.AssetsInformation?.[index]?.["location_(address)"] || ""}</td>
                                        <td className="border border-gray-300 p-2">{formData?.[0]?.AssetsInformation?.[index]?.cultivative_area || ""}</td>
                                        <td className="border border-gray-300 p-2">{formData?.[0]?.AssetsInformation?.[index]?.agricultural_yield_per_area || ""}</td>

                                    </tr>
                                ))}
                    </tbody>
                </table>
            </div>
            {/* Assets Worth (Current Market Value in PKR) */}
            <div className="flex flex-col bg-white p-6 shadow-md rounded-lg mt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Asset Income (on Monthly Basis)</h2>

                <table className="w-full border-collapse border border-gray-300 col-span-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Asset Title</th>
                            <th className="border border-gray-300 p-2">Father</th>
                            <th className="border border-gray-300 p-2">Mother</th>
                            <th className="border border-gray-300 p-2">Spouse</th>
                            <th className="border border-gray-300 p-2">Self</th>
                            <th className="border border-gray-300 p-2">Guardian</th>
                            <th className="border border-gray-300 p-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            "House",
                            "Business",
                            "Land & Building",
                            "Bank Balance",
                            "Stocks/Prize Bond",
                            "Other/Cattle",
                            "Total",

                        ].map((assetWorths, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border border-gray-300 p-2">{assetWorths}</td>
                                <td className="border border-gray-300 p-2">{formData?.[0]?.assetsWorth?.[index]?.father || ""}</td>
                                <td className="border border-gray-300 p-2">{formData?.[0]?.assetsWorth?.[index]?.mother || ""}</td>
                                <td className="border border-gray-300 p-2">{formData?.[0]?.assetsWorth?.[index]?.spouse || ""}</td>
                                <td className="border border-gray-300 p-2">{formData?.[0]?.assetsWorth?.[index]?.self || ""}</td>
                                <td className="border border-gray-300 p-2">{formData?.[0]?.assetsWorth?.[index]?.guardian || ""}</td>
                                <td className="border border-gray-300 p-2 font-bold">{formData?.[0]?.assetsWorth?.[index]?.total || ""}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Loan Taken for Applicant Education */}
            <h2 className="text-xl mt-4 font-semibold">Loan Taken for Applicant Education</h2>
            <div className="space-y-4">
                {[
                    { name: "familyLoan", label: "Family/Friend Loan (Specify details of loan taken and relationship with the relative/friend)" },
                    { name: "sourceFinancing", label: "Any source of financing other than loan (Please specify)" },
                    { name: "admissionCharges", label: "How were the admission /first semester charges paid?" },
                ].map((field, index) => (
                    <div key={index} className="flex flex-col">
                        <label className="font-medium">{field.label}</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            value={formData[0]?.[field.name] || ""}
                            readOnly
                        />
                    </div>
                ))}
            </div>
            {/* Applicants educational record: */}
            <div className="flex flex-col bg-white p-6 shadow-md rounded-lg mt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 col-span-full">Applicants educational record</h2>

                <table className="w-full border-collapse border border-gray-300 col-span-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Level of Study</th>
                            <th className="border border-gray-300 p-2">Name & location of Institution</th>
                            <th className="border border-gray-300 p-2">Per Month Fee</th>
                            <th className="border border-gray-300 p-2">To-From month/yr.</th>
                            <th className="border border-gray-300 p-2">Division/GPA</th>
                            <th className="border border-gray-300 p-2">%age/CGPA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {["Bachelors", "Intermediate", "Bachelors"].map((eduRecord, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border border-gray-300 p-2">{eduRecord}</td>
                                <td className="border border-gray-300 p-2">{formData?.[0]?.educationRecord?.[index]?.["name_&_location_of_institution"] || ""}</td>
                                <td className="border border-gray-300 p-2">{formData?.[0]?.educationRecord?.[index]?.per_month_fee || ""}</td>
                                <td className="border border-gray-300 p-2">{formData?.[0]?.educationRecord?.[index]?.["to-from_month/yr."] || ""}</td>
                                <td className="border border-gray-300 p-2">{formData?.[0]?.educationRecord?.[index]?.["division/gpa"] || ""}</td>
                                <td className="border border-gray-300 p-2">{formData?.[0]?.educationRecord?.[index]?.["%age/cgpa"] || ""}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Display the remaineing details */}
            {/* Per Month Fee / Tuition Charges */}
            <div className="flex flex-col bg-white p-6 shadow-md rounded-lg mt-6">
                <h2 className="text-xl font-semibold text-gray-700">Per Month Fee / Tuition Charges</h2>
                <p className="border border-gray-300 p-2 rounded-lg mt-2 bg-gray-100">
                    {formData[0]?.lastInstitutionFee || "N/A"}
                </p>
            </div>

            {/* Previous Scholarships */}
            <div className="flex flex-col bg-white p-6 shadow-md rounded-lg mt-6">
                <h2 className="text-xl font-semibold text-gray-700">Have you ever received any other Scholarships?</h2>
                <p className="border border-gray-300 p-2 rounded-lg mt-2 bg-gray-100">
                    {formData[0]?.scholarship === "yes" ? "Yes" : "No"}
                </p>
            </div>

            {/* If Scholarship was received, display details */}
            {formData[0]?.scholarship === "yes" && (
                <div className="flex flex-col bg-white p-6 shadow-md rounded-lg mt-6">
                    <h2 className="text-xl font-semibold text-gray-700">Scholarship Details</h2>
                    {formData[0]?.scholarshipsDetails?.length > 0 ? (
                        <table className="w-full border-collapse border border-gray-300 mt-2">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 p-2">Name of institute</th>
                                    <th className="border border-gray-300 p-2">Scholarship Name</th>
                                    <th className="border border-gray-300 p-2">Total Scholarship Amount</th>
                                    <th className="border border-gray-300 p-2">Scholarship Period</th>
                                    <th className="border border-gray-300 p-2">Class/level at which Scholarship was granted</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData[0].scholarshipsDetails.map((scholarship, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 p-2">{scholarship.name_of_institute || "N/A"}</td>
                                        <td className="border border-gray-300 p-2">{scholarship.scholarship_name || "N/A"}</td>
                                        <td className="border border-gray-300 p-2">{scholarship.total_scholarship_amount || "N/A"}</td>
                                        <td className="border border-gray-300 p-2">{scholarship.total_scholarship_period || "N/A"}</td>
                                        <td className="border border-gray-300 p-2">{scholarship["class/level_at_which_scholarship_was_granted"] || "N/A"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500 mt-2">No scholarship details available.</p>
                    )}
                </div>
            )}

            {/* Statement of Purpose */}
            <div className="flex flex-col bg-white p-6 shadow-md rounded-lg mt-6">
                <h2 className="text-xl font-semibold text-gray-700">Statement of Purpose</h2>
                <p className="border border-gray-300 p-2 rounded-lg mt-2 bg-gray-100">
                    {formData[0]?.scholarshipStatementOP || "N/A"}
                </p>
            </div>

            {/* Undertaking Section */}
            <div className="flex flex-col bg-white p-6 shadow-md rounded-lg mt-6">

                <h3 className="mt-4 font-medium">Uploaded Signed Undertaking:</h3>
                {formData[0]?.signed_declaration_fileUnNat ? (
                    <a href={formData[0].signed_declaration_fileUnNat} className="text-blue-800 underline" target="_blank">
                        View Uploaded Undertaking
                    </a>
                ) : (
                    <p className="text-gray-500">No file uploaded.</p>
                )}
            </div>

        </div>
    );
};

export default AdminUndergradFormDetail;



