

import express from 'express'
import StudentLogin  from '../controllers/StudentController.js'
 
const StudentRouter = express.Router()

StudentRouter.post('/login', StudentLogin)

export default StudentRouter