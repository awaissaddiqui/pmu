import { createContext, useReducer, useContext } from "react";
import { db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";


const GraduateNationalFormContext = createContext();

const graduateNationalFormReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_FIELD":
            return { ...state, [action.field]: action.value };
        case "RESET_FORM":
            return {}; // Reset form after successful submission
        default:
            return state;
    }
}

export const GraduateNationalFormProvider = ({ children }) => {
    const [formData, dispatch] = useReducer(graduateNationalFormReducer, {});

    const submitForm = async () => {
        try {
            // console.log(formData);
            const docRef = await doc(db, "national-graduate-form", formData.email);
            await setDoc(docRef, formData);
            // dispatch({ type: "RESET_FORM" });
            alert("Form submitted successfully");
            // national-graduate-form

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