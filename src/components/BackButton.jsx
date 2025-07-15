import React from "react";

const BackButton = () => {
    return (
        <div className="flex justify-start mb-4">
            <button
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary hover:cursor-pointer transition-colors duration-300"
                onClick={() => window.history.back()}
            >
                Back
            </button>
        </div>
    );
}
export default BackButton;