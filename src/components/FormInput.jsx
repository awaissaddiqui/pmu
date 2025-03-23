// Input field component:
const FormInput = ({ name, label, type, options, formData, handleChange }) => {
    return (
        <label className="block text-sm font-semibold">
            {label}
            {type === "radio" ? (
                <div className="flex space-x-4 mt-1">
                    {options.map((option) => (
                        <label key={option} className="mr-4">
                            <input
                                type="radio"
                                name={name}
                                value={option.toLowerCase()}
                                checked={formData[name] === option.toLowerCase()}
                                onChange={handleChange}
                                className="mr-1"
                            />
                            {option}
                        </label>
                    ))}
                </div>
            ) : type === "textarea" ? (
                <textarea
                    name={name}
                    className="w-full p-2 border rounded-md"
                    value={formData[name] || ""}
                    onChange={handleChange}
                    required
                    rows={4} // Adjust rows as needed
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    className="w-full p-2 border rounded-md"
                    value={formData[name] || ""}
                    onChange={handleChange}
                    required
                />
            )}
        </label>
    );
};

export default FormInput;
