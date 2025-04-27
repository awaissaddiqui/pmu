import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
const capitalize = (str) => {
    return str
        .replace(/([A-Z])/g, ' $1')        // Add space before capital letters
        .replace(/_/g, ' ')                 // Replace underscores with spaces
        .replace(/\s+/g, ' ')               // Remove any extra spaces
        .trim()                             // Remove leading/trailing spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};

const buildTableData = (keys, formData) =>
    keys.map((key) => [capitalize(key), formData[key] || 'N/A']);

export function downloadPDF(formData, sections, tables, fileName) {

    const doc = new jsPDF();
    let startY = 15; // initialize

    sections.forEach((section, index) => {
        // 👇 Check if we are near bottom before starting new section
        if (startY > 260) {
            doc.addPage();
            startY = 15;
        }

        doc.setFontSize(14);
        doc.text(section.title, 14, startY);

        autoTable(doc, {
            startY: startY + 8,
            head: [['Field', 'Value']],
            body: buildTableData(section.keys, formData),
            styles: { fontSize: 10 },
            headStyles: { fillColor: [0, 77, 0] },
        });

        startY = doc.lastAutoTable.finalY + 10; // Move down for next section
    });

    tables.forEach((table, index) => {
        if (startY > 260) {
            doc.addPage();
            startY = 15;
        }

        doc.setFontSize(14);
        doc.text(table.title, 14, startY);

        const tableData = formData?.[table.tableTitle] || [];

        let body = [];

        if (Array.isArray(tableData)) {
            // Normal dynamic tables (Family Members, Assets etc.)
            body = tableData.length > 0 ? (
                tableData.map((row, i) =>
                    table.headers.map((header, idx) => {
                        if (idx === 0) return i + 1; // first column #
                        const key = Object.keys(row)[idx - 1];
                        return row[key] || "N/A";
                    })
                )
            ) : [Array(table.headers.length).fill('N/A')];

        } else if (typeof tableData === "object") {
            // Special case: income_expenditure is an object (NOT array)
            body = table.headers.map((key) => {
                return [key, tableData?.[key] || "N/A"];
            });
        }

        autoTable(doc, {
            startY: startY + 8,
            head: [table.headers.length > 2 ? table.headers : ["S#", "Amount"]],
            body,
            styles: { fontSize: 10 },
            headStyles: { fillColor: [0, 77, 0] },

        });

        startY = doc.lastAutoTable.finalY + 10;
    });


    doc.save(fileName);

}

export function downloadPdfData(formData, filename, sections, tables, otherData = []) {

    const doc = new jsPDF();
    let startY = 15; // initialize
    // Generate sections
    sections.forEach((section, index) => {
        if (startY > 250) {
            doc.addPage();
            startY = 15;
        }

        doc.setFontSize(14);
        doc.text(section.title, 14, startY);

        autoTable(doc, {
            startY: startY + 8,
            head: [['Field', 'Value']],
            body: buildTableData(section.keys, formData),
            styles: { fontSize: 10 },
            headStyles: { fillColor: [0, 77, 0] },
        });

        startY = doc.lastAutoTable.finalY + 10;
    });

    otherData.forEach((data) => {
        if (startY > 250) {
            doc.addPage();
            startY = 15;
        }

        doc.setFontSize(14);
        doc.text(data.title, 14, startY);

        const body = data.keys.map((label) => {
            const isChecked = formData.subject?.includes(label); // ✅ Check if the label exists in formData.subject
            return [
                label,
                isChecked ? "Yes" : "No"
            ];
        });

        autoTable(doc, {
            startY: startY + 8,
            head: [["Field", "Selected"]],
            body,
            styles: { fontSize: 10 },
            headStyles: { fillColor: [0, 77, 0] },
        });

        startY = doc.lastAutoTable.finalY + 10;
    });

    // Generate tables
    tables.forEach((table) => {
        if (startY > 250) {
            doc.addPage();
            startY = 15;
        }

        doc.setFontSize(14);
        doc.text(table.title, 14, startY);

        const tableData = formData?.[table.tableTitle] || [];

        let body = [];

        if (Array.isArray(tableData)) {
            body = tableData.map((row, i) => [
                ...(table.firstColumn.includes("#") ? [i + 1] : [table.firstColumn[i] || ""]),
                ...table.headers.slice(1).map((header, idx) => {
                    const key = Object.keys(row)[idx];
                    return row[key] || "N/A";
                })
            ]);
        } else if (typeof tableData === "object") {
            body = table.firstColumn.map((firstCol, i) => {
                const key = table.headers[i] || "";
                return [firstCol, tableData?.[key] || "N/A"];
            });
        }

        autoTable(doc, {
            startY: startY + 8,
            head: [table.headers],
            body,
            styles: { fontSize: 10 },
            headStyles: { fillColor: [0, 77, 0] },
        });

        startY = doc.lastAutoTable.finalY + 10;
    });

    doc.save(filename);
}