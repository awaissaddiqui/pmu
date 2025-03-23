import { useEffect, useState } from "react";

const DynamicTable = ({ firstColumnTitle, headers, numRows, tableTitle, dispatch }) => {
    // Initialize table data
    const [tableData, setTableData] = useState(
        Array(numRows).fill().map(() =>
            Object.fromEntries(headers.slice(1).map(header => [header.toLowerCase().replace(/\s+/g, '_'), ""]))
        )
    );

    // Handle input changes
    const handleInputChange = (rowIndex, field, value) => {
        const updatedTable = [...tableData];
        updatedTable[rowIndex][field] = value;
        setTableData(updatedTable);
    };

    // Update context state on change
    useEffect(() => {
        const filteredData = tableData.filter(row =>
            Object.values(row).some(value => value.trim() !== "")
        );

        dispatch({
            type: "UPDATE_FIELD",
            field: tableTitle,
            value: filteredData,
        });
    }, [tableData, dispatch]);

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        {/* First column title */}
                        <th className="border border-gray-300 px-4 py-2">
                            {typeof firstColumnTitle === "string" ? firstColumnTitle : headers[0]}
                        </th>

                        {/* Remaining headers */}
                        {headers.slice(1).map((header, index) => (
                            <th key={index} className="border border-gray-300 px-4 py-2">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: numRows }).map((_, rowIndex) => (
                        <tr key={rowIndex} className="bg-gray-100">
                            {/* Handle # (row numbering) or asset title */}
                            <td className="border border-gray-300 px-4 py-2 font-semibold">
                                {typeof firstColumnTitle === "string" ? rowIndex + 1 : firstColumnTitle[rowIndex]}
                            </td>

                            {/* Generate input fields dynamically */}
                            {headers.slice(1).map((header, colIndex) => {
                                const fieldName = header.toLowerCase().replace(/\s+/g, '_');
                                return (
                                    <td key={colIndex} className="border border-gray-300 px-4 py-2">
                                        <input
                                            type="text"
                                            name={fieldName}
                                            className="w-full p-2 border rounded-md"
                                            value={tableData[rowIndex][fieldName] || ""}
                                            onChange={(e) => handleInputChange(rowIndex, fieldName, e.target.value)}
                                        />
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DynamicTable;
