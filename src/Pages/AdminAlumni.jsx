import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase";
import { supabaseDb } from "../Firebase";

const AdminAlumni = ({ closeModal }) => {
    const [formData, setFormData] = useState({
        name: "",
        title: "",
        image: "",
        description: ""
    });

    const [loading, setLoading] = useState(false);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileName = `${Date.now()}_${file.name}`;
            const filePath = `alumni/${fileName}`; // Define the storage path
            try {
                setLoading(true);
                const { data, error } = supabaseDb.storage.from("alumni").upload(filePath, file);
                if (error) throw error;
                const downloadURL = supabaseDb.storage.from("alumni").getPublicUrl(filePath);
                console.log(downloadURL.data.publicUrl);
                setFormData({ ...formData, image: downloadURL.data.publicUrl });
                alert("Image uploaded successfully!");
                setLoading(false);
            } catch (error) {
                alert("Error uploading image. Please try again.");
                console.error("Error uploading image:", error);
            }
        }
        return;
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.title || !formData.image || !formData.description) {
            alert("Please fill all fields before submitting.");
            return;
        }

        setLoading(true);

        try {
            await addDoc(collection(db, "pmu-alumni"), formData);
            alert("Alumni added successfully!");
            setFormData({ name: "", title: "", image: "", description: "" });

            closeModal(); // ✅ Close modal after success
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Error saving data. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-center text-gray-800">Add Alumni</h2>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-gray-700 font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="Alumni Name"
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        placeholder="position, company, etc."
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium" htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        rows="4"
                        placeholder="Write description here..."
                    ></textarea>
                </div>
                <div className="w-full">
                    <label className="block text-gray-700 font-medium mb-2">Upload Image</label>

                    {/* Hidden File Input */}
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        id="fileInput"
                        onChange={handleImageUpload}
                        className="hidden"
                    />

                    {/* Custom File Upload Button */}
                    <label
                        htmlFor="fileInput"
                        className="w-full flex items-center justify-center gap-2 cursor-pointer p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                    >
                        📤 Upload Image
                    </label>

                    {/* Show selected file name */}
                    {formData.image && (
                        <p className="mt-2 text-sm text-gray-600">
                            Image uploaded for : <span className="font-medium">{formData.name}</span>
                        </p>
                    )}
                </div>


                <div className="flex justify-end">
                    {
                        loading ? (
                            <button type="button" className="bg-gray-400 w-full text-white px-6 py-2 rounded-lg cursor-not-allowed">
                                Saving...
                            </button>
                        ) : (
                            <button type="submit" className="bg-primary w-full text-white px-6 py-2 rounded-lg hover:bg-secondary">
                                Add Alumni
                            </button>
                        )
                    }
                </div>
            </form>
        </div>
    );
};

export default AdminAlumni;