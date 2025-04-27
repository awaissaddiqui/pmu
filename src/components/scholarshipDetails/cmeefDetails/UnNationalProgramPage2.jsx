import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useUndergraduateForm } from "../../../Context/UndergraduateFormContext";
import FormInput from "../../FormInput";
import DynamicTable from "../../DynamicTable";
import { supabaseDb } from "../../../Firebase";
import DownloadFormData from "../../DownloadFormData";
import { downloadPDF } from "../../../hook/pdfGenerator";

const UnNationalProgramPage2 = () => {
    const { formData, dispatch, submitForm } = useUndergraduateForm();
    const [isUploading, setIsUploading] = useState(false);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true); // Disable the button while uploading
        document.body.style.cursor = "wait"; // Change cursor to wait

        try {


            const { data, error } = await supabaseDb.storage.from("unNationalProgram").upload(`${formData.email}/signed_declaration_fileUnNat`, file);
            if (error) throw error;
            const downloadURL = await supabaseDb.storage.from("unNationalProgram").getPublicUrl(`${formData.email}/signed_declaration_fileUnNat`);

            // console.log(downloadURL);

            dispatch({
                type: "UPDATE_FIELD",
                field: "signed_declaration_fileUnNat",
                value: downloadURL.data.publicUrl,
            });
            setIsFileUploaded(true); // Enable the submit button after successful upload

        } catch (error) {
            console.error("Storage Error:", error);
            setIsFileUploaded(false); // Ensure button remains disabled if there's an error
        } finally {
            setIsUploading(false); // Re-enable input and prevent loading loop
            document.body.style.cursor = "default"; // Reset cursor to default
        }
    };

    const handleTableChange = (event) => {
        const { name, value } = event.target;

        dispatch({
            type: "UPDATE_FIELD",
            field: "income_expenditure",
            value: { ...formData.income_expenditure, [name]: value },
        });
    };

    const handleChange = (event) => {
        // event.preventDefault();
        const { name, value, type } = event.target;

        dispatch({
            type: "UPDATE_FIELD",
            field: name,
            value: type === 'file' ? event.target.files[0] : value
        });
    };
    const navigate = useNavigate();
    // download form data function


    const handleDownloadFormData = () => {
        const sections = [
            {
                title: "Basic Information",
                keys: [
                    "universityName", "degreeTitle", "applicantName", "gender", "maritalStatus",
                    "workingStatus", "cnic", "age", "domicile", "presentAddress",
                    "permanentAddress", "employer", "designation", "mobile", "email",
                    "grossIncome", "takeHomeIncome", "telephone"
                ]
            },
            {
                title: "Family Complete Details (Income, Accommodation, etc.)",
                keys: ["familyMemberEarningDetails", "totalMonthlyIncome", "familyMembersStudying", "type", "status", "rentPayment", "housePlotSize", "coveredArea"]
            },
            {
                title: "Father / Guardian Details",
                keys: [
                    "fatherName", "computerizedNIC", "status", "professionalStatus",
                    "companyName", "telOff", "mobile", "occupationType", "ntn",
                    "designationGrade", "grossMonthlyIncome", "totalNetMonthlyIncome",
                    "supportingPerson", "supportingPersonName", "relationship",
                    "occupationDesignation", "financialSupport", "disposable_income_explanation"
                ]
            },
            {
                title: "Transport and Other Assets Info",
                keys: [
                    "familyTransport", "cattleName", "landLocation"
                ]
            },
            {
                title: "Loan Details",
                keys: [
                    "familyLoan", "sourceFinancing", "admissionCharges"
                ]
            },
            {
                title: "Previous Education and Scholarships",
                keys: [
                    "lastInstitutionFee", "scholarship"
                ]
            }
        ];

        const tables = [
            {
                title: "Details of Family Members",
                tableTitle: "FamilyMembersDetails",
                headers: ["#", "Name of Family Member", "Relationship", "Marital Status", "Remarks"]
            },
            {
                title: "Family Members Occupation and Earnings",
                tableTitle: "FamilyMembersOccupationEarnings",
                headers: ["#", "Name", "Relationship", "Occupation", "Organization Name", "Designation", "Monthly Gross Pay", "Remarks"]
            },
            {
                title: "Educational Details of Family Members",
                tableTitle: "FamilyMembersEducationDetails",
                headers: ["#", "Name", "Relationship", "Institution Name", "Fee per Month"]
            },
            , {
                title: "Income and Expenditure",
                tableTitle: "income_expenditure",
                headers: ["sec.29A", "sec.33A", "29.A-33A", "sec.29B", "sec.33B", "29.B-33.B"]
            },
            {
                title: "Asset Income",
                tableTitle: "AssetIncome",
                headers: ["Income Source", "Father", "Mother", "Spouse", "Self", "Other", "Total"]
            },
            {
                title: "Family Expenditure",
                tableTitle: "FamilyExpenditure",
                headers: ["#", "Location/Address", "Bedrooms", "Air Conditioners", "Monthly Rent", "Annual Rent"]
            },
            {
                title: "Assets Information",
                tableTitle: "AssetsInformation",
                headers: [
                    "Assets Title",
                    "Qty",
                    "Size",
                    "Location (Address)",
                    "Cultivative Area",
                    "Agricultural Yield per Area"
                ]
            },
            {
                title: "Assets Worth",
                tableTitle: "assetsWorth",
                headers: [
                    "Assets Title",
                    "Father",
                    "Mother",
                    "Spouse",
                    "Self",
                    "Guardian",
                    "Total"
                ]
            },
            {
                title: "Applicant Educational Record",
                tableTitle: "educationRecord",
                headers: [
                    "Level of Study",
                    "Name & location of Institution",
                    "Per Month Fee",
                    "To-From month/yr.",
                    "Division/GPA",
                    "%age/CGPA"
                ]
            },
            {
                title: "Transport Details",
                tableTitle: "transport",
                headers: [
                    "#",
                    "Transport Type",
                    "Make/Model",
                    "Engine Capacity (CC)",
                    "Registration No",
                    "Ownership Period"
                ]
            },
            {
                title: "Scholarship Details",
                tableTitle: "scholarshipsDetails",
                headers: [
                    "#",
                    "Name of institute",
                    "Scholarship Name",
                    "Total Scholarship Amount",
                    "Total Scholarship Period",
                    "Class/level at which Scholarship was granted"
                ]
            }
        ];

        const fileName = "Undergraduate_National_Form.pdf";
        downloadPDF(formData, sections, tables, fileName);
        setShowModal(false);
        navigate("/");

    };



    return (
        <div className="p-6 bg-gray-100">
            {
                showModal ?
                    (
                        <DownloadFormData
                            show={showModal}
                            onCancel={() => setShowModal(false)}
                            handleDownload={handleDownloadFormData}
                        />
                    )
                    : (
                        <>


                            <form className="bg-white p-6 shadow-md rounded-lg"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    submitForm();
                                    setShowModal(true);

                                }
                                }>
                                {/* Income and Expenditure Table */}
                                <h2 className="text-xl font-bold mb-4">Income & Expenditure</h2>


                                <div className="mb-6 overflow-x-auto">
                                    <table className="w-full border border-gray-300 mb-6">
                                        <thead>
                                            <tr className="bg-secondary text-white ">
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
                                                    <td className="p-2 border">
                                                        <input
                                                            type="text"
                                                            className="w-full p-2 border rounded"
                                                            placeholder="Enter Amount"
                                                            name={item.id}
                                                            value={formData.income_expenditure?.[item.id] || ""}
                                                            onChange={handleTableChange}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Explanation Field */}
                                <div className="mb-6">
                                    <label className="block font-medium mb-2">
                                        If the monthly/annual disposable income is negative, kindly explain:
                                    </label>
                                    <input
                                        type="text"
                                        name="disposable_income_explanation"
                                        value={formData.disposable_income_explanation || ""}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>

                                {/* Assets - Transport Ownership */}
                                <h2 className="text-xl font-bold mb-3">Assets (Current Market Value)</h2>
                                <div className="mb-4">
                                    <label className="block font-medium mb-2">
                                        Does the family own any transport?
                                    </label>
                                    <div className="flex space-x-4">
                                        <label>
                                            <input type="radio"
                                                name="familyTransport"
                                                checked={formData.familyTransport === "yes"}
                                                onChange={handleChange}
                                                value="yes" className="mr-1" />
                                            Yes
                                        </label>
                                        <label>
                                            <input type="radio"
                                                name="familyTransport"
                                                checked={formData.familyTransport === "no"}
                                                onChange={handleChange}
                                                value="no" className="mr-1" />
                                            No
                                        </label>
                                    </div>
                                </div>

                                {/* Transport Details Table */}
                                {formData.familyTransport === "yes" && (
                                    <>
                                        <h3 className="text-lg font-semibold mb-2">If yes, kindly fill the details:</h3>
                                        <DynamicTable
                                            tableTitle="transport"
                                            firstColumnTitle="#"
                                            headers={[
                                                "",
                                                "Transport Type",
                                                "Make/Model",
                                                "Engine Capacity (CC)",
                                                "Registration No",
                                                "Ownership Period",
                                            ]}
                                            dispatch={dispatch}
                                            numRows={3}
                                        />
                                    </>
                                )}


                                <h4 className="mt-4 text-gray-600">
                                    Others: include tractor, rickshaw, bi-cycle, motorcycle rickshaw, carriage pick, truck etc.
                                </h4>
                                <label className="mt-2 block font-medium mb-2"> Number of Cattle(s) (with kind)
                                    <input type="text"
                                        name="cattleName"
                                        value={formData.cattleName || ""}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded" />
                                </label>
                                <label className="mt-2 block font-medium mb-2">Area and location of Land(s)/Plot(s) owned
                                    <input type="text"
                                        name="landLocation"
                                        value={formData.landLocation || ""}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded" />
                                </label>
                                {/* Assets Information */}
                                <h2 className="text-lg font-semibold mb-4">Assets Information</h2>
                                <DynamicTable
                                    tableTitle="AssetsInformation"
                                    firstColumnTitle={["Residential", "Commercial", "Agricultural", "Employer/Govt Scheme"]}
                                    headers={[
                                        "Assets Title",
                                        "Qty",
                                        "Size",
                                        "Location (Address)",
                                        "Cultivative Area",
                                        "Agricultural Yield per Area",
                                    ]}
                                    dispatch={dispatch}
                                    numRows={4}
                                />


                                <h3 className="mt-6 font-semibold">Assets Worth (Current Market Value in PKR)</h3>

                                {/* Assets Worth*/}
                                <DynamicTable
                                    dispatch={dispatch}
                                    numRows={6}
                                    tableTitle="assetsWorth"
                                    firstColumnTitle={[
                                        "House",
                                        "Business",
                                        "Land & Building",
                                        "Bank Balance",
                                        "Stocks/Prize Bond",
                                        "Other/Cattle",
                                        "Total",
                                        ""
                                    ]}
                                    headers={["Assets Title", "Father", "Mother", "Spouse", "Self", "Guardian", "Total"]}
                                />

                                {/* Loan for applicant eduction */}

                                <h2 className="text-xl mt-4 font-semibold ">Loan taken for Applicant Education </h2>
                                {[
                                    { name: "familyLoan", label: "Family/ Friend Loan (Specify details of loan taken and relationship with the relative / friend)" },
                                    { name: "sourceFinancing", label: "Any source of financing other than loan (Please specify)" },
                                    { name: "admissionCharges", label: "How were the admission /first semester charges paid?" },
                                ].map((field) => (
                                    <FormInput
                                        key={field.name}
                                        {...field}
                                        formData={formData}
                                        handleChange={handleChange}
                                    />
                                ))}


                                {/* Applicant Education Record */}
                                <h2 className="text-xl mt-4 font-semibold ">Applicants educational record: </h2>
                                <DynamicTable
                                    tableTitle="educationRecord"
                                    firstColumnTitle={["Bachelors", "Intermediate", "Bachelors"]}
                                    headers={[
                                        "Level of Study",
                                        "Name & location of Institution",
                                        "Per Month Fee",
                                        "To-From month/yr.",
                                        "Division/GPA",
                                        "%age/CGPA",
                                    ]}
                                    dispatch={dispatch}
                                    numRows={3}
                                />

                                <label className="mt-4 block font-medium mb-2"> Per month fee/tuition charges of the institution last attended
                                    <input type="number"
                                        value={formData.lastInstitutionFee || ""}
                                        onChange={handleChange}
                                        name="lastInstitutionFee"
                                        className="w-full p-2 border rounded" required />
                                </label>
                                <div className="mb-4">
                                    <label className="block font-medium mb-2">
                                        Have you ever got any other Scholarships
                                    </label>
                                    <div className="flex space-x-4">
                                        <label>
                                            <input type="radio"
                                                name="scholarship"
                                                value="yes"
                                                checked={formData.scholarship === "yes"}
                                                onChange={handleChange}
                                                className="mr-1" />
                                            Yes
                                        </label>
                                        <label>
                                            <input type="radio"
                                                name="scholarship"
                                                value="no"
                                                checked={formData.scholarship === "no"}
                                                onChange={handleChange}
                                                className="mr-1" />
                                            No
                                        </label>
                                    </div>
                                </div>
                                {/* if yes then fill form */}
                                {formData.scholarship === "yes" && (
                                    <>
                                        <h2 className=" text-xl mt-4  ">If yes fill the details of scholarships & attach documentary proof of the scholarships</h2>
                                        <DynamicTable
                                            tableTitle="scholarshipsDetails"
                                            firstColumnTitle="#"
                                            headers={[
                                                "Name of institute",
                                                "Scholarship Name",
                                                "Total Scholarship Amount",
                                                "Total Scholarship Period",
                                                "Class/level at which Scholarship was granted",
                                            ]}
                                            dispatch={dispatch}
                                            numRows={3}
                                        />
                                    </>
                                )}

                                <label className="mt-4 block font-medium mb-2"> Statement of Purpose (Explain your suitability for this scholarship) - attach separate sheet if required
                                    <input type="text"
                                        value={formData.scholarshipStatementOP || ""}
                                        onChange={handleChange}
                                        name="scholarshipStatementOP"
                                        className="w-full p-2 border rounded" required />
                                </label>
                                <h4 className="mt-4 text-gray-900"> <a href="/unNationalSignedDoc" download className="text-blue-800 underline" target="_blank"> Download Undertaking</a> and then Upload Signed Undertaking:</h4>
                                <div className="mt-6">
                                    <label className="block font-medium mb-2 text-gray-800">Upload Signed Undertaking:</label>

                                    <div className="relative max-w-sm">
                                        <label
                                            htmlFor="undertaking_signed"
                                            className={`flex items-center justify-center w-full p-4 bg-primary text-white rounded-lg shadow-md cursor-pointer hover:bg-secondary transition ${isUploading ? "opacity-70 cursor-wait" : ""}`}
                                        >
                                            {isUploading ? "Uploading..." : "Choose File"}
                                        </label>

                                        <input
                                            id="undertaking_signed"
                                            type="file"
                                            name="undertaking_signed"
                                            onChange={handleFileUpload}
                                            disabled={isUploading}
                                            className="hidden"
                                        />
                                    </div>

                                    {formData.signed_declaration_fileUnNat && (
                                        <p className="text-green-600 mt-2 font-medium">
                                            ✅ File Uploaded Successfully
                                        </p>
                                    )}
                                </div>

                                <div className=" mt-6 flex justify-center md:justify-end gap-4">

                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        navigate(-1);
                                    }} className="bg-gray-700 hover:bg-gray-500 cursor-pointer text-white font-bold w-full md:w-40 py-3.5 px-12 rounded">
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className={`bg-primary hover:bg-secondary text-white font-bold w-full md:w-40 py-3.5 px-12 rounded ${!isFileUploaded ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                            }`}
                                        disabled={!isFileUploaded}
                                    >
                                        {isUploading ? "Uploading..." : "Submit"}
                                    </button>
                                </div>
                            </form >
                        </>)
            }
        </div >
    );
};

