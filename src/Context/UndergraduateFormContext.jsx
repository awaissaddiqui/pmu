import { createContext, useContext, useReducer, useEffect, useState } from "react";
import { db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "./AuthProvider";
import { useFormProgress } from "./FormProgressContext";

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
    const { saveFormProgress, getFormProgress, markFormAsSubmitted } = useFormProgress()
    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const userId = user?.uid;
    const userEmail = user?.email;



    const [formData, dispatch] = useReducer(undergraduateFormReducer);
    const [saveStatus, setSaveStatus] = useState(""); // 'saving', 'saved', 'error'
    useEffect(() => {
        if (userId) {
            const loadData = async () => {
                const formKey = `undergraduate_${userId}`;
                const updatedData = await getFormProgress(formKey); // ✅ Await the Promise!
                if (updatedData && Object.keys(updatedData).length > 0) {
                    console.log("Setting form data:", updatedData);
                    dispatch({ type: "SET_FORM_DATA", data: updatedData });
                } else {
                    console.log("No existing data found, starting with empty form");
                }
                setIsLoading(false);
            };
            loadData();
        }
    }, [userId, getFormProgress]);

    // Save function that will be called by the Save button
    const saveForm = async () => {
        if (!userId) return false;

        try {
            setSaveStatus("saving");
            // console.log("Saving form data:", formData);

            // Save with user ID appended to match Firebase structure
            const formKey = `undergraduate`;
            await saveFormProgress(formKey, formData);

            setSaveStatus("saved");
            setTimeout(() => setSaveStatus(""), 3000);
            return true;
        } catch (error) {
            console.error("Error saving form:", error);
            setSaveStatus("error");
            setTimeout(() => setSaveStatus(""), 3000);
            return false;
        }
    };

    // Submit function
    const submitForm = async () => {
        try {
            if (!user?.uid) {
                alert("You must be logged in to submit the form.");
                return false;
            }

            setSaveStatus("saving");

            // Add user information to the form data
            const formWithUserInfo = {
                ...formData,
                userId: user.uid,
                userEmail: user.email,
                submittedAt: new Date().toISOString()
            };

            // Save to final form collection
            const docRef = doc(db, "undergraduate-forms", user.email);
            await setDoc(docRef, formWithUserInfo);

            // Mark the form as submitted in form-progress
            await markFormAsSubmitted("undergraduate");

            setSaveStatus("saved");
            setTimeout(() => setSaveStatus(""), 3000);

            alert("Form submitted successfully!");
            dispatch({ type: "RESET_FORM" });
            return true;
        } catch (error) {
            console.error("Error submitting form:", error);
            setSaveStatus("error");
            alert("An error occurred while submitting the form.");
            return false;
        }
    };

    return (
        <UndergraduateFormContext.Provider value={{
            formData,
            dispatch,
            saveForm,
            submitForm,
            isLoading,
            saveStatus
        }}>
            {children}
        </UndergraduateFormContext.Provider>
    );
};

// Custom hook to use the ResearchFormContext
export const useUndergraduateForm = () => useContext(UndergraduateFormContext);