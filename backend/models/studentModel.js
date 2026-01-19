import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
    stImg: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: Object, required: true },
    cgpa: { type: Number, required: true },
    pdf: { type: String, required: true },
}, { autoIndex: true });

const studentModel = mongoose.model("student", studentSchema)

export default studentModel