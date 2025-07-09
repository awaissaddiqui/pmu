import { createContext, useContext, useReducer, useEffect } from "react";
import { db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "./AuthProvider";

// Create the context
const UndergraduateFormContext = createContext();

// Reducer function to handle form state updates
const undergraduateFormReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_FIELD":
            return { ...state, [action.field]: action.value };
        case "SET_FORM_DATA":
            return { ...action.data };
        case "RESET_FORM":
            return {};
        default:
            return state;
    }
};

// Provider component
export const UndergraduateFormProvider = ({ children }) => {
    const { user } = useAuth(); // Get current authenticated user
    const userId = user?.uid;
    const userEmail = user?.email;

    // Load initial state from localStorage when component mounts
    const initialState = userId ?
        JSON.parse(localStorage.getItem(`undergraduate_form_${userId}`) || '{}') :
        {};

    const [formData, dispatch] = useReducer(undergraduateFormReducer, initialState);

    // Save to localStorage whenever formData changes
    useEffect(() => {
        if (userId && Object.keys(formData).length > 0) {
            localStorage.setItem(`undergraduate_form_${userId}`, JSON.stringify(formData));
        }
    }, [formData, userId]);

    // Submit function
    const submitForm = async () => {
        try {
            if (!formData || Object.keys(formData).length === 0 || Object.values(formData).some(value => !value)) {
                alert("❌ Please fill out all the form fields before submitting.");
                return;
            }

            // Add user information to the form data
            const formWithUserInfo = {
                ...formData,
                userId: userId || '',
                userEmail: userEmail || '',
                submittedAt: new Date().toISOString()
            };

            // Save to Firestore using the document ID based on user email or form email
            const docId = formData.email || userEmail;
            const docRef = doc(db, "undergraduate-forms", docId);
            await setDoc(docRef, formWithUserInfo);

            alert("Form Submitted Successfully");

            // Clear localStorage after successful submission
            // if (userId) {
            //     localStorage.removeItem(`undergraduate_form_${userId}`);
            // }

            // dispatch({ type: "RESET_FORM" });
        } catch (error) {
            console.error(error);
            alert("An error occurred while submitting the form.");
        }
    };

    return (
        <UndergraduateFormContext.Provider value={{ formData, dispatch, submitForm }}>
            {children}
        </UndergraduateFormContext.Provider>
    );
};

// Custom hook to use the ResearchFormContext
export const useUndergraduateForm = () => useContext(UndergraduateFormContext);