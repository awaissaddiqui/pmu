import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { useUndergraduateForm } from "../../../Context/UndergraduateFormContext";
import DynamicTable from "../../DynamicTable";
import FormInput from "../../FormInput";
import Alert from "../../Alert";
import { universityNames, domiciles } from "../../../utils/data";
const UnNationalProgram = () => {
    const { formData = {}, dispatch, saveStatus, isLoading, saveForm, userId, getFormProgress } = useUndergraduateForm();
    const [showAlert, setShowAlert] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const selectedUniversity = universityNames.find((u) => u.name === formData?.universityName);
    const initialLoadDone = useRef(false);

    useEffect(() => {
        if (!isLoading && Object.keys(formData).length > 0 && !initialLoadDone.current) {
            console.log("Form data after loading complete: ", formData);
            initialLoadDone.current = true;
            setDataLoaded(true);
            setTimeout(() => setDataLoaded(false), 3000);
        }
    }, [isLoading]);

    useEffect(() => {
        if (userId) {
            const formKey = `undergraduate_${userId}`;
            const updatedData = getFormProgress(formKey); // ❌ This is a Promise!
            if (updatedData && Object.keys(updatedData).length > 0) {
                dispatch({ type: "SET_FORM_DATA", data: updatedData });
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        }
    }, [userId, getFormProgress]);

    const handleChange = (event) => {
        const { name, value, type } = event.target;

        dispatch({
            type: "UPDATE_FIELD",
            field: name,
            value: type === 'file' ? event.target.files[0] : value
        });
    };

    return (
        <div className="relative flex justify-center items-center min-h-screen bg-gray-100 p-4">
            {showAlert && (
                <Alert
                    string="Before filling the form, you must have admission in your desired program."
                    onOkay={() => setShowAlert(false)} // 🛑 Close alert on Okay
                />
            )}

            {/* Show notification when saved data is loaded */}
            {dataLoaded && (
                <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md z-50">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <p>Your previous form data has been loaded!</p>
                    </div>
                </div>
            )}
            {/* Add save status notification */}
            {saveStatus === "saving" && (
                <div className="fixed top-4 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded shadow-md z-50">
                    <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p>Saving your progress...</p>
                    </div>
                </div>
            )}

            {saveStatus === "saved" && (
                <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md z-50">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <p>Your progress has been saved!</p>
                    </div>
                </div>
            )}

            {saveStatus === "error" && (
                <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-md z-50">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                        </svg>
                        <p>Error saving your progress. Please try again.</p>
                    </div>
                </div>
            )}

            <form className="w-full max-w-8xl bg-white shadow-lg rounded-lg p-6 space-y-4">
                <h2 className="text-3xl font-semibold text-center">Self-Assessment Form</h2>

                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* University Dropdown */}
                    <label className="w-full">
                        <select
                            name="universityName"
                            value={formData.universityName || ""}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="" disabled>Select University</option>
                            {universityNames.map((university, index) => (
                                <option key={index} value={university.name}>
                                    {university.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="w-full">
                        <select
                            name="degreeTitle"
                            value={formData.degreeTitle || ""}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            disabled={!selectedUniversity}
                        >
                            <option value="" disabled>
                                Select Degree Title / Program
                            </option>
                            {selectedUniversity &&
                                selectedUniversity.dicipline.map((discipline, idx) => (
                                    <option key={idx} value={discipline}>
                                        {discipline}
                                    </option>
                                ))}
                        </select>
                    </label>
                    {/* Domicile Dropdown */}
                    <label className="w-full">
                        <select
                            name="domicile"
                            value={formData.domicile || ""}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="" disabled>Select Domicile</option>
                            {domiciles.map((dom, idx) => (
                                <option key={idx} value={dom}>
                                    {dom}
                                </option>
                            ))}
                        </select>
                    </label>
                    {[
                        // { name: "degreeTitle", label: "Degree Title / Program", type: "text" },
                        { name: "applicantName", label: "Applicant's Name", type: "text" },
                        { name: "cnic", label: "CNIC No.", type: "number" },
                        { name: "age", label: "Age", type: "number" },
                        { name: "gender", label: "Gender", type: "select", options: ["Male", "Female"] },
                        { name: "maritalStatus", label: "Marital Status", type: "select", options: ["Single", "Married", "Divorced"] },
                        { name: "workingStatus", label: "Are you currently working?", type: "select", options: ["Yes", "No"] },
                        // { name: "domicile", label: "Domicile", type: "text" },
                        { name: "presentAddress", label: "Present Address", type: "text" },
                        { name: "permanentAddress", label: "Permanent Address", type: "text" },
                        { name: "employer", label: "Name of Employer / Company", type: "text" },
                        { name: "designation", label: "Designation", type: "text" },
                        { name: "mobile", label: "Mobile", type: "number" },
                        { name: "email", label: "Email", type: "email" },
                        ...(formData.workingStatus === "Yes" ? [
                            { name: "grossIncome", label: "Total Monthly Gross Income (Pak Rs.)", type: "number" },
                            { name: "takeHomeIncome", label: "Total Monthly Take Home Income After Deduction of Taxes (Pak Rs.)", type: "number" }
                        ] : []
                        ),
                        { name: "telephone", label: "Tel (Res.)", type: "number" }
                    ].map((field) => (
                        <FormInput
                            key={field.name}
                            {...field}
                            formData={formData}
                            handleChange={handleChange}
                        />
                    ))}
                </div>
                <div className="mt-4">
                    <label className="block font-medium mb-1">Total Family Members Currently Living with you</label>
                    <input type="number"
                        name="familyMemberLivingWithYou"
                        value={formData.familyMemberLivingWithYou || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md" required />
                </div>

                <h5 className="text-2xl font-semibold mt-6">Details of Family Members</h5>
                <DynamicTable
                    firstColumnTitle="#"
                    headers={["", "Name of Family Member", "Relationship", "Marital Status", "Remarks"]}
                    numRows={
                        Number(formData.familyMemberLivingWithYou) > 0
                            ? Number(formData.familyMemberLivingWithYou)
                            : 6 // fallback to 6 if empty or invalid
                    }
                    tableTitle={"FamilyMembersDetails"}
                    dispatch={dispatch}
                    formData={formData}

                />


                {/* <div className="mt-4">
                    <label className="block font-medium mb-1">Details of Family Member Earning</label>
                    <input type="text"
                        name="familyMemberEarningDetails"
                        value={formData.familyMemberEarningDetails || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md" required />
                </div> */}

                {/* Family Members Occupation and Earnings Table */}

                <h5 className="text-2xl font-semibold mb-3">Family Members Occupation and Earnings</h5>
                <DynamicTable
                    firstColumnTitle="#"
                    headers={["", "Name of Family Member", "Relationship", "Occupation", "Organization Name", "Designation", "Monthly Gross Pay", "Remarks"]}
                    numRows={4}
                    tableTitle={"FamilyMembersOccupationEarnings"}
                    formData={formData}
                    dispatch={dispatch}
                />


                {/* Total Monthly Income */}
                <div className="mb-3">
                    <label className="block font-medium">Total Monthly Income (including self-income, if applicable) in PKR</label>
                    <input type="number"
                        name="totalMonthlyIncome"
                        value={formData.totalMonthlyIncome || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md" required />
                </div>

                {/* Family Members Studying */}
                <div className="mb-3">
                    <label className="block font-medium">Brothers/Sisters/Children/Family Members Studying</label>
                    <input type="number"
                        name="familyMembersStudying"
                        value={formData.familyMembersStudying || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md" required />
                </div>

                {/* Family Members Education Details Table */}
                <h5 className="text-2xl font-semibold mb-3">Educational Details of Family Members</h5>
                <DynamicTable
                    firstColumnTitle="#"
                    headers={["", "Name of Family Member", "Relationship", "Institution Name", "Fee per Month"]}
                    numRows={6}
                    tableTitle={"FamilyMembersEducationDetails"}
                    dispatch={dispatch}
                    formData={formData}
                />

                {/* input fields */}
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        { name: "totalFees", label: "Total Fees and Tuition Charges", type: "number" },
                        { name: "fatherName", label: "Father's Name", type: "text" },
                        { name: "computerizedNIC", label: "Computerized N.I.C No", type: "number" },
                        { name: "status", label: "Status", type: "select", options: ["Alive", "Decease"] },
                        { name: "professionalStatus", label: "Professional Status", type: "select", options: ["Employed", "Retired", "Business Owner"] },
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

                    ].map((field) => (
                        <FormInput
                            key={field.name}
                            {...field}
                            formData={formData}
                            handleChange={handleChange}
                        />
                    ))}
                </div>

                {/* Asset Income  */}
                <h2 className="text-xl font-bold mb-3">Asset Income (on Monthly Basis)</h2>
                <DynamicTable
                    firstColumnTitle={["Property Rent", "Land Lease", "Bank Deposits*", "Shares/Securities*", "Others (specify)", "Total"]}
                    headers={["Income Source", "Father", "Mother", "Spouse", "Self", "Other", "Total"]}
                    numRows={6}
                    tableTitle={"AssetIncome"}
                    dispatch={dispatch}
                    formData={formData}
                />


                <h2 className="text-xl font-bold mb-3">Family Expenditure</h2>
                <h3 className="text-lg font-semibold mb-2">Accommodation Expenditure</h3>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
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
                            name: "rentalPayment",
                            label: "Rent Payment",
                            type: "radio",
                            options: ["Self", "Employer/Govt", "Others"],
                        },
                        {
                            name: "rentAmount",
                            label: "Total Accommodation Rental Expenditure (PKR)",
                            type: "number",
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
                        },
                        {
                            name: "otherAccommodationType",
                            label: "Any other House/Flat owned by the parent(s) or Guardian(s) ",
                            type: "select",
                            options: ["Yes", "No"],
                        }
                    ].map((field) => (
                        <FormInput
                            key={field.name}
                            {...field}
                            formData={formData}
                            handleChange={handleChange}
                        />
                    ))}
                </div>

                {/* Table  */}
                {
                    formData.otherAccommodationType === "Yes" && (
                        <DynamicTable
                            firstColumnTitle="#"
                            headers={["", "Location/Address", "Bedrooms", "Air Conditioners", "Monthly Rent", "Annual Rent"]}
                            numRows={2}
                            tableTitle={"FamilyExpenditure"}
                            dispatch={dispatch}
                            formData={formData}
                        />
                    )
                }

                <div className="mt-6 flex text-center justify-between md:justify-end gap-4">
                    <button
                        type="button"
                        onClick={saveForm}
                        className="bg-blue-500 hover:cursor-pointer hover:bg-blue-600 text-white font-bold w-full md:w-40 py-3.5 px-2 rounded"
                    >
                        Save Progress
                    </button>

                    <Link
                        to="/scholarships/CMEEF/details/UnNationalProgram/page2"
                        className="bg-primary hover:bg-secondary cursor-pointer text-white font-bold w-full md:w-40 py-3.5 px-2 rounded"
                    >
                        Next Page
                    </Link>
                </div>

            </form>
        </div>
    );
};

export default UnNationalProgram;
