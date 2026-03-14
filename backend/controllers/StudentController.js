import bcrypt from 'bcrypt'
import validator from 'validator'
import { v2 as cloudinary } from 'cloudinary'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import studentModel from '../models/studentModel.js'




const StudentLogin = async (req, res) => {

    try {
        const { Email, Password } = req.body

        if (Email === process.env.ADMIN_EMAIL && Password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(Email, process.env.JWT_SECRET)

            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "invalid credentials" })
        }

    } catch (error) {
        console.log(`This is the error in Student Login Controller ${error}`)
    }

}
const AddStudent = async (req, res) => {
    try {
        const { name, email, password, contact, address, cgpa } = req.body

        const stImg = req.files.stImg ? req.files.stImg[0] : null;
        const pdf = req.files.pdf ? req.files.pdf[0] : null;

        if (!stImg || !pdf) {
            return res.json({ success: false, message: "Image or PDF not uploaded" });
        }

        if (!name || !email || !password || !contact || !address || !cgpa) {
            return res.json({ success: false, message: "Incomplete Credentials" })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid Email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Weak Password" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)


        const imageUploaded = await cloudinary.uploader.upload(stImg.path, { resource_type: "image" })
        const imageUrl = imageUploaded.secure_url


        const pdfUploaded = await cloudinary.uploader.upload(pdf.path, {
            resource_type: "raw",
            folder: "student_pdfs",
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            access_mode: "public"  // ✅ important
        });

        const pdfUrl = pdfUploaded.secure_url


        const studentData = {
            stImg: imageUrl,
            name,
            email,
            password: hashedpassword,
            contact,
            address: JSON.parse(address),
            cgpa,
            pdf: pdfUrl
        }


        const newStudent = new studentModel(studentData)
        await newStudent.save()

        res.json({ success: true, message: "Student Added Successfully" })


    } catch (error) {
        if (error.code === 11000) {
            return res.json({ success: false, message: "Email already exists!" });
        }
        console.log(`This is the error in Add Student Controller ${error}`)
        return res.json({ success: false, message: "Email already exists" });
    }
}

const getData = async (req, res) => {
    try {
        console.log("hiiii")
        const email = req.query.email
        console.log("helloooo")
        const studentData = await studentModel.findOne({ email })
        console.log("helloooo1")
        if (!studentData) {
            return res.json({ success: false, message: "Not a Student" })
        }
        console.log("helloooo")
        res.json({ success: true, studentData })

    } catch (error) {
        console.log(`This is the error in Student Get Data Controller ${error}`)
    }
}
const updateStudent = async (req, res) => {
    try {

        const { name, contact, cgpa, address, email } = req.body

        const student = await studentModel.findOne({ email })

        if (!student) {
            return res.json({ success: false, message: "Student not found" })
        }

        const updatedStudent = await studentModel.findOneAndUpdate(
            { email },
            {
                name,
                contact,
                cgpa,
                address: JSON.parse(address)
            },
            { new: true }
        )

        res.json({
            success: true,
            message: "Student Updated Successfully",
            studentData: updatedStudent
        })

    } catch (error) {
        console.log(`Error in Update Student ${error}`)
        res.json({ success: false, message: "Update failed" })
    }
}

export { StudentLogin, AddStudent, getData, updateStudent };