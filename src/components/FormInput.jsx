import React from "react";

const FormInput = ({ name, label, type, options, formData, handleChange }) => {
    if (type === "radio") {
        return (
            <div className="w-full flex flex-col justify-center">
                <span className="text-sm font-semibold mb-1">{label}</span>
                <div className="flex space-x-4">
                    {options.map((option) => (
                        <label key={option} className="mr-4">
                            <input
                                type="radio"
                                name={name}
                                value={option.toLowerCase()}
                                checked={formData[name]?.toLowerCase() === option.toLowerCase()}
                                onChange={handleChange}
                                className="mr-1"
                            />
                            {option}
                        </label>
                    ))}
                </div>
            </div>
        );
    }
    if (type === "textarea") {
        return (
            <input
                as="textarea"
                name={name}
                className="w-full p-2 border rounded-md"
                value={formData[name] || ""}
                onChange={handleChange}
                required
                placeholder={label}
                rows={4}
            />
        );
    }
    return (
        <input
            type={type}
            name={name}
            className="w-full p-2 border rounded-md"
            value={formData[name] || ""}
            onChange={handleChange}
            required
            placeholder={label}
        />
    );
};

export default React.memo(FormInput);