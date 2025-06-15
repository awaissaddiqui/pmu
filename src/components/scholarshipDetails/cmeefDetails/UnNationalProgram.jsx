import React, { useState } from "react";
import { Link } from "react-router";
import { useUndergraduateForm } from "../../../Context/UndergraduateFormContext";
import DynamicTable from "../../DynamicTable";
import FormInput from "../../FormInput";
import Alert from "../../Alert";
import { universityNames, domiciles } from "../../../utils/data";
const UnNationalProgram = () => {
    const { formData, dispatch } = useUndergraduateForm();
    const [showAlert, setShowAlert] = useState(true);

    // Find the selected university based on the formData
    const selectedUniversity = universityNames.find((u) => u.name === formData.universityName);
    const handleChange = (event) => {
        // event.preventDefault();
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
                        { name: "gender", label: "Gender", type: "radio", options: ["Male", "Female"] },
                        { name: "maritalStatus", label: "Marital Status", type: "radio", options: ["Single", "Married", "Divorced"] },
                        { name: "workingStatus", label: "Are you currently working?", type: "radio", options: ["Yes", "No"] },
                        // { name: "domicile", label: "Domicile", type: "text" },
                        { name: "presentAddress", label: "Present Address", type: "text" },
                        { name: "permanentAddress", label: "Permanent Address", type: "text" },
                        { name: "employer", label: "Name of Employer / Company", type: "text" },
                        { name: "designation", label: "Designation", type: "text" },
                        { name: "mobile", label: "Mobile", type: "number" },
                        { name: "email", label: "Email", type: "email" },
                        ...(formData.workingStatus === "yes" ? [
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
                    <input type="text"
                        name="totalMonthlyIncome"
                        value={formData.totalMonthlyIncome || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md" required />
                </div>

                {/* Family Members Studying */}
                <div className="mb-3">
                    <label className="block font-medium">Brothers/Sisters/Children/Family Members Studying</label>
                    <input type="text"
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
                />

                {/* input fields */}
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                            type: "radio",
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
                    formData.otherAccommodationType === "yes" && (
                        <DynamicTable
                            firstColumnTitle="#"
                            headers={["", "Location/Address", "Bedrooms", "Air Conditioners", "Monthly Rent", "Annual Rent"]}
                            numRows={2}
                            tableTitle={"FamilyExpenditure"}
                            dispatch={dispatch}
                        />
                    )
                }

                <div className=" mt-6 flex text-center justify-center md:justify-end">
                    <Link to="/scholarships/CMEEF/details/UnNationalProgram/page2" className="bg-primary hover:bg-secondary cursor-pointer text-white font-bold w-full md:w-40 py-3.5 px-8 rounded">
                        Next Page
                    </Link>
                </div>

            </form>
        </div>
    );
};

export default UnNationalProgram;
