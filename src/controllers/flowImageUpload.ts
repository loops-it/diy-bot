import { Request, Response } from 'express';
import { put } from '@vercel/blob';
import multer from 'multer';

// Initialize multer middleware
const uploadFile = multer().single('photo');

export const upload = (req: Request, res: Response, next: Function) => {
    uploadFile(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        try {
            const file = req.file;
            if (!file) {
                return res.status(400).send('No file uploaded');
            }

            // Now you can process the uploaded file
            const blob = await put(file.originalname, file.buffer, { access: 'public',token:"vercel_blob_rw_volF03LPrrgsOWs6_0eDNaKdulNr9Zi5YsAvAdyXAmI5RZg" });
            console.log(blob)
            // res.render('uploadedFilePreview', { filename: file.originalname, blobUrl: blob.url });
        } catch (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
    });
};