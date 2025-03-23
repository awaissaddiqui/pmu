import { createContext, useContext, useReducer } from "react";
import { db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";

// Create the context
const UndergraduateFormContext = createContext();

// Reducer function to handle form state updates
const undergraduateFormReducer = (state, action) => {
    // console.log(action);
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
export const UndergraduateFormProvider = ({ children }) => {
    const [formData, dispatch] = useReducer(undergraduateFormReducer, {});

    // Submit function
    const submitForm = async () => {
        try {
            console.log(formData);
            const docRef = doc(db, "undergraduate-forms", formData.email);
            await setDoc(docRef, formData);
        } catch (error) {
            console.error(error);
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

