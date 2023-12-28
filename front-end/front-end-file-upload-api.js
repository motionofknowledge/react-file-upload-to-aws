import axios from 'axios'
const URL = "http://localhost:8000"

export const uploadFile = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${URL}/upload-image`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload file');
        }

        const data = await response.json();
        return data.fileUrl; // Assuming the URL of the uploaded file is returned in the response
    } catch (error) {
        throw new Error(error.message);
    }
};