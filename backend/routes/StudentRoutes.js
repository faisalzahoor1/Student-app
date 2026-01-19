import express from 'express'
import { StudentLogin, AddStudent, getData } from '../controllers/StudentController.js'
import StudentAuth from '../middlewares/StudentAuth.js'
import upload from '../middlewares/multer.js'
const StudentRouter = express.Router()

StudentRouter.post('/login', StudentLogin)
StudentRouter.post('/add-student', StudentAuth, upload.fields([
    { name: "stImg", maxCount: 1 },
    { name: "pdf", maxCount: 1 }
]), AddStudent)
StudentRouter.get('/get-student', StudentAuth, getData)


export default StudentRouter