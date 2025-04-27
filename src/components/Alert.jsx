import React from 'react';

const Alert = ({ string = "Before filling the form, you must have admission in your desired program", onOkay }) => {
    return (
        <div className="fixed inset-0 bg-secondary bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 w-96 text-center">
                <h2 className="text-xl font-bold text-red-600 mb-4">Important Notice</h2>
                <p className="text-gray-700 mb-6">{string}</p>
                <button
                    onClick={onOkay}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition duration-300 cursor-pointer "
                >
                    Okay
                </button>
            </div>
        </div>
    );
};

export default Alert;
