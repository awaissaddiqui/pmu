import { createContext, useReducer, useContext } from "react";
import { db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";


const PHDInternationalFormContext = createContext();

const PHDInternationalFormReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_FIELD":
            return { ...state, [action.field]: action.value };
        case "RESET_FORM":
            return {}; // Reset form after successful submission
        default:
            return state;
    }
}

export const PHDInternationalFormProvider = ({ children }) => {
    const [formData, dispatch] = useReducer(PHDInternationalFormReducer, {});

    const submitForm = async () => {
        try {
            console.log(formData);
            const docRef = await doc(db, "phd-international", formData.email);
            await setDoc(docRef, formData);
            // dispatch({ type: "RESET_FORM" });
            alert("Form submitted successfully");
            // national-graduate-form

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