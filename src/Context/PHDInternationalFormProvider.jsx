import { createContext, useReducer, useContext, useEffect, useState } from "react";
import { db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "./AuthProvider";
import { useFormProgress } from "./FormProgressContext";

const PHDInternationalFormContext = createContext();

const PHDInternationalFormReducer = (state, action) => {
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

export const PHDInternationalFormProvider = ({ children }) => {
    const { user } = useAuth();
    const userId = user?.uid;
    const userEmail = user?.email;
    const { saveFormProgress, getFormProgress, markFormAsSubmitted } = useFormProgress();

    const [formData, dispatch] = useReducer(PHDInternationalFormReducer, {});
    const [isLoading, setIsLoading] = useState(true);
    const [saveStatus, setSaveStatus] = useState(""); // 'saving', 'saved', 'error'

    // Load saved progress from Firestore on mount
    useEffect(() => {
        if (userId) {
            const loadData = async () => {
                setIsLoading(true);
                const formKey = `phd_${userId}`;
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
            await saveFormProgress("phd", formData);
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
            const formWithUserInfo = {
                ...formData,
                userId: userId || '',
                userEmail: userEmail || '',
                submittedAt: new Date().toISOString()
            };
            const docRef = doc(db, "phd-international", formData.email || userEmail || userId);
            await setDoc(docRef, formWithUserInfo);

            // Mark as submitted in progress
            await markFormAsSubmitted("phd");

            alert("Form submitted successfully");
            dispatch({ type: "RESET_FORM" });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PHDInternationalFormContext.Provider value={{
            formData,
            dispatch,
            saveForm,
            submitForm,
            isLoading,
            saveStatus
        }}>
            {children}
        </PHDInternationalFormContext.Provider>
    );
};

export const usePHDInternationalForm = () => useContext(PHDInternationalFormContext);