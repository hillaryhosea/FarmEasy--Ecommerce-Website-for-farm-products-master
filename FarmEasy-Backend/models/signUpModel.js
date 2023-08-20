import mongoose from 'mongoose';

const signupSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique:true },
        password: { type: String, required: true },
        role:{type: String, required: true}
        
    },
    {
        timestamps: true,
    }
);
const Signup = mongoose.model('Signup', signupSchema);
export default Signup;
