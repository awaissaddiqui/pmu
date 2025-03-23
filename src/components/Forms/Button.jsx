import React from 'react';
import { useNavigate } from 'react-router';

const Button = ({ nextString }) => {
    const navigate = useNavigate();

    const nextStep = (e) => {
        e.preventDefault();
        navigate(nextString);
    };

    const backStep = (e) => {
        e.preventDefault();
        navigate(-1);
    };

    return (
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 w-full md:w-auto">
            <button
                className="w-full md:w-auto px-12 py-2 bg-gray-500 text-white text-lg font-semibold rounded-lg hover:bg-gray-600 transition"
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
