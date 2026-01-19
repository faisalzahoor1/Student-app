import jwt from 'jsonwebtoken'


const studentAuth = async (req, res, next) => {

    try {
        const { token } = req.headers
        if (!token) {
            return res.json({ success: false, message: "Unauthorized Login Dont have token" })
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET)

        if (token_decode !== process.env.ADMIN_EMAIL) {
            return res.json({success:false, message:"Unauthorized Login"})
        }
        next()
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}
export default studentAuth