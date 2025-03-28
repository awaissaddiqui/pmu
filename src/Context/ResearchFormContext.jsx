import { createContext, useContext, useReducer } from "react";
import { db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";

// Create the context
const ResearchFormContext = createContext();

// Reducer function to handle form state updates
const researchFormReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_FIELD":
            return { ...state, [action.field]: action.value };
        case "RESET_FORM":
            return {}; // Reset form after successful submission
        default:
            return state;
    }
};

// Provider component
export const ResearchFormProvider = ({ children }) => {
    const [formData, dispatch] = useReducer(researchFormReducer, {});

    // Submit function
    const submitForm = async () => {
        try {
            // Check if the form is empty or any required field is missing
            if (!formData || Object.keys(formData).length === 0 || Object.values(formData).some(value => !value)) {
                alert("Please fill out the form before submitting.");
                return;
            }

            // Ensure email exists before proceeding
            if (!formData.pi_email) {
                alert("Primary Investigator Email is required.");
                return;
            }

            // Submit data to Firestore
            const docRef = doc(db, "research-forms", formData.pi_email);
            await setDoc(docRef, formData);

            // Reset form after submission
            dispatch({ type: "RESET_FORM" });

            alert("Form Submitted Successfully");
            navigate('/');
        } catch (error) {
            console.error("Error adding document:", error);
            alert("An error occurred while submitting the form. Please try again.");
        }
    };

    // const submitForm = async () => {
    //     try {
    //         if (formData.length === 0) {
    //             alert("Please fill out the form before submitting.");
    //             return;
    //         }
    //         const docRef = doc(db, "research-forms", formData.pi_email);
    //         await setDoc(docRef, formData);
    //         dispatch({ type: "RESET_FORM" });
    //     } catch (error) {
    //         console.error("Error adding document:", error);
    //     }
    // };

    return (
        <ResearchFormContext.Provider value={{ formData, dispatch, submitForm }}>
            {children}
        </ResearchFormContext.Provider>
    );
};

// Custom hook to use the ResearchFormContext
export const useResearchForm = () => useContext(ResearchFormContext);
