import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import StudentRouter from './routes/StudentRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import connectDB from './config/mongodb.js';



dotenv.config()
const app = express();
connectCloudinary()
connectDB()

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())



app.use('/api/student', StudentRouter)


app.listen(PORT,  "0.0.0.0", () => {
    console.log(`Server is Running on ${PORT}`)
})
