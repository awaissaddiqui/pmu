import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import BackButton from "../components/BackButton";

const AdminFormDetails = () => {
    const { email } = useParams();
    const [formDetails, setFormDetails] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            try {
                const cachedData = JSON.parse(localStorage.getItem("formData")) || {};
                const { data, timestamp } = cachedData;

                // Define cache expiry time (e.g., 10 minutes)
                const cacheExpiry = 10 * 60 * 1000; // 10 minutes in milliseconds
                const now = Date.now();

                // Check if the cached data is still valid
                if (timestamp && now - timestamp < cacheExpiry) {
                    // Use cached data if it's still valid
                    const form = data.find((item) => item.pi_email === email);
                    setFormDetails(form || null);
                } else {
                    // Handle expired data (e.g., fetch fresh data from the server)
                    console.warn("Cached data is expired. Please fetch fresh data.");
                    setFormDetails(null); // Clear the form details or fetch fresh data
                }
            } catch (error) {
                console.error("Error retrieving data from localStorage:", error);
            }
        };

        fetchData();
    }, [email]);
    if (!formDetails) {
        return <p className="text-center text-gray-500">No details found for this email.</p>;
    }

    return (
        <div className="w-full mx-auto bg-white shadow-lg rounded-lg p-6">
            {/* Form Page 1 */}
            <div>
                <h1 className="text-2xl font-semibold text-secondary mb-4">
                    HREF Registration Form Details
                </h1>
                <BackButton />
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className="border border-gray-300 p-2 text-left">Field</th>
                            <th className="border border-gray-300 p-2 text-left">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { label: "Title of Proposed Project", key: "title" },
                            { label: "Subject", key: "subject" },
                            { label: "Major Field", key: "major_field" },
                            { label: "Minor Field", key: "minor_field" },
                            { label: "Total Funds Requested (in million)", key: "funds_requested" },
                            { label: "Proposed Duration (in months)", key: "duration" },
                            { label: "Project Location", key: "location" },
                            { label: "Proposed Starting Date", key: "start_date" },
                            { label: "Turnitin Similarity Index (%)", key: "turnitin_index" },
                            { label: "PI Name", key: "pi_name" },
                            { label: "PI Province", key: "pi_province" },
                            { label: "PI University", key: "pi_university" },
                            { label: "PI Designation", key: "pi_designation" },
                            { label: "PI Status", key: "pi_status" },
                            { label: "PI Department", key: "pi_department" },
                            { label: "PI Office Address", key: "pi_office_address" },
                            { label: "PI CNIC Number", key: "pi_cnic" },
                            { label: "PI Email Address", key: "pi_email" },
                            { label: "PI Phone Number", key: "pi_phone" },
                            { label: "Already Submitted Projects", key: "previous_projects" },
                            { label: "Beneficiary Sector/Industry", key: "beneficiary_sector" },
                        ].map(({ label, key }) => (
                            <tr key={key} className="hover:bg-gray-100">
                                <td className="border border-gray-300 p-2 font-semibold">{label}</td>
                                <td className="border border-gray-300 p-2">{formDetails[key] || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Form page 2 */}
            <div className="mt-8">
                {/* Form Page 2: CoverSheet Form Details */}
                <h1 className="text-2xl font-semibold text-secondary mb-4">
                    CoverSheet Form Details
                </h1>

                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className="border border-gray-300 p-2 text-left">Field</th>
                            <th className="border border-gray-300 p-2 text-left">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            "proposal_domain", "research_area", "research_subject", "specialization_field", "sub_specialization",
                            "research_location", "requested_funding", "project_duration", "project_start_date", "project_end_date",
                            "principal_investigator_name", "principal_investigator_degree", "principal_investigator_position",
                            "principal_investigator_department", "principal_investigator_university", "principal_investigator_cnic",
                            "principal_investigator_domicile", "principal_investigator_address", "principal_investigator_email",
                            "principal_investigator_phone", "co_principal_investigator_name", "co_principal_investigator_degree",
                            "co_principal_investigator_position", "co_principal_investigator_department",
                            "co_principal_investigator_university", "co_principal_investigator_cnic", "co_principal_investigator_domicile",
                            "co_principal_investigator_address", "co_principal_investigator_email", "co_principal_investigator_phone"
                        ].map((key) => (
                            <tr key={key} className="hover:bg-gray-100">
                                <td className="border border-gray-300 p-2">
                                    {key.replace(/_/g, ' ').toUpperCase()}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {formDetails[key] || "N/A"}
                                </td>
                            </tr>
                        ))}
                        <tr className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">Upload Signed Declaration File</td>
                            <td className="border border-gray-300 p-2">
                                <a href={formDetails.upload_signed_declaration} target="_blank" download className="text-blue-600 underline">
                                    Download File Here
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* Form 3 */}
            <div className="mt-8 bg-white shadow-lg rounded-lg p-4">
                <h1 className="text-2xl font-semibold text-secondary mb-4">
                    Form 3: Project Details
                </h1>

                {[
                    "project_summary", "goals_objectives", "hypothesis", "applied_goals",
                    "introduction", "justification", "research_plan", "references"
                ].map((key) => (
                    <label key={key} className="block text-sm font-semibold mb-4">
                        {key.replace(/_/g, ' ').toUpperCase()}
                        <textarea
                            className="w-full p-2 border rounded-md mt-1"
                            name={key}
                            rows="4"
                            value={formDetails[key] || "No data available"}
                            readOnly
                        />
                    </label>
                ))}
            </div>
            {/* Form 4 */}
            <div className="mt-8 bg-white shadow-lg rounded-lg p-4">
                <h1 className="text-2xl font-semibold text-secondary mb-4">
                    Project Details - Step 02
                </h1>

                {[
                    { key: "impact", label: "Impact in Quantifiable Terms" },
                    { key: "dev_strategy", label: "Provincial Development Strategies" },
                    { key: "collaborators", label: "Collaborating Organizations" },
                    { key: "facilities", label: "Facilities Available" },
                    { key: "additional_equipment", label: "Additional Equipment Required" },
                    { key: "available_personnel", label: "Scientific Personnel - Available" },
                    { key: "required_personnel", label: "Scientific Personnel - Required" },
                    { key: "other_funding", label: "Other Funding Available (if any)" }
                ].map(({ key, label }) => (
                    <label key={key} className="block text-sm font-semibold mb-4">
                        {label}
                        <textarea
                            className="w-full p-2 border rounded-md mt-1"
                            name={key}
                            rows="4"
                            value={formDetails[key] || "No data available"}
                            readOnly
                        />
                    </label>
                ))}
            </div>
            {/* Form 5 */}
            <div className="mt-8 bg-white shadow-lg rounded-lg p-4">
                <h1 className="text-2xl font-semibold text-secondary mb-4">
                    Research Projects Summary
                </h1>

                {/* Research Projects Table */}
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-primary text-white">
                            {["Sr. #", "Title of Project", "Initiation Date", "Completion Date",
                                "Amount(s) Awarded", "Funding Source(s)", "Attach Summary"]
                                .map((header, index) => (
                                    <th key={index} className="border p-2">{header}</th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <tr key={num}>
                                <td className="border p-2 text-center">{num}</td>
                                {[{ key: `project_title_${num}` },
                                { key: `initiation_date_${num}` },
                                { key: `completion_date_${num}` },
                                { key: `amount_awarded_${num}` },
                                { key: `funding_source_${num}` },
                                ]
                                    .map(({ key }) => (
                                        <td key={key} className="border p-2">
                                            {formDetails[key] || "N/A"}
                                        </td>
                                    ))}
                                <td className="border p-2">
                                    {formDetails[`attach_summary_${num}`] ? (
                                        <a
                                            href={formDetails[`attach_summary_${num}`]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary underline"
                                        >
                                            Download
                                        </a>
                                    ) : "No file attached"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Additional Sections */}
                <div className="mt-6 border p-4 w-sm text-center  hover:bg-blue-700 hover:text-white transition">
                    <a href={formDetails.Resume_of_PI} target="_blank" >Download Resume of PI & Co-PI</a>
                </div>
                <div className="mt-6">
                    {[
                        { key: "estimated_budget", label: "Estimated Budget for Research:" }
                    ].map(({ key, label }) => (
                        <div key={key} className="mb-4">
                            <label className="block font-semibold">{label}</label>
                            <textarea
                                className="w-full border p-2"
                                name={key}
                                rows="4"
                                value={formDetails[key] || "No data available"}
                                readOnly
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/* Form 6 */}
            <div className="mt-8 bg-white shadow-lg rounded-lg p-4">
                <h1 className="text-2xl font-semibold text-secondary mb-4">
                    Research Miscellaneous Information Form
                </h1>

                {/* Questions Table */}
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className="border p-2 text-left">Miscellaneous Information or Questions</th>
                            <th className="border p-2 text-center">Yes/No</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            "How many research associates/students funded by HEC or any other organization, the PI has?",
                            "How many non-funded research scholars are registered with PI?",
                            "Number of research articles published as a first author?",
                            "Number of research articles published as a co-author with your own M-Phil/PhD student?",
                            "Number of research articles published as a co-author with other researchers?",
                            "Number of research projects as PI funded by HEC/S&T/SDU or any other funding agency?",
                            "Number of research projects as PI funded by other agencies?",
                            "Number of research projects as Co-PI funded by HEC/S&T/SDU or any other funding agency?",
                            "Number of research projects as Co-PI funded by other agencies?"
                        ].map((question, index) => (
                            <tr key={index} className="border border-gray-300">
                                <td className="border p-2">{question}</td>
                                <td className="border p-2 text-center">
                                    {formDetails[`question_${index + 1}`] === "yes" ? "✅ Yes" : "❌ No"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Form 7 */}
            <div className="mt-8 bg-white shadow-lg rounded-lg p-4">
                <h1 className="text-2xl font-semibold text-secondary mb-4">
                    Checklist / Required Documents
                </h1>

                {/* Checklist Table */}
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className="border border-gray-300 p-3 text-left">Checklist / Required Documents</th>
                            <th className="border border-gray-300 p-3 text-center">Status (Yes/No)</th>
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
                                    {formDetails[item.name] === "yes" ? "✅ Yes" : "❌ No"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-6 border p-4 w-sm text-center hover:bg-blue-700 hover:text-white transition">
                    <a href={formDetails.signed_documents} target="_blank" >Download Signed Documents</a>
                </div>
            </div>

        </div>
    );
};

export default AdminFormDetails;
