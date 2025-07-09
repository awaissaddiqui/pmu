import { createContext, useReducer, useContext, useEffect } from "react";
import { db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "./AuthProvider";

const PHDInternationalFormContext = createContext();

const PHDInternationalFormReducer = (state, action) => {
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
}

export const PHDInternationalFormProvider = ({ children }) => {
    const { user } = useAuth(); // Get current authenticated user
    const userId = user?.uid;
    const userEmail = user?.email;
    // Load initial state from localStorage when component mounts
    const initialState = userId ?
        JSON.parse(localStorage.getItem(`phd_international_form_${userId}`) || '{}') :
        {};

    const [formData, dispatch] = useReducer(PHDInternationalFormReducer, initialState);
    // Save to localStorage whenever formData changes
    useEffect(() => {
        if (userId && Object.keys(formData).length > 0) {
            localStorage.setItem(`phd_international_form_${userId}`, JSON.stringify(formData));
        }
    }, [formData, userId]);

    const submitForm = async () => {
        try {
            // console.log(formData);
            const formWithUserInfo = {
                ...formData,
                userId: userId || '',
                userEmail: userEmail || '',
                submittedAt: new Date().toISOString()
            };
            const docRef = await doc(db, "phd-international", formData.email);
            await setDoc(docRef, formWithUserInfo);
            // dispatch({ type: "RESET_FORM" });
            alert("Form submitted successfully");
            // national-graduate-form

            // if (userId) {
            //     localStorage.removeItem(`phd_international_form_${userId}`);
            // }
            // dispatch({ type: "RESET_FORM" });

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <PHDInternationalFormContext.Provider value={{ formData, dispatch, submitForm }}>
            {children}
        </PHDInternationalFormContext.Provider>
    )
};
export const usePHDInternationalForm = () => useContext(PHDInternationalFormContext);