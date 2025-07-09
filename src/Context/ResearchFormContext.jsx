import { createContext, useContext, useEffect, useReducer } from "react";
import { db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "./AuthProvider";
// Create the context
const ResearchFormContext = createContext();


// Reducer function to handle form state updates
const researchFormReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_FIELD":
            return { ...state, [action.field]: action.value };
        case "SET_FORM_DATA":
            return { ...action.data };
        case "RESET_FORM":
            return {}; // Reset form after successful submission
        default:
            return state;
    }
};

// Provider component
export const ResearchFormProvider = ({ children }) => {
    const { user } = useAuth(); // Get current authenticated user
    const userId = user?.uid;
    const userEmail = user?.email;
    // Load initial state from localStorage when component mounts
    const initialState = userId ?
        JSON.parse(localStorage.getItem(`research_form_${userId}`) || '{}') :
        {};
    const [formData, dispatch] = useReducer(researchFormReducer, initialState);

    // Save to localStorage whenever formData changes
    useEffect(() => {
        if (userId && Object.keys(formData).length > 0) {
            localStorage.setItem(`research_form_${userId}`, JSON.stringify(formData));
        }
    }, [formData, userId]);

    // Submit function
    const submitForm = async () => {
        try {
            // Check if the form is empty or any required field is missing
            if (!formData || Object.keys(formData).length === 0 || Object.values(formData).some(value => !value)) {
                alert("❌ Please fill out all the form fields before submitting.");
                return;
            }

            // Ensure email exists before proceeding
            if (!formData.pi_email) {
                alert("Primary Investigator Email is required.");
                return;
            }

            // Add user information to the form data
            const formWithUserInfo = {
                ...formData,
                userId: userId || '',
                userEmail: userEmail || '',
                submittedAt: new Date().toISOString()
            };

            const docId = formData.pi_email || userEmail;
            const docRef = doc(db, "research-forms", docId);
            await setDoc(docRef, formWithUserInfo);

            alert("Form Submitted Successfully");

            // if (userId) {
            //     localStorage.removeItem(`research_form_${userId}`);
            // }
            // dispatch({ type: "RESET_FORM" });

        } catch (error) {
            console.error(error);
            alert("An error occurred while submitting the form. Please try again.");
        }
    };

    return (
        <ResearchFormContext.Provider value={{ formData, dispatch, submitForm }}>
            {children}
        </ResearchFormContext.Provider>
    );
};

// Custom hook to use the ResearchFormContext
export const useResearchForm = () => useContext(ResearchFormContext);
