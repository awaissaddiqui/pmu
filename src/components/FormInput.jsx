import React from "react";

const FormInput = ({ name, label, type, options, formData, handleChange, required = true, maxWords }) => {
    if (type === "radio") {
        return (
            <div className="w-full">
                <label className="block text-sm font-semibold mb-2">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
                <div className="flex gap-4">
                    {options.map((option) => (
                        <label key={option} className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name={name}
                                value={option.toLowerCase()}
                                checked={formData[name]?.toLowerCase() === option.toLowerCase()}
                                onChange={handleChange}
                                required={required}
                                className="mr-2"
                            />
                            {option}
                        </label>
                    ))}
                </div>
            </div>
        );
    }

    if (type === "select") {
        return (
            <div className="relative w-full">
                <select
                    name={name}
                    id={name}
                    value={formData[name] || ""}
                    onChange={handleChange}
                    className="w-full p-2 pt-6 border rounded-md peer appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required={required}
                >
                    <option value="" disabled>Select</option>
                    {options.map((option, idx) => (
                        <option key={idx} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <label
                    htmlFor={name}
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-2.5 
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500
                    peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-primary"
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        );
    }

    if (type === "textarea") {
        const wordCount = formData[name] ? formData[name].trim().split(/\s+/).filter(Boolean).length : 0;
        const isOverLimit = maxWords && wordCount > maxWords;
        
        return (
            <div className="relative w-full mb-4">
                <label
                    htmlFor={name}
                    className="block text-sm font-semibold mb-2"
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
                <textarea
                    name={name}
                    className={`w-full p-2 border rounded-md ${isOverLimit ? 'border-red-500' : ''}`}
                    value={formData[name] || ""}
                    onChange={handleChange}
                    required={required}
                    placeholder=" "
                    rows={4}
                    id={name}
                ></textarea>
                {maxWords && (
                    <div className="flex justify-between text-xs mt-1">
                        <span className={`${isOverLimit ? 'text-red-500 font-semibold' : 'text-gray-500'}`}>
                            {wordCount} / {maxWords} words
                        </span>
                        {isOverLimit && (
                            <span className="text-red-500">
                                Please limit your response to {maxWords} words
                            </span>
                        )}
                    </div>
                )}
            </div>
        );
    }

    // Default input (text, email, tel, etc.)
    return (
        <div className="relative w-full">
            <input
                type={type}
                name={name}
                id={name}
                value={formData[name] || ""}
                onChange={handleChange}
                className="w-full p-2 pt-6 border rounded-md peer focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required={required}
                placeholder=" "
            />
            <label
                htmlFor={name}
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-2.5 
                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500
                peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-primary"
            >
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        </div>
    );
};

export default React.memo(FormInput);