// npm install all 

import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

// Configure AWS SDK with your credentials
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Configure Multer storage

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Handle file upload

export const uploadVehicleImage = (req, res) => {

    upload.single('file')(req, res, (err) => {

        if (err) {
            console.error('Error occurred while uploading file:', err);
            return res.status(500).json({ error: 'Failed to upload file.' });
        }

        const file = req.file;
        const { originalname } = req.file;
        const folder = process.env.FOLDER_NAME_EVALUTION;
        const key = `${folder}/${originalname}`;

        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
        };

        const uploadCommand = new PutObjectCommand(params);

        s3Client
            .send(uploadCommand)
            .then(() => {
                const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
                console.log('File uploaded successfully:', fileUrl);
                res.status(200).json({ message: 'File uploaded successfully.', fileUrl });
            })
            .catch((err) => {
                console.error('Error occurred while uploading to S3:', err);
                res.status(500).json({ error: 'Failed to upload file.' });
            });

    });

};