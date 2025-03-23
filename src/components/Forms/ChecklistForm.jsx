import React from "react";
import { useResearchForm } from "../../Context/ResearchFormContext";
import { supabaseDb } from "../../Firebase";
import { useNavigate } from "react-router";

const ChecklistForm = () => {
    const { formData, dispatch, submitForm } = useResearchForm();
    const navigate = useNavigate();

    // Handle File Upload
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const { data, error } = await supabaseDb.storage.from("pmu_forms").upload(`${formData.pi_email}/signed_documents`, file);
            if (error) throw error;
            const downloadURL = await supabaseDb.storage.from("pmu_forms").getPublicUrl(`${formData.pi_email}/signed_documents`);
            console.log(downloadURL.data.publicUrl);
            dispatch({
                type: "UPDATE_FIELD",
                field: "signed_documents",
                value: downloadURL.data.publicUrl
            });

        } catch (error) {
            console.error("Checklist Storage Error:", error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        dispatch({ type: "UPDATE_FIELD", field: name, value });
    };

    return (
        <div className="max-w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                Checklist / Required Documents
            </h2>

            <form className="overflow-x-auto" onSubmit={(e) => {
                e.preventDefault();
                submitForm();
                alert("Form Submitted Successfully");
                navigate('/')
            }}>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            {["Checklist / Required Documents", "Tick (Yes or No)"].map((header, index) => (
                                <th key={index} className="border border-gray-300 p-3 text-left">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { question: "Is PI a full-time regular faculty member (BPS or TTS)/Research Officer/Employee or on contract not less than project life?", name: "full_time" },
                            { question: "Has PI never been blacklisted by HEC/S&T/SDU or any other funding agency?", name: "blacklisted" },
                            { question: "Is PI not executing any project whose completion is delayed by three (03) years?", name: "delayed_project" },
                            { question: "Is PI not currently executing or has submitted two or more NRPU projects?", name: "nrpu_projects" },
                            { question: "Is Turnitin report of the proposal attached?", name: "turnitin_report" },
                            { question: "Have relevant university authorities affixed signatures with date & stamps on the Declaration Certificates?", name: "university_signatures" },
                            { question: "Has a brief of the impact of research project been attached?", name: "impact_brief" },
                            { question: "Is industry support letter attached?", name: "industry_support" },
                            { question: "Has a letter of consent from collaborating partner/agency been attached?", name: "consent_letter" },
                            { question: "Is one-page summary of each project of PI already completed/ running/ submitted been attached?", name: "project_summary" },
                            { question: "Is equipment demanded for the execution of the subject project not available with the University/Research Institute?", name: "equipment_available" },
                            { question: "Have original Invoices / Quotations for permanent equipment been attached?", name: "invoices_attached" },
                            { question: "Have year-wise cost and quantities of each expendable item been given?", name: "cost_quantities" },
                            { question: "Has head of institution duly endorsed the application?", name: "institution_endorsement" },
                            { question: "Have you provided project activities on GANTT Chart?", name: "gantt_chart" },
                            { question: "Have all fields of research proposal been carefully filled and counter-checked by the PI?", name: "proposal_checked" },
                            { question: "Have you prepared 04 sets of research proposals along with soft/scanned copies?", name: "hard_copies" }
                        ].map((item, index) => (
                            <tr key={index} className="border-b border-gray-300">
                                <td className="p-3 text-gray-800">{item.question}</td>
                                <td className="p-3 text-center">
                                    {["yes", "no"].map((option) => (
                                        <label key={option} className="inline-flex items-center mx-2">
                                            <input
                                                type="radio"
                                                name={item.name}
                                                value={option}
                                                checked={formData[item.name] === option}
                                                onChange={handleChange}
                                                className="form-radio"
                                            />
                                            <span className="ml-2 text-gray-700">{option.charAt(0).toUpperCase() + option.slice(1)}</span>
                                        </label>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* File Upload and Download */}
                <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-800">
                        Upload and Download Endorsement Documents
                    </h4>
                    <div className="mt-3">
                        <label className="block text-gray-700 font-medium">Upload Signed Documents</label>
                        <input
                            type="file"
                            className="mt-2 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                            onChange={handleFileUpload}
                        />
                        {formData.signed_documents && (
                            <p className="text-green-600 mt-2">File Uploaded Successfully</p>
                        )}
                    </div>

                    <div className="mt-4">
                        <label className="block text-gray-700 font-medium">Download Documents</label>
                        <a
                            href="/endorsment.pdf"
                            download
                            className="inline-block mt-2 bg-gray-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
                        >
                            Download
                        </a>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex md:justify-end">
                    <button
                        type="submit"
                        className="mt-6 w-full md:w-auto md:px-8 bg-primary text-white py-2 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChecklistForm;
