import React, { useState, useEffect, useRef } from 'react';
import { Paper, Button } from '@mui/material';
import { PictureOutlined } from '@ant-design/icons';
import { uploadFile } from '../front-end-file-upload-api'

function FileUpload() {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        // Handle file selection here
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleFileUpload = async () => {

        try {
            if (selectedFile) {

                //pass the selected file to the api

                const uploadedFileUrl = await uploadFile(selectedFile);

                // File successfully uploaded, and URL obtained
                console.log('File uploaded successfully. URL:', uploadedFileUrl);

            } else {
                console.log('No file selected');
            }
        } catch (error) {
            // Handle error in file upload
            console.error('Error uploading file:', error.message);
        }
    };

    const handleSubmit = () => {

        handleFileUpload()

        // Handle form submission
        console.log(formData);
        console.log('myfile', selectedFile)

    };

    return (
        <div>
            <div style={{ display: 'flex', marginTop: '20px', flexWrap: 'wrap' }}>
                <label htmlFor="file-input">
                    <Paper
                        elevation={3}
                        style={{
                            position: 'relative',
                            width: '200px',
                            height: '200px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        {selectedFile ? (
                            <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Selected"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <PictureOutlined style={{ fontSize: 60 }} />
                        )}
                        <Typography
                            variant="body2"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                margin: '5px',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                padding: '2px 5px',
                                borderRadius: '3px',
                            }}
                        >
                            Front Side Image
                        </Typography>
                    </Paper>
                </label>
                <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />

            </div>

            <Button variant="contained" onClick={handleSubmit}>
                Upload File
            </Button>

        </div>
    )
}

export default FileUpload