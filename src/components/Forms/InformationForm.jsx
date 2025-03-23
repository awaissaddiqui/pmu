import React from 'react';
import { useResearchForm } from "../../Context/ResearchFormContext";
import Button from './Button';

const InformationForm = () => {
    const { formData, dispatch } = useResearchForm();

    const handleChange = (event) => {
        const { name, value } = event.target;
        dispatch({ type: "UPDATE_FIELD", field: name, value });
    };

    return (
        <div className="max-w-full bg-white shadow-md rounded-lg">
            <form className="relative bg-opacity-50 space-y-4 grid grid-cols-1 gap-4 p-6 rounded-lg shadow-lg h-full w-full max-w-full pb-24">
                <h2 className="text-3xl font-semibold text-primary">
                    Research Miscellaneous Information Form
                </h2>

                {/* Questions Table */}
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            {["Miscellaneous Information or Questions", "Yes/No"].map((header, index) => (
                                <th key={index} className="border border-gray-300 p-2 text-left">
                                    {header}
                                </th>
                            ))}
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
                                <td className="border border-gray-300 p-2">{question}</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <input
                                        type="text"
                                        name={`question_${index + 1}`}
                                        value={formData[`question_${index + 1}`] || ""}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-1 border rounded-md"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Button Container */}
                <div className="flex justify-end mt-6 md:absolute md:bottom-4 md:right-4 w-full">
                    <Button nextString="/research/registration/coversheet/details/checklist" />
                </div>
            </form>
        </div>
    );
};

export default InformationForm;
