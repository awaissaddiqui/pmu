import React from 'react';

const InfoGrid = ({ title, data, fields }) => {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {fields.map((field) => {
                    return (
                        <table key={field.name} className="w-full border-collapse border border-gray-300">
                            <tbody>
                                <tr className="border-b">
                                    <td className="font-semibold p-2">{field.label}</td>
                                    <td className="text-black p-2 text-end">{data?.[field.name] || "N/A"}</td>
                                </tr>
                            </tbody>
                        </table>
                    );
                })}
            </div>
        </div>
    );
};


export default InfoGrid;