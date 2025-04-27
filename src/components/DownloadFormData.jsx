import React from 'react';

const DownloadFormData = ({ show, onCancel, handleDownload }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-black/20 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-6">
                    Are you sure you want to download your form data?
                </h2>

                <div className="flex justify-center space-x-4">
                    <button
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded cursor-pointer hover:bg-gray-400"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-primary text-white px-4 py-2 rounded cursor-pointer hover:bg-secondary"
                        onClick={handleDownload}
                    >
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DownloadFormData;
