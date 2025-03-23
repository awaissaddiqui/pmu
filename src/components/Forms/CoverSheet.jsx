import React from 'react';
import { useResearchForm } from "../../Context/ResearchFormContext";
import Button from './Button';
import { supabaseDb } from '../../Firebase';

const CoverSheet = () => {
    const { formData, dispatch } = useResearchForm();
    // Handle File Upload
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const { data, error } = await supabaseDb.storage.from('pmu_forms').upload(`${formData.pi_email}/signed_declaration_file`, file);
            if (error) throw error;
            const downloadURL = await supabaseDb.storage.from('pmu_forms').getPublicUrl(`${formData.pi_email}/signed_declaration_file`);
            // Update global state with file URL
            dispatch({
                type: "UPDATE_FIELD",
                field: "upload_signed_declaration",
                value: downloadURL.data.publicUrl
            });

        } catch (error) {
            console.error("Storage Error:", error);
        }
    };

    const handleChange = (event) => {
        const { name, value, type } = event.target;
        dispatch({
            type: "UPDATE_FIELD",
            field: name,
            value: type === 'file' ? event.target.files[0] : value
        });
    };

    return (
        <div className="max-w-full mx-auto mt-10">
            <h2 className="text-3xl p-6 font-semibold text-primary mb-2 text-start">
                Cover Sheet of Proposal
            </h2>
            <form className="relative bg-opacity-50 space-y-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-6 rounded-lg shadow-lg h-full w-full max-w-full pb-20">

                {/* Dynamic Input Fields */}
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
                    <label key={key} className="block text-sm font-semibold capitalize">
                        {key.replace(/_/g, ' ')}
                        <input
                            type={
                                key.includes('date') ? 'date'
                                    : key.includes('email') ? 'email'
                                        : key.includes('phone') || key.includes('cnic') || key.includes('funds') || key.includes('duration') ? 'number'
                                            : 'text'
                            }
                            className="w-full p-2 border rounded-md"
                            name={key}
                            value={formData[key] || ""}
                            onChange={handleChange}
                            required
                        />
                    </label>
                ))}

                {/* Upload Signed Declaration */}
                <div className="col-span-full">
                    <label className="block text-sm font-semibold">Upload Signed Declaration</label>
                    <input
                        type="file"
                        name="upload_signed_declaration"
                        onChange={handleFileUpload}
                        className="w-full p-2 border rounded-md mt-2"
                        required
                    />
                    {formData.upload_signed_declaration && (
                        <p className="text-green-600 mt-2">File Uploaded Successfully</p>
                    )}
                </div>

                <div className="flex justify-end mt-6 md:absolute md:bottom-4 md:right-4 w-full">
                    <Button nextString="/research/registration/coversheet/details1" />
                </div>

            </form>
        </div>
    );
};

export default CoverSheet;
