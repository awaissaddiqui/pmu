import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "./AuthProvider";
import { useFormProgress } from "./FormProgressContext";

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
            return {};
        default:
            return state;
    }
};

// Provider component
export const ResearchFormProvider = ({ children }) => {
    const { user } = useAuth();
    const userId = user?.uid;
    const userEmail = user?.email;
    const { saveFormProgress, getFormProgress, markFormAsSubmitted } = useFormProgress();

    const [formData, dispatch] = useReducer(researchFormReducer, {});
    const [isLoading, setIsLoading] = useState(true);
    const [saveStatus, setSaveStatus] = useState(""); // 'saving', 'saved', 'error'

    // Load saved progress from Firestore on mount
    useEffect(() => {
        if (userId) {
            const loadData = async () => {
                setIsLoading(true);
                const formKey = `research_${userId}`;
                const savedData = await getFormProgress(formKey);
                if (savedData && Object.keys(savedData).length > 0) {
                    dispatch({ type: "SET_FORM_DATA", data: savedData });
                }
                setIsLoading(false);
            };
            loadData();
        }
    }, [userId, getFormProgress]);

    // Save function (call this from your Save button)
    const saveForm = async () => {
        if (!userId) return false;
        try {
            setSaveStatus("saving");
            await saveFormProgress("research", formData);
            setSaveStatus("saved");
            setTimeout(() => setSaveStatus(""), 3000);
            return true;
        } catch (error) {
            setSaveStatus("error");
            setTimeout(() => setSaveStatus(""), 3000);
            return false;
        }
    };

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

            // Mark as submitted in progress
            await markFormAsSubmitted("research");

            alert("Form Submitted Successfully");
            // Optionally reset form after submit
            // dispatch({ type: "RESET_FORM" });
        } catch (error) {
            console.error(error);
            alert("An error occurred while submitting the form. Please try again.");
        }
    };

    return (
        <ResearchFormContext.Provider value={{
            formData,
            dispatch,
            saveForm,
            submitForm,
            isLoading,
            saveStatus
        }}>
            {children}
        </ResearchFormContext.Provider>
    );
};

// Custom hook to use the ResearchFormContext
export const useResearchForm = () => useContext(ResearchFormContext);