export default UnNationalProgramPage2;

/*
const capitalize = (str) => {
    return str
        .replace(/([A-Z])/g, ' $1')        // Add space before capital letters
        .replace(/_/g, ' ')                 // Replace underscores with spaces
        .replace(/\s+/g, ' ')               // Remove any extra spaces
        .trim()                             // Remove leading/trailing spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};

const buildTableData = (keys, formData) =>
    keys.map((key) => [capitalize(key), formData[key] || 'N/A']);

function downloadPDF(formData, sections, tables, fileName) {

    const doc = new jsPDF();
    let startY = 15; // initialize

    sections.forEach((section, index) => {
        if (index !== 0) {
            doc.addPage();
            startY = 15;
        }

        doc.setFontSize(14);
        doc.text(section.title, 14, startY);

        autoTable(doc, {
            startY: startY + 8,
            head: [['Field', 'Value']],
            body: buildTableData(section.keys, formData),
            styles: { fontSize: 10 },
            headStyles: { fillColor: [0, 77, 0] },
        });

        startY = doc.lastAutoTable.finalY + 10; // ✅ Correct after section table
    });

    tables.forEach((table, index) => {
        if (startY > 260) {  // 👈 If very near bottom, add new page
            doc.addPage();
            startY = 15;
        }

        doc.setFontSize(14);
        doc.text(table.title, 14, startY);

        const tableData = formData?.[table.tableTitle] || [];

        autoTable(doc, {
            startY: startY + 8,
            head: [table.headers],
            body: tableData.length > 0 ? (
                tableData.map((row, i) =>
                    table.headers.map((header, idx) => {
                        if (idx === 0) return i + 1;
                        const key = Object.keys(row)[idx - 1];
                        return row[key] || "N/A";
                    })
                )
            ) : [Array(table.headers.length).fill('N/A')],
            styles: { fontSize: 10, fillColor: [0, 77, 0] },
        });

        startY = doc.lastAutoTable.finalY + 10; // ✅ Correct after table too
    });

    doc.save(fileName);

}

*/