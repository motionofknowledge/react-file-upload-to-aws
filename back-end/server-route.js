import express from 'express'
import { uploadFile } from '../server-upload-api.js';
const router = express.Router();

//File Upload

router.post('/upload-image', uploadFile);

//File Upload