import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useUndergraduateForm } from "../../../Context/UndergraduateFormContext";
import FormInput from "../../FormInput";
import DynamicTable from "../../DynamicTable";
import { supabaseDb } from "../../../Firebase";

const UnNationalProgramPage2 = () => {
    const { formData, dispatch, submitForm } = useUndergraduateForm();
    const [isUploading, setIsUploading] = useState(false);
    const [isFileUploaded, setIsFileUploaded] = useState(false);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true); // Disable the button while uploading

        try {
            const { data, error } = await supabaseDb.storage
                .from("unNationalProgram")
                .upload(`${formData.email}/signed_declaration_fileUnNat`, file);

            if (error) throw error;

            const downloadURL = await supabaseDb.storage
                .from("unNationalProgram")
                .getPublicUrl(`${formData.email}/signed_declaration_fileUnNat`);

            console.log(downloadURL);

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
    return (
        <div className="p-6 bg-gray-100">
            <form className="bg-white p-6 shadow-md rounded-lg" onSubmit={(e) => {
                e.preventDefault();
                submitForm();
                alert("Form Submitted Successfully");

            }
            }>
                {/* Income and Expenditure Table */}
                <h2 className="text-xl font-bold mb-4">Income & Expenditure</h2>


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
                        required
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
                        className="w-full p-2 border rounded" required />
                </label>
                <label className="mt-2 block font-medium mb-2">Area and location of Land(s)/Plot(s) owned
                    <input type="text"
                        name="landLocation"
                        value={formData.landLocation || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded" required />
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

                <label className="mt-4 block font-medium mb-2"> Per month fee/ tuition charges of the institution last attended
                    <input type="text"
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
                <label className="mt-6 block font-medium mb-2">Upload Signed Undertaking:
                    <input type="file"
                        name="undertaking_signed"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                        // value={formData.undertaking_signed || ""}
                        className="w-full p-4 border rounded" required />
                </label>
                <div className=" mt-6 flex justify-center md:justify-end gap-4">

                    <button onClick={(e) => {
                        e.preventDefault();
                        navigate(-1);
                    }} className="bg-blue-700 hover:bg-blue-500 cursor-pointer text-white font-bold w-full md:w-40 py-3.5 px-12 rounded">
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
        </div >
    );
};

export default UnNationalProgramPage2;
