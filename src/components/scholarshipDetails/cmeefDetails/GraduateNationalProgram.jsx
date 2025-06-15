import React, { useState } from "react";
import FormInput from "../../FormInput";
import { useGraduateNationalForm } from "../../../Context/GraduateNationalFormContext";
import DynamicTable from "../../DynamicTable";
import { supabaseDb } from "../../../Firebase";
import DownloadFormData from "../../DownloadFormData";
import { downloadPdfData } from "../../../hook/pdfGenerator";
import Alert from "../../Alert";
import { useNavigate } from "react-router";
import { domiciles } from "../../../utils/data";

const GraduateNationalProgram = () => {
    const { formData, dispatch, submitForm } = useGraduateNationalForm();
    const [isUploading, setIsUploading] = useState(false);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(true);
    const navigate = useNavigate();

    const handleFileUpload = async (e, name) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true); // Disable the button while uploading
        document.body.style.cursor = "wait"; // Change cursor to wait

        try {
            const timestamp = Date.now();
            const uniqueFilePath = `${formData.email}/${name}_${timestamp}`;

            // Upload the file to Supabase
            const { data, error } = await supabaseDb.storage
                .from("graduatenational")
                .upload(uniqueFilePath, file);

            if (error) throw error;

            // Get the public URL of the uploaded file
            const downloadURL = await supabaseDb.storage
                .from("graduatenational")
                .getPublicUrl(uniqueFilePath);

            // console.log(downloadURL);

            // Update the form field with the file's public URL
            dispatch({
                type: "UPDATE_FIELD",
                field: name,
                value: downloadURL.data.publicUrl,
            });

            setIsFileUploaded(true); // Enable the submit button after successful upload
        } catch (error) {
            console.error("Storage Error:", error);
            setIsFileUploaded(false); // Ensure button remains disabled if there's an error
        } finally {
            setIsUploading(false); // Re-enable input and prevent loading loop
            document.body.style.cursor = "default"; // Reset cursor to default
        }
    };

    const handleChange = (event) => {
        // event.preventDefault();
        const { name, value, type } = event.target;

        dispatch({
            type: "UPDATE_FIELD",
            field: name,
            value: type === "file" ? event.target.files[0] : value,
        });
    };
    // handle download form data

    const handleDownloadFormData = () => {
        const filename = `Graduate_National_Program_${formData.full_name}.pdf`;
        const sections = [
            {
                title: "Personal Information",
                keys: [
                    "full_name",
                    "cnic_no",
                    "father_name",
                    "father_cnic_no",
                    "passport_no",
                    "passport_expiry_date",
                    "dob",
                    "domicile",
                    "gender",
                    "age",
                    "mailing_address",
                    "permanent_address",
                    "email",
                    "mobile_1",
                    "mobile_2",
                    "home",
                    "fax",
                    "office",
                    "references",
                    "marital_status",
                    "scholarships_list",
                    "academic_honors",
                    "offer_detail",
                    "university_name",
                    "commencement_date",
                    "completion_date",
                    "university_code",
                    "major_area",
                    "specialization",
                    "title",
                    "supervisor_name",
                    "supervisor_email",
                    "supervisor_contact",
                    "closing_date",
                    "research_publication",
                ],
            },
            {
                title: "Period Served",
                keys: [
                    "from",
                    "to",
                    "salary",
                    "fatherAlive",
                    "fatherName",
                    "fatherPhone",
                    "fatherMobile",
                    "fatherEmail",
                    "fatherEmployed",
                    "fatherDesignation",
                    "fatherJoiningDate",
                    "spouseName",
                    "spouseAge",
                    "spousePhone",
                    "spouseMobile",
                    "spouseEmail",
                    "spouseEmployed",
                    "spouseOrganization",
                ],
            },
            {
                title: "Spouse Employed",
                keys: ["spouseEmployed", "spouse_explanation"],
            },
            {
                title: "Total Assets",
                keys: [
                    "houseOwned",
                    "explanation",
                    "purchaseYear",
                    "originalPrice",
                    "presentMarketValue",
                    "plotSize",
                    "address",
                    "otherAssets",
                ],
            },
            {
                title: "Family Income Details(Annual, Loans etc)",
                keys: ["automobiles", "outstanding_loans", "disposable_income"],
            },
            {
                title: "Statement of Purpose",
                keys: [
                    "benefit_to_pakistan",
                    "skills_and_knowledge",
                    "supporting_statement",
                    "proposed_studies",
                    "join_after_completion",
                ],
            },
        ];

        const tables = [
            {
                title: "Education details",
                tableTitle: "education_details",
                headers: [
                    "Certificate/Degree",
                    "Major Subjects",
                    "Result Declaration Date",
                    "Marks Obtained",
                    "Total Marks",
                    "CGPA",
                    "Institution",
                    "Board/University",
                ],
                firstColumn: [
                    "SSC/Matric",
                    "HSSC/Intermediate",
                    "Bachelors (B.A, BSc, Hons. etc.)",
                    "Masters or Equivalent",
                    "M. Phil",
                    "GRE/GAT (Subject/General)",
                    "Medals (Gold/Silver/Bronze)",
                    "Other (please specify)",
                ],
            },
            {
                title: "Detail of Courses MS Level",
                tableTitle: "detail_of_courses_ms_level",
                headers: [
                    "",
                    "Course Name",
                    "Date/Semester",
                    "Course Type (Core/Elective)",
                    "Total Credits",
                ],
                firstColumn: ["#"],
            },
            {
                title: "Research Projects",
                tableTitle: "research_projects",
                headers: [
                    "",
                    "Title of research project",
                    "Area of Research",
                    "Published in International/Local Journal",
                    "Date of Publication",
                    "Impact Factor of Journal",
                ],
                firstColumn: ["#"],
            },
            {
                title: "Employment Details",
                tableTitle: "employment_details",
                headers: [
                    "",
                    "Name of Employer with Address ",
                    "Category of Employer(Federal/Prov Govt, SemiGovt, Autonomous,Corporation, Private)",
                    "Designation with Grade BPS, Group etc. if applicab",
                    "Nature of Job(Regular/Contractetc.)",
                    "Job details(Teaching, R&D, Service, Technical, other etc)",
                ],
                firstColumn: ["#"],
            },
            {
                title: "Total Income",
                tableTitle: "total_income",
                headers: [
                    "Particulars",
                    "Monthly Salary",
                    "From other sources if any",
                    "Total",
                ],
                firstColumn: [
                    "Father",
                    "Mother",
                    "Guardian",
                    "Self",
                    "Spouse",
                    "Others",
                ],
            },
            {
                title: "Annual Income",
                tableTitle: "annual_income",
                headers: ["Particulars", "Rupees"],
                firstColumn: [
                    "Agriculture Income",
                    "Income from Savings (Interests/Dividends)",
                    "Pension",
                    "Real State Holdings",
                    "Support from relatives",
                    "Others(please specify)",
                    "Total Annual household income",
                ],
            },
            {
                title: "Other Assets",
                tableTitle: "land_ownership",
                headers: ["Name of", "Locality", "Area (Kanals/Marlas/Sq. Feet)"],
                firstColumn: [
                    "Plots",
                    "Houses",
                    "Buildings",
                    "Land",
                    "Others (Specify)",
                ],
            },
            {
                title: "Individual Assets",
                tableTitle: "individual_assets",
                headers: [
                    "Particulars",
                    "Business",
                    "Savings and Investments",
                    "Land and Building",
                    "Agricultural Land",
                    "Area/location of  Agricultural Land",
                ],
                firstColumn: [
                    "Plots",
                    "Houses",
                    "Buildings",
                    "Land",
                    "Others (Specify)",
                ],
            },
            {
                title: "Automobiles Details",
                tableTitle: "automobiles_details",
                headers: [
                    "Vehicle",
                    "Make",
                    "Manufactured Year",
                    "Engine CC",
                    "Value in RS",
                ],
                firstColumn: ["Vehicle 1", "Vehicle 2", "Vehicle 3"],
            },
            {
                title: "Average Family Expenses",
                tableTitle: "average_family_expenses",
                headers: ["Total Average Family Expenses (Annual)", "Rupees"],
                firstColumn: [
                    "Educational Expenses",
                    "Food",
                    "Medical Expenses",
                    "Rent or Mortgage(if applicable)",
                    "Fuel And Vehicle Maintenance",
                    "Loan Payments",
                    "Clothing",
                    "Electricity Bill",
                    "Mobile phone bill",
                    "Entertainment",
                    "Servants Salaries",
                    "Taxes",
                    "Telephone Bill",
                    "Vactions",
                    "Others",
                    "Total annual expenses",
                ],
            },
            {
                title: "Outstanding Loans",
                tableTitle: "outstanding_loans_details",
                headers: ["Particulars", "Amount", "Repayment due on (mm/yy)"],
                firstColumn: [
                    "Bank (specify name)",
                    "Relative (specify relationship)",
                    "Credit Card",
                    "Employer",
                    "Other (please specify)",
                ],
            },
            {
                title: "Degree Expenses",
                tableTitle: "degree_expenses",
                headers: [
                    "Requirement",
                    "Per Semester(RS)",
                    "Per Year (RS)",
                    "Total expenses for the degree course(Approximately)(RS)",
                    "Duration of Study",
                ],
                firstColumn: [
                    "Tution Fees",
                    "Boarding",
                    "Lodging",
                    "Transport",
                    "Books",
                    "Misc",
                    "Total (a)",
                ],
            },
            {
                title: "Financial Aid Agencies",
                tableTitle: "financial_aid_agencies",
                headers: [
                    "",
                    "Agency/Foundations/Government",
                    "Application Date",
                    "Award Notification Date",
                    "Expected Amount (Rs.)",
                ],
                firstColumn: ["#"],
            },
        ];

        downloadPdfData(formData, filename, sections, tables);
        setShowModal(false); // Close the modal after download
        navigate("/"); // Redirect to the home page after download
    };

    return (
        <div className="relative flex justify-center items-center min-h-screen bg-gray-100 p-4">
            {showAlert && (
                <Alert
                    string="Before filling the form, you must have admission in your desired program."
                    onOkay={() => setShowAlert(false)} // 🛑 Close alert on Okay
                />
            )}
            {showModal ? (
                <DownloadFormData
                    onCancel={() => setShowModal(false)}
                    handleDownload={handleDownloadFormData}
                    show={showModal}
                />
            ) : (
                <>
                    <form
                        className="w-full max-w-full bg-white shadow-lg rounded-lg p-6 space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitForm();
                            setShowModal(true); // Show the modal on form submission
                        }}
                    >
                        <h2 className="md:text-3xl text-lg font-semibold text-center">
                            Chief Minister Education Endowment Fund (CMEEF) Scholarships
                            Application Form for Graduate National Program (MS/MPhil/PhD)
                        </h2>
                        <label className="mt-6 text-xl block  font-semibold" htmlFor="">
                            Please read the instructions carefully before submitting the form.
                            <a
                                href="/graduateInstruction.pdf"
                                className="text-blue-700"
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Download Instructions
                            </a>
                        </label>
                        <br />

                        {/* Remaining */}

                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-6">
                            {[
                                { label: "Full Name", name: "full_name", type: "text" },
                                { label: "CNIC No", name: "cnic_no", type: "text" },
                                { label: "Father Name", name: "father_name", type: "text" },
                                {
                                    label: "Father CNIC No",
                                    name: "father_cnic_no",
                                    type: "text",
                                },
                                { label: "Passport No", name: "passport_no", type: "text" },
                                {
                                    label: "Passport Expiry Date",
                                    name: "passport_expiry_date",
                                    type: "date",
                                },
                                { label: "Date of Birth", name: "dob", type: "date" },
                                // { label: "Domicile", name: "domicile", type: "text" },
                                {
                                    name: "gender",
                                    label: "Gender",
                                    type: "radio",
                                    options: ["Male", "Female"],
                                },
                                {
                                    label: "Age on closing date for admission",
                                    name: "age",
                                    type: "number",
                                },
                                {
                                    label: "Mailing Address",
                                    name: "mailing_address",
                                    type: "text",
                                },
                                {
                                    label: "Permanent Address (if different)",
                                    name: "permanent_address",
                                    type: "text",
                                },
                                { label: "Email", name: "email", type: "email" },
                                { label: "Mobile 1", name: "mobile_1", type: "tel" },
                                { label: "Mobile 2", name: "mobile_2", type: "tel" },
                                { label: "Home", name: "home", type: "tel" },
                                { label: "Fax", name: "fax", type: "tel" },
                                { label: "Office", name: "office", type: "tel" },
                                {
                                    label: "References in Pakistan",
                                    name: "references",
                                    type: "text",
                                },
                                {
                                    name: "marital_status",
                                    label: "Marital Status",
                                    type: "radio",
                                    options: ["Married", "Single"],
                                },
                                ...(formData.marital_status === "married"
                                    ? [
                                        {
                                            label:
                                                "If married, please specify number of people financially dependent on you",
                                            name: "dependents",
                                            type: "text",
                                        },
                                    ]
                                    : []),
                                {
                                    name: "other_nationality",
                                    label: "Do you have any other nationality?",
                                    type: "radio",
                                    options: ["Yes", "No"],
                                },
                                ...(formData.other_nationality === "yes"
                                    ? [
                                        {
                                            label: "If Yes, provide details",
                                            name: "other_nationality_details",
                                            type: "text",
                                        },
                                    ]
                                    : []),
                            ].map((field) => (
                                <FormInput
                                    key={field.name}
                                    {...field}
                                    formData={formData}
                                    handleChange={handleChange}
                                />
                            ))}
                            {/* Domicile Dropdown */}
                            <label className="w-full">
                                <select
                                    name="domicile"
                                    value={formData.domicile || ""}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="" disabled>Select Domicile</option>
                                    {domiciles.map((dom, idx) => (
                                        <option key={idx} value={dom}>
                                            {dom}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="mt-6 max-w-sm">
                            <label className="block font-semibold mb-2 text-gray-800">
                                Upload Attested Photo
                            </label>
                            <div className="relative w-full">
                                <input
                                    type="file"
                                    id="attested_photo"
                                    onChange={(e) => handleFileUpload(e, "attested_photo")}
                                    accept="image/*"
                                    disabled={isUploading}
                                    name="attested_photo"
                                    className="peer hidden"
                                    required
                                />
                                <label
                                    htmlFor="attested_photo"
                                    className={`flex items-center justify-center w-full bg-gray-400 p-4 border-2 border-dashed rounded-lg cursor-pointer
                                    transition hover:bg-secondary
                                    ${isUploading ? "opacity-50 cursor-wait" : ""}
                                    `}
                                >
                                    📎 Click to Upload Photo
                                </label>
                                {formData.attested_photo && (
                                    <p className="text-green-600 mt-2 font-medium">
                                        ✅ File Uploaded Successfully
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* code for the table */}
                        <div className="mt-8 overflow-x-auto">
                            <DynamicTable
                                tableTitle={"education_details"}
                                headers={[
                                    "Certificate/Degree",
                                    "Major Subjects",
                                    "Result Declaration Date",
                                    "Marks Obtained",
                                    "Total Marks",
                                    "CGPA",
                                    "Institution",
                                    "Board/University",
                                ]}
                                dispatch={dispatch}
                                firstColumnTitle={[
                                    "SSC/Matric",
                                    "HSSC/Intermediate",
                                    "Bachelors (B.A, BSc, Hons. etc.)",
                                    "Masters or Equivalent",
                                    "M. Phil",
                                    "GRE/GAT (Subject/General)",
                                    "Medals (Gold/Silver/Bronze)",
                                    "Other (please specify)",
                                ]}
                                numRows={8}
                            />
                        </div>

                        {/* Additional Input Fields */}
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-6">
                            {[
                                {
                                    label:
                                        "List of scholarships or fellowships held at present or in past",
                                    name: "scholarships_list",
                                    type: "text",
                                },
                                {
                                    label:
                                        "Indicate any academic honors/medals or prizes received",
                                    name: "academic_honors",
                                    type: "text",
                                },
                                {
                                    label: "Offer detail for MS/PhD/DPhil Program",
                                    name: "offer_detail",
                                    type: "text",
                                },
                                {
                                    label: "Name of University",
                                    name: "university_name",
                                    type: "text",
                                },
                                {
                                    label: "Date of Commencement of classes",
                                    name: "commencement_date",
                                    type: "date",
                                },
                                {
                                    label: "Date of Completion",
                                    name: "completion_date",
                                    type: "date",
                                },
                                {
                                    label: "University Ref/ID Code",
                                    name: "university_code",
                                    type: "text",
                                },
                                { label: "Major area", name: "major_area", type: "text" },
                                {
                                    label: "Specialization",
                                    name: "specialization",
                                    type: "text",
                                },
                                { label: "Title of MS/PhD/DPhil", name: "title", type: "text" },
                                {
                                    label: "Supervisor Name",
                                    name: "supervisor_name",
                                    type: "text",
                                },
                                {
                                    label: "Supervisor Email",
                                    name: "supervisor_email",
                                    type: "email",
                                },
                                {
                                    label: "Supervisor Contact",
                                    name: "supervisor_contact",
                                    type: "tel",
                                },
                                {
                                    label: "Closing date of admission of the institution",
                                    name: "closing_date",
                                    type: "date",
                                },
                                {
                                    label:
                                        "Research Publication (Use extra sheet where required)",
                                    name: "research_publication",
                                    type: "text",
                                },
                            ].map((field) => (
                                <FormInput
                                    key={field.name}
                                    {...field}
                                    formData={formData}
                                    handleChange={handleChange}
                                />
                            ))}
                        </div>
                        <div className="mt-6 max-w-sm">
                            <label className="block font-semibold mb-2 text-gray-800">
                                Please attach the copy with your application:
                            </label>
                            <div className="relative w-full">
                                <input
                                    type="file"
                                    id="attach_copy"
                                    onChange={(e) => handleFileUpload(e, "attach_copy")}
                                    disabled={isUploading}
                                    name="attach_copy"
                                    className="peer hidden"
                                    required
                                />
                                <label
                                    htmlFor="attach_copy"
                                    className={`flex items-center justify-center w-full p-4 bg-gray-400 border-2 border-dashed rounded-lg cursor-pointer
                                    transition hover:bg-secondary
                                    ${isUploading ? "opacity-50 cursor-wait" : ""}
                                    `}
                                >
                                    📎 Click to Upload File
                                </label>
                                {formData.attach_copy && (
                                    <p className="text-green-600 mt-2 font-medium">
                                        ✅ File Uploaded Successfully
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Courses Table */}
                        <div className="mt-6 overflow-x-auto">
                            <strong>Detail of Courses opted at MS/MPhil/PhD Level</strong>
                            <DynamicTable
                                tableTitle={"detail_of_courses_ms_level"}
                                headers={[
                                    "",
                                    "Course Name",
                                    "Date/Semester",
                                    "Course Type (Core/Elective)",
                                    "Total Credits",
                                ]}
                                dispatch={dispatch}
                                firstColumnTitle={"#"}
                                numRows={2}
                            />
                        </div>

                        {/* Research Projects */}
                        <div className="mt-6 overflow-x-auto">
                            <strong>Research Projects</strong>
                            <DynamicTable
                                tableTitle={"research_projects"}
                                headers={[
                                    "",
                                    "Title of research project",
                                    "Area of Research",
                                    "Published in International/Local Journal",
                                    "Date of Publication",
                                    "Impact Factor of Journal",
                                ]}
                                dispatch={dispatch}
                                firstColumnTitle={"#"}
                                numRows={5}
                            />
                        </div>
                        {/* Employment details */}
                        <div className="mt-6 overflow-x-auto">
                            <strong>Employment details </strong>
                            <DynamicTable
                                tableTitle={"employment_details"}
                                headers={[
                                    "",
                                    "Name of Employer with Address ",
                                    "Category of Employer(Federal/Prov Govt, SemiGovt, Autonomous,Corporation, Private)",
                                    "Designation with Grade BPS, Group etc. if applicab",
                                    "Nature of Job(Regular/Contractetc.)",
                                    "Job details(Teaching, R&D, Service, Technical, other etc)",
                                ]}
                                dispatch={dispatch}
                                firstColumnTitle={"#"}
                                numRows={7}
                            />
                        </div>

                        {/* Period Served */}
                        <h2 className="text-lg font-bold mt-8">Period Served</h2>
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-6">
                            {[
                                { label: "From", name: "from", type: "text" },
                                { label: "To", name: "to", type: "text" },
                                {
                                    label:
                                        "Last Drawn Gross Salary (Attach Pay Slip) (Rs.) Monthly",
                                    name: "salary",
                                    type: "text",
                                },

                            ].map((field) => (
                                <FormInput
                                    key={field.name}
                                    {...field}
                                    formData={formData}
                                    handleChange={handleChange}
                                />
                            ))}
                        </div>
                        {/* Family Information */}
                        <h2 className="text-xl font-bold mb-4">Family Information</h2>
                        <h5 className="text-lg font-bold mb-4">Father Information</h5>
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-6">
                            {[
                                {
                                    label: "Full Name of Father",
                                    label: "fatherName",
                                    type: "text"
                                },
                                {
                                    label: "Is your father alive",
                                    name: "fatherAlive",
                                    type: "radio",
                                    options: ["Yes", "No"],
                                },
                                // Conditionally include father's details if father is alive
                                ...(formData.fatherAlive === "yes"
                                    ? [
                                        {
                                            label: "Telephone No",
                                            name: "fatherPhone",
                                            type: "tel",
                                        },
                                        { label: "Mobile No", name: "fatherMobile", type: "tel" },
                                        { label: "Email", name: "fatherEmail", type: "email" },
                                    ]
                                    : []),
                                {
                                    label: "Is your Father currently employed?",
                                    name: "fatherEmployed",
                                    type: "radio",
                                    options: ["Yes", "No"],
                                },
                                ...(formData.fatherEmployed === "yes"
                                    ? [
                                        {
                                            label: "Designation",
                                            name: "fatherDesignation",
                                            type: "text",
                                        },
                                        {
                                            label: "Date of Joining (dd/mm/yy)",
                                            name: "fatherJoiningDate",
                                            type: "date",
                                        }] : []
                                ),
                            ].map((field) => (
                                <FormInput
                                    key={field.name}
                                    {...field}
                                    formData={formData}
                                    handleChange={handleChange}
                                />
                            ))
                            }
                        </div>
                        <h5 className="text-lg font-bold mb-4">Spouse Information</h5>
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-6">
                            {/* spouse information */}
                            {[ // Spouse details (always shown)
                                { label: "Are you Married", name: "spouseMarried", type: "radio", options: ["Yes", "No"] },
                                ...(formData.spouseMarried === "yes" ?
                                    [
                                        { label: "Spouse Full Name", name: "spouseName", type: "text" },
                                        { label: "Age", name: "spouseAge", type: "text" },
                                        { label: "Telephone No", name: "spousePhone", type: "tel" },
                                        { label: "Mobile No", name: "spouseMobile", type: "tel" },
                                        { label: "Email", name: "spouseEmail", type: "email" },
                                        {
                                            label: "Is your Spouse currently employed?",
                                            name: "spouseEmployed",
                                            type: "radio",
                                            options: ["Yes", "No"],
                                        },
                                        ...(formData.spouseEmployed === "yes"
                                            ? [
                                                {
                                                    label: "Organization",
                                                    name: "spouseOrganization",
                                                    type: "text",
                                                },
                                            ]
                                            : [])
                                    ] : []
                                ),
                            ].map((field) => (
                                <FormInput
                                    key={field.name}
                                    {...field}
                                    formData={formData}
                                    handleChange={handleChange}
                                />
                            ))}
                        </div>

                        {/* total income */}
                        <h2 className="text-xl font-semibold">Total Income</h2>
                        <h4 className="font-sm">
                            Please specify monthly income information for each member of your
                            family, including yourself and your spouse (if applicable). Use a
                            separate sheet if needed. Specify monetary values in Rupees{" "}
                        </h4>
                        <div className="mt-6 overflow-x-auto">
                            <DynamicTable
                                tableTitle={"total_income"}
                                headers={[
                                    "Particulars",
                                    "Monthly Salary",
                                    "From other sources if any",
                                    "Total",
                                ]}
                                dispatch={dispatch}
                                firstColumnTitle={[
                                    "Father",
                                    "Mother",
                                    "Guardian",
                                    "Self",
                                    "Spouse",
                                    "Others",
                                ]}
                                numRows={6}
                            />
                        </div>
                        {/* Annual Income */}
                        <div className="mt-6 overflow-x-auto">
                            <h2 className="text-xl font-semibold">
                                Please specify Annual income information from the sources
                                mentioned below:
                            </h2>
                            <DynamicTable
                                tableTitle={"annual_income"}
                                headers={["Particulars", "Rupees"]}
                                dispatch={dispatch}
                                firstColumnTitle={[
                                    "Agriculture Income",
                                    "Income from Savings (Interests/Dividends)",
                                    "Pension",
                                    "Real State Holdings",
                                    "Support from relatives",
                                    "Others(please specify)",
                                    "Total Annual household income",
                                ]}
                                numRows={7}
                            />
                        </div>

                        <label className="block font-medium">
                            Do you foresee a significant increase or decrease in your family
                            income next year?
                            <select
                                name="spouseEmployed"
                                required
                                className="w-full p-2 border rounded-md"
                                value={formData.spouseEmployed} // ✅ Bind value correctly
                                onChange={handleChange} // ✅ Update state
                            >
                                <option disabled selected>
                                    Select
                                </option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </label>

                        {/* Conditionally Show Extra Field */}
                        {formData.spouseEmployed === "yes" && (
                            <label className="block font-medium">
                                If yes, then explain:
                                <input
                                    className="w-full p-1 border rounded"
                                    name="spouse_explanation"
                                    type="text"
                                    value={formData.spouse_explanation || ""}
                                    onChange={handleChange}
                                />
                            </label>
                        )}
                        <h2 className="text-xl font-bold mb-4">Total Assets</h2>

                        {/* House Ownership Section */}
                        <fieldset className="border p-6 rounded-lg mb-6">
                            {[
                                {
                                    label: "1. Is the house you live in owned by your family?",
                                    name: "houseOwned",
                                    type: "radio",
                                    options: ["Yes", "No"],
                                },
                                ...(formData.houseOwned === "yes"
                                    ? [
                                        {
                                            label: "If Yes, please explain:",
                                            name: "explanation",
                                            type: "textarea",
                                        },
                                        {
                                            label: "Year of Purchase:",
                                            name: "purchaseYear",
                                            type: "text",
                                        },
                                        {
                                            label: "Original Purchase Price (Rs.):",
                                            name: "originalPrice",
                                            type: "text",
                                        },
                                        {
                                            label: "Present Market Value (Rs.):",
                                            name: "presentMarketValue",
                                            type: "text",
                                        },
                                        {
                                            label: "House Plot Size (Kanals/Marlas/Sq. Feet):",
                                            name: "plotSize",
                                            type: "text",
                                        },
                                        { label: "Address:", name: "address", type: "text" },
                                    ]
                                    : []),
                                {
                                    label:
                                        "2. Does your family own any other plot(s), house(s), shop(s), or land(s)?",
                                    name: "otherAssets",
                                    type: "radio",
                                    options: ["Yes", "No"],
                                },
                            ].map((field) => (
                                <FormInput
                                    key={field.name}
                                    {...field}
                                    formData={formData}
                                    handleChange={handleChange}
                                />
                            ))}
                        </fieldset>

                        {/* Land Ownership Table */}
                        {formData.otherAssets === "yes" && (
                            <div className="mt-6 overflow-x-auto">
                                <h2 className="text-lg font-bold mb-4">
                                    If you answered YES, please provide the following details:
                                </h2>
                                <DynamicTable
                                    tableTitle={"land_ownership"}
                                    headers={[
                                        "Name of",
                                        "Locality",
                                        "Area (Kanals/Marlas/Sq. Feet)",
                                    ]}
                                    dispatch={dispatch}
                                    firstColumnTitle={[
                                        "Plots",
                                        "Houses",
                                        "Buildings",
                                        "Land",
                                        "Others (Specify)",
                                    ]}
                                    numRows={5}
                                />
                            </div>
                        )}
                        <div className="mt-6 overflow-x-auto">
                            <h2 className="md:text-xl text-md font-semibold">
                                Please specify individual assets for each member of your family,
                                including yourself and your spouse (if applicable). Use a
                                separate sheet if needed. Specify monetary values in Rupees.
                            </h2>
                            <DynamicTable
                                tableTitle={"individual_assets"}
                                headers={[
                                    "Particulars",
                                    "Business",
                                    "Savings and Investments",
                                    "Land and Building",
                                    "Agricultural Land",
                                    "Area/location of  Agricultural Land",
                                ]}
                                dispatch={dispatch}
                                firstColumnTitle={[
                                    "Plots",
                                    "Houses",
                                    "Buildings",
                                    "Land",
                                    "Others (Specify)",
                                ]}
                                numRows={5}
                            />
                        </div>
                        <fieldset className="border p-4 rounded-lg mb-6">
                            <p className="font-medium mb-2">
                                Does your family own any automobile(s)?
                            </p>
                            <select
                                name="automobiles"
                                required
                                className="w-full p-2 border rounded-md"
                                value={formData.automobiles} // ✅ Bind value correctly
                                onChange={handleChange} // ✅ Update state
                            >
                                <option disabled selected>
                                    Select
                                </option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </fieldset>

                        {/* ✅ Conditional Table Rendering */}
                        {formData.automobiles === "yes" && (
                            <>
                                <h2 className="text-lg font-bold mb-4">
                                    If you answered YES, please provide the following details:
                                </h2>
                                <DynamicTable
                                    tableTitle="automobiles_details"
                                    headers={[
                                        "Vehicle",
                                        "Make",
                                        "Manufactured Year",
                                        "Engine CC",
                                        "Value in RS",
                                    ]}
                                    dispatch={dispatch}
                                    firstColumnTitle={["Vehicle 1", "Vehicle 2", "Vehicle 3"]}
                                    numRows={3}
                                />
                            </>
                        )}

                        {/* Average Family Expenses */}
                        <div className="mt-6 overflow-x-auto">
                            <h2 className="md:text-xl text-md font-semibold">
                                Please specify Annual income information from the sources
                                mentioned below:
                            </h2>
                            <DynamicTable
                                tableTitle={"average_family_expenses"}
                                headers={["Total Average Family Expenses (Annual)", "Rupees"]}
                                dispatch={dispatch}
                                firstColumnTitle={[
                                    "Educational Expenses",
                                    "Food",
                                    "Medical Expenses",
                                    "Rent or Mortgage(if applicable)",
                                    "Fuel And Vehicle Maintenance",
                                    "Loan Payments",
                                    "Clothing",
                                    "Electricity Bill",
                                    "Mobile phone bill",
                                    "Entertainment",
                                    "Servants Salaries",
                                    "Taxes",
                                    "Telephone Bill",
                                    "Vactions",
                                    "Others",
                                    "Total annual expenses",
                                ]}
                                numRows={16}
                            />
                        </div>
                        <label className="block font-medium">
                            If the monthly/annual disposable income is negative, kindly
                            explain the reasons for the gap and any arrangements through which
                            the differential is being met by the family.
                            <input
                                type="text"
                                name="disposable_income"
                                value={formData.disposable_income}
                                onChange={handleChange}
                                className="w-full p-1 border rounded"
                            />
                        </label>

                        <p className="font-medium mb-2">Are there any outstanding loans?</p>
                        <select
                            name="outstanding_loans"
                            required
                            className="w-full p-2 border rounded-md"
                            value={formData.outstanding_loans} // ✅ Bind value correctly
                            onChange={handleChange} // ✅ Update state
                        >
                            <option disabled selected>
                                Select
                            </option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>

                        {formData.outstanding_loans === "yes" && (
                            <div className="mt-6 overflow-x-auto">
                                <h2 className="text-xl font-semibold">
                                    If yes, please indicate loans taken from:
                                </h2>
                                <DynamicTable
                                    tableTitle={"outstanding_loans_details"}
                                    headers={[
                                        "Particulars",
                                        "Amount",
                                        "Repayment due on (mm/yy)",
                                    ]}
                                    dispatch={dispatch}
                                    firstColumnTitle={[
                                        "Bank (specify name)",
                                        "Relative (specify relationship)",
                                        "Credit Card",
                                        "Employer",
                                        "Other (please specify)",
                                    ]}
                                    numRows={5}
                                />
                            </div>
                        )}

                        <h4 className="md:text-xl text-md font-semibold">
                            Detail of Fee/Living Expenses on the Degree Programme:
                        </h4>
                        <p>
                            Requirement of funds for degree: (Please mention all the amounts
                            in Pak Rupes){" "}
                        </p>
                        <div className="mt-6 overflow-x-auto">
                            <DynamicTable
                                tableTitle={"degree_expenses"}
                                headers={[
                                    "Requirement",
                                    "Per Semester(RS)",
                                    "Per Year (RS)",
                                    "Total expenses for the degree course(Approximately)(RS)",
                                    "Duration of Study",
                                ]}
                                dispatch={dispatch}
                                firstColumnTitle={[
                                    "Tution Fees",
                                    "Boarding",
                                    "Lodging",
                                    "Transport",
                                    "Books",
                                    "Misc",
                                    "Total (a)",
                                ]}
                                numRows={7}
                            />
                        </div>
                        {/* Financial Aid Agencies Section */}
                        <h2 className="md:text-lg text-md font-bold mb-4">
                            List the Agencies, Foundations, and/or Governments to which you
                            have Applied for Financial Aid
                        </h2>
                        <div className="mt-6 overflow-x-auto">
                            <DynamicTable
                                tableTitle={"financial_aid_agencies"}
                                headers={[
                                    "",
                                    "Agency/Foundations/Government",
                                    "Application Date",
                                    "Award Notification Date",
                                    "Expected Amount (Rs.)",
                                ]}
                                dispatch={dispatch}
                                firstColumnTitle={"#"}
                                numRows={3}
                            />
                        </div>
                        {/* Statement of Purpose Section */}
                        <h2 className="text-lg font-bold mb-4">Statement of Purpose</h2>
                        {[
                            {
                                label:
                                    "How will the proposed degree be of benefit to Pakistan/Khyber Pakhtunkhwa?",
                                name: "benefit_to_pakistan",
                                type: "textarea",
                            },
                            {
                                label:
                                    "What skills and knowledge do you hope to gain from your studies? How do you propose to use them (if possible, list specific actions) in Pakistan/Khyber Pakhtunkhwa?",
                                name: "skills_and_knowledge",
                                type: "textarea",
                            },
                            {
                                label:
                                    "Is there anything else you would like to add in support of your application for this scholarship?",
                                name: "supporting_statement",
                                type: "textarea",
                            },
                            {
                                label:
                                    "How do you relate the proposed studies to your previous study/achievements and your present job/occupation?",
                                name: "proposed_studies",
                                type: "textarea",
                            },
                            {
                                label:
                                    "Where would you like to join in Pakistan after completion of your MS/MPhil/PhD studies? [only for those applicants who are not already employed in Pakistan]",
                                name: "join_after_completion",
                                type: "textarea",
                            },
                        ].map((field) => (
                            <FormInput
                                key={field.name}
                                {...field}
                                formData={formData}
                                handleChange={handleChange}
                            />
                        ))}

                        {/* Download and Upload Undertaking */}
                        <div className="mt-6">
                            <h2 className="text-lg font-bold mb-2">
                                Download and Upload Undertaking
                            </h2>
                            <div className="flex flex-col  gap-4">
                                <label className="block font-medium">
                                    Download and Sign Undertaking
                                </label>
                                <a
                                    href="/graduateUndertakingDoc.pdf"
                                    download
                                    target="_blank"
                                    className="text-blue-500 underline"
                                >
                                    Download Undertaking
                                </a>
                                <div className="mt-6 max-w-sm">
                                    <label className="block font-semibold mb-2 text-gray-800">
                                        Upload Undertaking
                                    </label>
                                    <div className="relative w-full">
                                        <input
                                            type="file"
                                            id="undertaking_file"
                                            onChange={(e) => handleFileUpload(e, "undertaking_file")}
                                            disabled={isUploading}
                                            name="undertaking_file"
                                            className="peer hidden"
                                            required
                                        />
                                        <label
                                            htmlFor="undertaking_file"
                                            className={`flex items-center justify-center w-full bg-gray-400 p-4 border-2 border-dashed rounded-lg cursor-pointer
                                            transition hover:bg-secondary
                                            ${isUploading ? "opacity-50 cursor-wait" : ""}
                                            `}
                                        >
                                            📎 Click to Upload File
                                        </label>
                                        {formData.undertaking_file && (
                                            <p className="text-green-600 mt-2 font-medium">
                                                ✅ File Uploaded Successfully
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* For Employed Applicants Only */}
                        <div className="mt-6">
                            <h2 className="text-lg font-bold mb-2">
                                FOR EMPLOYED APPLICANTS ONLY
                            </h2>
                            <div className="flex flex-col gap-4">
                                <label className="block font-medium">
                                    Download NOC from Head of Department
                                </label>
                                <a
                                    href="/graduateNocDoc.pdf"
                                    download
                                    target="_blank"
                                    className="text-blue-500 underline"
                                >
                                    Download NOC
                                </a>
                                <div className="mt-6 max-w-sm">
                                    <label className="block font-semibold mb-2 text-gray-800">
                                        Upload NOC
                                    </label>
                                    <div className="relative w-full">
                                        <input
                                            type="file"
                                            id="noc_file"
                                            onChange={(e) => handleFileUpload(e, "noc_file")}
                                            disabled={isUploading}
                                            name="noc_file"
                                            className="peer hidden"
                                            required
                                        />
                                        <label
                                            htmlFor="noc_file"
                                            className={`flex items-center justify-center w-full bg-gray-400 p-4 border-2 border-dashed rounded-lg cursor-pointer
                                                transition hover:bg-secondary
                                                ${isUploading ? "opacity-50 cursor-wait" : ""}
                                                `}
                                        >
                                            📎 Click to Upload File
                                        </label>
                                        {formData.noc_file && (
                                            <p className="text-green-600 mt-2 font-medium">
                                                ✅ File Uploaded Successfully
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className={`bg-primary hover:bg-secondary text-white font-bold w-full md:w-48 py-3.5 px-12 rounded ${!isFileUploaded
                                    ? "opacity-50 cursor-not-allowed"
                                    : "cursor-pointer"
                                    }`}
                                disabled={!isFileUploaded}
                            >
                                {isUploading ? "Uploading..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default GraduateNationalProgram;
