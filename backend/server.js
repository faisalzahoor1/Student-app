import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import StudentRouter from './routes/StudentRoutes.js';



dotenv.config()
const app = express();

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())



app.use('/api/student', StudentRouter)


app.listen(PORT, ()=>{
    console.log(`Server is Running on ${PORT}`)
})