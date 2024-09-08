import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, `Please provide  a name!`],
    },
    email: {
        type: String,
        required: [true, `Please provide an email!`],
    },
    password: {
        type: String,
        required: [true, `Please provide a password!`],
    }
});
const User = mongoose.model(`JA-TechStore-User`, UserSchema);
export default User;