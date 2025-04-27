import React from 'react';
import { useNavigate } from 'react-router';
import { useResearchForm } from '../../Context/ResearchFormContext';

const Button = ({ nextString, requiredFields = [], backBtnDisable = false }) => {
    const navigate = useNavigate();
    const { formData } = useResearchForm();


    const nextStep = (e) => {
        e.preventDefault();
        // Check if all required fields are filled
        if (requiredFields.length > 0) {
            const missingFields = requiredFields.filter((field) => !formData[field]?.toString().trim());
            if (missingFields.length > 0) {
                alert(`Please fill in the required fields`);
                return;
            }
        }
        navigate(nextString);
    };

    const backStep = (e) => {
        e.preventDefault();
        navigate(-1);
    };

    return (
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 w-full md:w-auto">
            <button
                disabled={backBtnDisable}
                className={`w-full md:w-auto px-12 py-2 bg-gray-500 text-white text-lg font-semibold rounded-lg ${backBtnDisable ? "cursor-not-allowed" : "cursor-pointer hover:bg-gray-600 transition"}  `}
                onClick={backStep}
            >
                Back
            </button>
            <button
                className="w-full md:w-auto px-12 py-2 bg-primary text-white text-lg font-semibold rounded-lg hover:bg-green-800 transition"
                onClick={nextStep}
            >
                Next
            </button>
        </div>
    );
};

export default Button;
