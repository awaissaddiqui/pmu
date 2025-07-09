import { useState } from 'react';
import { supabaseDb } from '../Firebase';

export const useFileUpload = (bucketName) => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({});

    const uploadFile = async (file, email, fieldName, onSuccess, onError) => {
        if (!file) return;

        setIsUploading(true);
        document.body.style.cursor = "wait";

        try {
            const timestamp = Date.now();
            const uniqueFilePath = `${email}/${fieldName}_${timestamp}`;

            // Upload the file to Supabase
            const { data, error } = await supabaseDb.storage
                .from(bucketName)
                .upload(uniqueFilePath, file);

            if (error) throw error;

            // Get the public URL of the uploaded file
            const downloadURL = await supabaseDb.storage
                .from(bucketName)
                .getPublicUrl(uniqueFilePath);

            // Mark this field as uploaded
            setUploadProgress(prev => ({ ...prev, [fieldName]: true }));

            // Call success callback with the URL
            if (onSuccess) {
                onSuccess(downloadURL.data.publicUrl, fieldName);
            }

            return downloadURL.data.publicUrl;

        } catch (error) {
            console.error("Storage Error:", error);

            // Mark this field as failed
            setUploadProgress(prev => ({ ...prev, [fieldName]: false }));

            if (onError) {
                onError(error, fieldName);
            }

            throw error;
        } finally {
            setIsUploading(false);
            document.body.style.cursor = "default";
        }
    };

    const resetProgress = () => {
        setUploadProgress({});
    };

    const isFieldUploaded = (fieldName) => {
        return uploadProgress[fieldName] === true;
    };

    const hasAnyUploads = () => {
        return Object.values(uploadProgress).some(status => status === true);
    };

    return {
        uploadFile,
        isUploading,
        uploadProgress,
        resetProgress,
        isFieldUploaded,
        hasAnyUploads
    };
};