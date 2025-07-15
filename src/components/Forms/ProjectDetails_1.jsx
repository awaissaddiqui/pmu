import React from 'react';
import { useResearchForm } from "../../Context/ResearchFormContext";
import Button from './Button';

const ProjectDetails_1 = () => {
    const { formData, dispatch, saveForm, saveStatus, isLoading } = useResearchForm();

    const handleChange = (event) => {
        const { name, value } = event.target;
        dispatch({ type: "UPDATE_FIELD", field: name, value });
    };

    return (
        <div className="max-w-full mx-auto">
            <h2 className="text-3xl p-6 font-semibold text-primary text-start">Project Details</h2>
            <form className="relative bg-opacity-50 space-y-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-6 rounded-lg shadow-lg h-full w-full max-w-full pb-20">

                {/* Text Areas for Detailed Inputs */}
                {[
                    "project_summary", "goals_objectives", "hypothesis", "applied_goals",
                    "introduction", "justification", "research_plan", "references"
                ].map((field) => (
                    <label key={field} className="block col-span-1 md:col-span-2 lg:col-span-3 text-sm font-semibold">
                        {field.replace(/_/g, ' ').toUpperCase()}
                        <textarea
                            className="w-full p-2 border rounded-md"
                            name={field}
                            rows="4"
                            value={formData[field] || ""}
                            onChange={handleChange}
                        />
                    </label>
                ))}

                {/* Button Container */}
                <div className="flex flex-col md:flex-row justify-end mt-6 md:absolute md:bottom-4 md:right-4 w-full gap-4">
                    <button
                        type="button"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded"
                        onClick={saveForm}
                        disabled={isLoading || saveStatus === "saving"}
                    >
                        {saveStatus === "saving" ? "Saving..." : "Save"}
                    </button>
                    <Button nextString="/research/registration/coversheet/details2" requiredFields={
                        [
                            "project_summary", "goals_objectives", "hypothesis", "applied_goals",
                            "introduction", "justification", "research_plan", "references"
                        ]
                    } />
                </div>
                {saveStatus === "saved" && (
                    <div className="text-green-600 mt-2 font-medium text-right col-span-full">
                        ✅ Progress saved!
                    </div>
                )}
                {saveStatus === "error" && (
                    <div className="text-red-600 mt-2 font-medium text-right col-span-full">
                        ❌ Error saving progress. Please try again.
                    </div>
                )}
            </form>
        </div>
    );
};

export default ProjectDetails_1;
