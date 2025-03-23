import React from 'react';
import { useResearchForm } from "../../Context/ResearchFormContext";
import Button from './Button';

const ProjectDetails_2 = () => {
    const { formData, dispatch } = useResearchForm();

    const handleChange = (event) => {
        const { name, value } = event.target;
        dispatch({ type: "UPDATE_FIELD", field: name, value });
    };

    return (
        <div className="max-w-full mx-auto">
            <h2 className="text-3xl p-6 font-semibold text-primary text-start">Project Details - Step 02</h2>
            <form className="relative bg-opacity-50 space-y-4 grid grid-cols-1 gap-4 p-6 rounded-lg shadow-lg h-full w-full max-w-full pb-20">

                {/* Fields mapped dynamically */}
                {[
                    { key: "impact", label: "Impact in Quantifiable Terms", placeholder: "Describe impact of proposed research..." },
                    { key: "dev_strategy", label: "Provincial Development Strategies", placeholder: "How and which of the strategies will be addressed..." },
                    { key: "collaborators", label: "Collaborating Organizations", placeholder: "Identify collaborators and their role..." },
                    { key: "facilities", label: "Facilities Available", placeholder: "List available equipment and facilities..." },
                    { key: "additional_equipment", label: "Additional Equipment Required", placeholder: "List additional required equipment..." },
                    { key: "available_personnel", label: "Scientific Personnel - Available", placeholder: "Describe available personnel..." },
                    { key: "required_personnel", label: "Scientific Personnel - Required", placeholder: "Describe required personnel..." },
                    { key: "other_funding", label: "Other Funding Available (if any)", placeholder: "List any additional funding available..." }
                ].map(({ key, label, placeholder }) => (
                    <label key={key} className="block text-sm font-semibold">
                        {label}
                        <textarea
                            className="w-full p-4 border rounded-md"
                            name={key}
                            placeholder={placeholder}
                            rows="4"
                            value={formData[key] || ""}
                            onChange={handleChange}
                            required
                        />
                    </label>
                ))}

                {/* Next Button */}
                <div className="flex justify-end mt-6 md:absolute md:bottom-4 md:right-4 w-full">
                    <Button nextString="/research/registration/coversheet/details3" />
                </div>

            </form>
        </div>
    );
};

export default ProjectDetails_2;
