import bcrypt from 'bcrypt'
import validator from 'validator'
import 'dotenv/config'
import jwt from 'jsonwebtoken'




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


export default StudentLogin;