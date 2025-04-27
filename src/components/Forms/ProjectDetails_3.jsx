import React, { useState } from 'react';
import { useResearchForm } from "../../Context/ResearchFormContext";
import Button from './Button';
import { supabaseDb } from '../../Firebase';

const ProjectDetails_3 = () => {
    const { formData, dispatch } = useResearchForm();
    const [isUploading, setIsUploading] = useState(false);

    const handleFilesUpload2 = async (e, key) => {
        e.preventDefault();
        const file = e.target.files[0];

        try {
            setIsUploading(true);
            document.body.style.cursor = "wait";
            const { data, error } = await supabaseDb.storage.from('pmu_forms').upload(`${formData.pi_email}/Resume_of_PI`, file);
            if (error) throw error;
            const downloadURL = await supabaseDb.storage.from('pmu_forms').getPublicUrl(`${formData.pi_email}/Resume_of_PI`);
            // console.log(downloadURL.data.publicUrl);

            dispatch({
                type: "UPDATE_FIELD",
                field: 'Resume_of_PI',
                value: downloadURL.data.publicUrl,
            })


        } catch (error) {
            console.log(error);
        } finally {
            setIsUploading(false);
            document.body.style.cursor = "default";
        }
    }
    const handleFilesUpload = async (e, projectNumber) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (!file) return;

        try {
            setIsUploading(true);
            document.body.style.cursor = "wait";
            const { data, error } = await supabaseDb.storage.from('pmu_forms').upload(`${formData.pi_email}/projects/project_${projectNumber}`, file);
            if (error) throw error;
            const downloadURL = await supabaseDb.storage.from('pmu_forms').getPublicUrl(`${formData.pi_email}/projects/project_${projectNumber}`);
            // console.log(downloadURL.data.publicUrl);
            dispatch({
                type: "UPDATE_FIELD",
                field: `attach_summary_${projectNumber}`,
                value: downloadURL.data.publicUrl,
            });


        } catch (error) {
            console.error(error);
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

    return (
        <div className="max-w-full mx-auto p-6">
            <h2 className="text-xl font-semibold mb-4">Principal Investigator: Research Projects Summary</h2>
            <p className="mb-4">
                Provide a one-page summary of each research project completed, ongoing, or submitted.
            </p>

            <form className="space-y-4 grid grid-cols-1 gap-4 p-6 pb-20">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
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
                                    {[
                                        { key: `project_title_${num}`, type: "text", placeholder: "Project Title" },
                                        { key: `initiation_date_${num}`, type: "date" },
                                        { key: `completion_date_${num}`, type: "date" },
                                        { key: `amount_awarded_${num}`, type: "number", placeholder: "Amount" },
                                        { key: `funding_source_${num}`, type: "text", placeholder: "Funding Source" }
                                    ].map(({ key, type, placeholder }) => (
                                        <td key={key} className="border p-2">
                                            <input
                                                type={type}
                                                className="w-full border p-1 rounded-md"
                                                name={key}
                                                placeholder={placeholder || ""}
                                                value={formData[key] || ""}
                                                onChange={handleChange}
                                                required
                                            />
                                        </td>
                                    ))}
                                    <td className="border p-2">
                                        <div className="flex items-center space-x-2">
                                            <label
                                                htmlFor={`attach_summary_${num}`}
                                                className="cursor-pointer bg-primary text-white text-sm px-3 py-1.5 rounded-md hover:bg-secondary transition"
                                            >
                                                Upload File
                                            </label>

                                            <input
                                                id={`attach_summary_${num}`}
                                                type="file"
                                                name={`attach_summary_${num}`}
                                                onChange={(e) => handleFilesUpload(e, num)}
                                                className="hidden"
                                                required
                                            />
                                        </div>

                                        {formData[`attach_summary_${num}`] && (
                                            <p className="text-green-600 mt-2 font-medium">✅ File Uploaded Successfully</p>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

                {/* Additional Sections */}
                {[
                    {
                        key: "Resume_of_PI",
                        label: "A Brief Resume of PI & Co-PI:",
                        type: "file",
                        multiple: true,
                    },
                    {
                        key: "estimated_budget",
                        label: "Estimated Budget for Research:",
                        type: "textarea",
                        placeholder: "List additional required equipment",
                    },
                ].map(({ key, label, type, multiple, placeholder }) => (
                    <div key={key} className="form-group mb-4">
                        <label className="block font-semibold mb-2">{label}</label>

                        {type === "textarea" ? (
                            <textarea
                                className="w-full border border-gray-300 p-2 rounded-md"
                                name={key}
                                placeholder={placeholder}
                                value={formData[key] || ""}
                                onChange={handleChange}
                                required
                            />
                        ) : (
                            <div>
                                <label
                                    htmlFor={key}
                                    className="cursor-pointer inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition"
                                >
                                    Upload File{multiple ? "s" : ""}
                                </label>

                                <input
                                    id={key}
                                    type="file"
                                    name={key}
                                    multiple={multiple}
                                    onChange={(e) => handleFilesUpload2(e, key)}
                                    className="hidden"
                                    required
                                />

                                {/* ✅ Success message */}
                                {formData[key] && typeof formData[key] === "string" && (
                                    <p className="text-green-600 mt-2 font-medium">✅ File Uploaded Successfully</p>
                                )}
                            </div>
                        )}
                    </div>
                ))}


                <div className="flex justify-end mt-6">
                    <Button nextString="/research/registration/coversheet/details/information" requiredFields={
                        [
                            "Resume_of_PI", "estimated_budget",

                        ]
                    } />
                </div>
            </form>
        </div>
    );
};

export default ProjectDetails_3;
