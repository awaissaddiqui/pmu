import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../Firebase";
import { collection, doc, setDoc, query, where, getDocs, getDoc } from "firebase/firestore";
import { useAuth } from "./AuthProvider";

const FormProgressContext = createContext();

export const FormProgressProvider = ({ children }) => {
    const { user } = useAuth();
    const [formProgresses, setFormProgresses] = useState({});

    // Load all form progress for the user
    useEffect(() => {
        const fetchFormProgress = async () => {
            if (!user?.uid) return;

            try {
                const q = query(
                    collection(db, "form-progress"),
                    where("userId", "==", user.uid)
                );

                const querySnapshot = await getDocs(q);
                const progress = {};

                querySnapshot.forEach(doc => {
                    progress[doc.data().formType] = {
                        id: doc.id,
                        ...doc.data()
                    };
                });

                setFormProgresses(progress);
            } catch (error) {
                console.error("Error fetching form progress:", error);
            }
        };

        fetchFormProgress();
    }, [user]);

    // Save form progress
    const saveFormProgress = async (formType, formData) => {
        if (!user?.uid) return null;

        try {
            // Create a unique ID for the form progress
            const progressId = `${formType}_${user.uid}`;

            const formProgressData = {
                userId: user.uid,
                userEmail: user.email,
                formType,
                status: "in-progress",
                lastUpdated: new Date().toISOString(),
                startedAt: formProgresses[formType]?.startedAt || new Date().toISOString(),
                formData
            };

            // Save to Firestore
            await setDoc(doc(db, "form-progress", progressId), formProgressData);

            // Update local state
            setFormProgresses(prev => ({
                ...prev,
                [formType]: {
                    id: progressId,
                    ...formProgressData
                }
            }));

            return progressId;
        } catch (error) {
            console.error("Error saving form progress:", error);
            return null;
        }
    };

    // this should be get from the firebase firestore
    const getFormProgress = async (formKey) => {
        // const progress = formProgresses[formKey];
        // if (progress) {
        //     console.log("Found progress data:", progress);
        //     return progress.formData || {};
        // }
        const formProgressData = await getDoc(doc(db, "form-progress", formKey));
        if (formProgressData.exists()) {
            console.log("Found progress data:", formProgressData.data());
            return formProgressData.data().formData || {};
        }
        console.log("No progress found for key:", formKey);
        return {};
    };

    // Mark form as submitted
    const markFormAsSubmitted = async (formType) => {
        if (!user?.uid || !formProgresses[formType]) return false;

        try {
            const progressId = formProgresses[formType].id;
            await setDoc(doc(db, "form-progress", progressId),
                {
                    status: "submitted",
                    submittedAt: new Date().toISOString()
                },
                { merge: true }
            );

            // Update local state
            setFormProgresses(prev => ({
                ...prev,
                [formType]: {
                    ...prev[formType],
                    status: "submitted",
                    submittedAt: new Date().toISOString()
                }
            }));

            return true;
        } catch (error) {
            console.error("Error marking form as submitted:", error);
            return false;
        }
    };

    return (
        <FormProgressContext.Provider value={{
            formProgresses,
            saveFormProgress,
            getFormProgress,
            markFormAsSubmitted
        }}>
            {children}
        </FormProgressContext.Provider>
    );
};

export const useFormProgress = () => useContext(FormProgressContext);