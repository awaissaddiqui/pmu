import { createContext, useReducer, useContext, useEffect } from "react";
import { db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "./AuthProvider";

const GraduateNationalFormContext = createContext();

const graduateNationalFormReducer = (state, action) => {
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

export const GraduateNationalFormProvider = ({ children }) => {
    const { user } = useAuth(); // Get current authenticated user
    const userId = user?.uid;
    const userEmail = user?.email;
    // Load initial state from localStorage when component mounts
    const initialState = userId ?
        JSON.parse(localStorage.getItem(`graduate_national_form_${userId}`) || '{}') :
        {};

    const [formData, dispatch] = useReducer(graduateNationalFormReducer, initialState);

    // Save to localStorage whenever formData changes
    useEffect(() => {
        if (userId && Object.keys(formData).length > 0) {
            localStorage.setItem(`graduate_national_form_${userId}`, JSON.stringify(formData));
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

            const docRef = await doc(db, "national-graduate-form", formData.email || userEmail || userId);
            await setDoc(docRef, formWithUserInfo);
            // dispatch({ type: "RESET_FORM" });
            alert("Form submitted successfully");
            // national-graduate-form
            // if (userId) {
            //     localStorage.removeItem(`graduate_national_form_${userId}`);
            // }
            // dispatch({ type: "RESET_FORM" });

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <GraduateNationalFormContext.Provider value={{ formData, dispatch, submitForm }}>
            {children}
        </GraduateNationalFormContext.Provider>
    )
};
export const useGraduateNationalForm = () => useContext(GraduateNationalFormContext);