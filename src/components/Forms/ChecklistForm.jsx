import React, { useState } from "react";
import { useResearchForm } from "../../Context/ResearchFormContext";
import { supabaseDb } from "../../Firebase";
import DownloadFormData from "../DownloadFormData";
import { jsPDF } from "jspdf";
import { autoTable } from 'jspdf-autotable'
import { useNavigate } from "react-router";

const ChecklistForm = () => {
    const { formData, dispatch, submitForm } = useResearchForm();
    const [isUploading, setIsUploading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            setIsUploading(true);
            document.body.style.cursor = "wait";

            const { data, error } = await supabaseDb.storage.from("pmu_forms").upload(`${formData.pi_email}/signed_documents`, file);
            if (error) throw error;
            const downloadURL = await supabaseDb.storage.from("pmu_forms").getPublicUrl(`${formData.pi_email}/signed_documents`);
            // console.log(downloadURL.data.publicUrl);
            dispatch({
                type: "UPDATE_FIELD",
                field: "signed_documents",
                value: downloadURL.data.publicUrl
            });


        } catch (error) {
            console.error("Checklist Storage Error:", error);
        }
        finally {
            setIsUploading(false);
            document.body.style.cursor = "default";
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        dispatch({ type: "UPDATE_FIELD", field: name, value });
    };

    const onCancel = () => {
        setShowModal(false);
    }



    const capitalize = (str) =>
        str.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

    const buildTableData = (keys, formData) =>
        keys.map((key) => [capitalize(key), formData[key] || 'N/A']);

    const handleDownload = (formData) => {
        const doc = new jsPDF();

        const sections = [
            {
                title: "HREF Registration Form Details", keys: [
                    "title", "subject", "major_field", "minor_field", "funds_requested",
                    "duration", "location", "start_date", "turnitin_index",
                    "pi_name", "pi_province", "pi_university", "pi_designation",
                    "pi_status", "pi_department", "pi_office_address",
                    "pi_cnic", "pi_email", "pi_phone", "beneficiary_sector"
                ]
            },
            {
                title: "CoverSheet Form Details", keys: [
                    "proposal_domain", "research_area", "research_subject", "specialization_field", "sub_specialization",
                    "research_location", "requested_funding", "project_duration", "project_start_date", "project_end_date",
                    "principal_investigator_name", "principal_investigator_degree", "principal_investigator_position",
                    "principal_investigator_department", "principal_investigator_university", "principal_investigator_cnic",
                    "principal_investigator_domicile", "principal_investigator_address", "principal_investigator_email",
                    "principal_investigator_phone", "co_principal_investigator_name", "co_principal_investigator_degree",
                    "co_principal_investigator_position", "co_principal_investigator_department",
                    "co_principal_investigator_university", "co_principal_investigator_cnic", "co_principal_investigator_domicile",
                    "co_principal_investigator_address", "co_principal_investigator_email", "co_principal_investigator_phone",
                ]
            },
            {
                title: "Project Details - Step 01", keys: [
                    "project_summary", "goals_objectives", "hypothesis", "applied_goals",
                    "introduction", "justification", "research_plan", "references"
                ]
            },
            {
                title: "Project Details - Step 02", keys: [
                    "impact", "dev_strategy", "collaborators", "facilities",
                    "additional_equipment", "available_personnel", "required_personnel", "other_funding"
                ]
            },
            {
                title: "Research Projects Summary - Step 03",
                isCustom: true,
                keys: [
                    // "Resume_of_PI",
                    "estimated_budget",
                    ...Array.from({ length: 5 }).flatMap((_, i) => {
                        const num = i + 1;
                        return [
                            `project_title_${num}`,
                            `initiation_date_${num}`,
                            `completion_date_${num}`,
                            `amount_awarded_${num}`,
                            `funding_source_${num}`,
                        ];
                    })
                ]
            },
            {
                title: "Research Miscellaneous Information Form", keys: [
                    "question_1", "question_2", "question_3", "question_4",
                    "question_5", "question_6", "question_7", "question_8",
                    "question_9"
                ]
            },
            {
                title: "Checklist / Required Documents", keys: [
                    "full_time", "blacklisted", "delayed_project", "nrpu_projects",
                    "turnitin_report", "university_signatures", "impact_brief", "industry_support",
                    "consent_letter", "project_summary", "equipment_available", "invoices_attached",
                    "cost_quantities", "institution_endorsement", "gantt_chart", "proposal_checked",
                    "hard_copies"
                ]
            }
        ];

        sections.forEach((section, index) => {
            if (index !== 0) doc.addPage();
            doc.setFontSize(14);
            doc.text(section.title, 14, 15);

            // 👉 Handle Page 5 differently
            if (section.title === "Research Projects Summary - Step 03") {
                autoTable(doc, {
                    startY: 25,
                    head: [['Field', 'Value']],
                    body: [
                        ['Estimated Budget', formData.estimated_budget || 'N/A']
                    ],
                    styles: { fontSize: 10 },
                    headStyles: { fillColor: [0, 77, 0] },
                });

                autoTable(doc, {
                    margin: { top: 60 },
                    head: [[
                        '#',
                        'Project Title',
                        'Initiation Date',
                        'Completion Date',
                        'Amount Awarded',
                        'Funding Source',
                    ]],
                    body: Array.from({ length: 5 }, (_, i) => {
                        const num = i + 1;
                        return [
                            `${num}`,
                            formData[`project_title_${num}`] || 'N/A',
                            formData[`initiation_date_${num}`] || 'N/A',
                            formData[`completion_date_${num}`] || 'N/A',
                            formData[`amount_awarded_${num}`] || 'N/A',
                            formData[`funding_source_${num}`] || 'N/A',
                        ];
                    }),
                    styles: { fontSize: 9 },
                    headStyles: { fillColor: [0, 77, 0] },
                });

            } else {
                // Handle normal sections
                autoTable(doc, {
                    startY: 20,
                    head: [['Field', 'Value']],
                    body: buildTableData(section.keys, formData),
                    styles: { fontSize: 10 },
                    headStyles: { fillColor: [0, 77, 0] },
                });
            }
        });

        doc.save("Research_Form_Data.pdf");
        setShowModal(false);
        navigate("/");
    };



    return (
        <div className="max-w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
            {
                showModal ?
                    (
                        <DownloadFormData
                            show={showModal}
                            onCancel={onCancel}
                            handleDownload={() => handleDownload(formData)}
                        />
                    ) : (



                        <>
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
                                Checklist / Required Documents
                            </h2>

                            <form className="overflow-x-auto" onSubmit={(e) => {
                                e.preventDefault();
                                submitForm();
                                setShowModal(true);

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
                                <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                                    <h4 className="text-xl font-semibold text-gray-800 mb-4">
                                        Upload and Download Endorsement Documents
                                    </h4>

                                    {/* Upload Section */}
                                    <div className="mb-6">
                                        <label className="block text-gray-700 font-medium mb-2">Upload Signed Documents</label>

                                        <div className="flex items-center space-x-4">
                                            <label
                                                htmlFor="signed_documents"
                                                className={`cursor-pointer bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition ${isUploading ? "opacity-60 cursor-wait" : ""
                                                    }`}
                                            >
                                                Choose File
                                            </label>
                                            <span className="text-sm text-gray-600">
                                                {formData.signed_documents ? "✅ File Uploaded Successfully" : "No file chosen"}
                                            </span>
                                        </div>

                                        <input
                                            id="signed_documents"
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileUpload}
                                        />

                                        {/* {formData.signed_documents && (
                                            <p className="text-green-600 mt-2 font-medium">
                                                ✅ File Uploaded Successfully
                                            </p>
                                        )} */}
                                    </div>

                                    {/* Download Section */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Download Documents</label>
                                        <a
                                            href="/reasearchEndorsementDoc.pdf"
                                            download
                                            className="inline-block bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition shadow"
                                        >
                                            Download
                                        </a>
                                    </div>
                                </div>


                                {/* Submit Button */}
                                <div className="flex md:justify-end">
                                    <button
                                        type="submit"
                                        className="mt-6 w-full md:w-auto md:px-8 cursor-pointer bg-primary text-white py-2 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
        </div>
    );
};

export default ChecklistForm;
