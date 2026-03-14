import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import StudentRouter from './routes/StudentRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import connectDB from './config/mongodb.js';
import path from 'path';

import { fileURLToPath } from 'url';

// ES Module __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



dotenv.config()
const app = express();
connectCloudinary()
connectDB()

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const frontendPath = path.join(__dirname, "pannel-student/dist");
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

app.use('/api/student', StudentRouter)


app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`)
})