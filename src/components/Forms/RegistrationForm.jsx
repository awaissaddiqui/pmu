import React from "react";
import { useResearchForm } from "../../Context/ResearchFormContext";
import Button from "./Button";

const RegistrationForm = () => {
    const { formData, dispatch } = useResearchForm();

    // Handle form input changes
    const handleChange = (e) => {
        dispatch({ type: "UPDATE_FIELD", field: e.target.name, value: e.target.value });
    };

    return (
        <div className="relative bg-opacity-50 flex justify-center items-center z-10 overflow-y-auto min-h-screen">
            <form className="relative bg-opacity-50 space-y-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-6 rounded-lg shadow-lg h-full w-full max-w-full pb-20">
                <h2 className="text-3xl font-semibold mb-4 col-span-full">HREF Registration Form</h2>

                {/* Title of Proposed Project */}
                <label className="block text-sm font-semibold">
                    Title of Proposed Project
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        name="title"
                        value={formData.title || ""}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* Subject */}
                <label className="block text-sm font-semibold">
                    Subject (e.g. Chemistry)
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        name="subject"
                        value={formData.subject || ""}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* Major Field */}
                <label className="block text-sm font-semibold">
                    Major Field (e.g. Organic Chemistry)
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        name="major_field"
                        value={formData.major_field || ""}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* Minor Field */}
                <label className="block text-sm font-semibold">
                    Minor Field (e.g. drug etc.)
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        name="minor_field"
                        value={formData.minor_field || ""}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* Total Funds Requested */}
                <label className="block text-sm font-semibold">
                    Total Funds Requested (in million)
                    <input
                        type="number"
                        className="w-full p-2 border rounded-md"
                        name="funds_requested"
                        step="0.01"
                        value={formData.funds_requested || ""}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* Proposed Duration */}
                <label className="block text-sm font-semibold">
                    Proposed Duration (in months)
                    <input
                        type="number"
                        className="w-full p-2 border rounded-md"
                        name="duration"
                        value={formData.duration || ""}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* Project Location */}
                <label className="block text-sm font-semibold">
                    Project Location
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        name="location"
                        value={formData.location || ""}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* Proposed Starting Date */}
                <label className="block text-sm font-semibold">
                    Proposed Starting Date
                    <input
                        type="date"
                        className="w-full p-2 border rounded-md"
                        name="start_date"
                        value={formData.start_date || ""}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* Turnitin Similarity Index */}
                <label className="block text-sm font-semibold">
                    Turnitin Similarity Index (%)
                    <input
                        type="number"
                        className="w-full p-2 border rounded-md"
                        name="turnitin_index"
                        step="0.01"
                        value={formData.turnitin_index || ""}
                        onChange={handleChange}
                        required
                    />
                </label>

                <h4 className="text-lg font-semibold mt-4 col-span-full">Details of Principal Investigator (PI)</h4>

                {/* PI Name */}
                <label className="block text-sm font-semibold">Name
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        name="pi_name"
                        value={formData.pi_name || ""}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* PI Province */}
                <label className="block text-sm font-semibold">Province of University
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        name="pi_province"
                        value={formData.pi_province || ""}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* PI University */}
                <label className="block text-sm font-semibold">University/Organization/Institution
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        name="pi_university"
                        value={formData.pi_university || ""}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* PI Designation */}
                <label className="block text-sm font-semibold">Designation (BPS or TTS)
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        name="pi_designation"
                        value={formData.pi_designation || ""}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* PI Status */}
                <label className="block text-sm font-semibold">Status (Contract/Regular/Adhoc)
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        name="pi_status"
                        value={formData.pi_status || ""}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* PI Department */}
                <label className="block text-sm font-semibold">Department
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        name="pi_department"
                        value={formData.pi_department || ""}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* PI Office Address */}
                <label className="block text-sm font-semibold">Office Address
                    <textarea
                        className="w-full p-2 border rounded-md"
                        name="pi_office_address"
                        rows="3"
                        value={formData.pi_office_address || ""}
                        onChange={handleChange}
                        required
                    ></textarea>
                </label>

                {/* PI CNIC Number */}
                <label className="block text-sm font-semibold">CNIC Number
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        name="pi_cnic"
                        value={formData.pi_cnic || ""}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* PI Email Address */}
                <label className="block text-sm font-semibold">Email Address
                    <input
                        type="email"
                        className="w-full p-2 border rounded-md"
                        name="pi_email"
                        value={formData.pi_email || ""}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* PI Phone Number */}
                <label className="block text-sm font-semibold">Cell and Phone #
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        name="pi_phone"
                        value={formData.pi_phone || ""}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* Previous Projects */}
                <label className="block text-sm font-semibold">Already Submitted Projects (ID/Reference No.)
                    <textarea
                        className="w-full p-4 border rounded-md"
                        name="previous_projects"
                        rows="4"
                        value={formData.previous_projects || ""}
                        onChange={handleChange}
                    ></textarea>
                </label>

                {/* Beneficiary Sector */}
                <label className="block text-sm font-semibold">Beneficiary Sector/Industry in KP
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        name="beneficiary_sector"
                        value={formData.beneficiary_sector || ""}
                        onChange={handleChange}
                        required
                    />
                </label>


                {/* Buttons Container */}
                <div className="flex justify-end mt-6 md:absolute md:bottom-4 md:right-4 w-full">
                    <Button nextString="/research/registration/coversheet" />
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;
