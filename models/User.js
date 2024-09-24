import mongoose from 'mongoose';
import  isEmail  from 'validator/lib/isEmail.js';
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, `Please provide  a name!`],
    },
    email: {
        type: String,
        required: [true, `Please provide an email!`],
        unique: true,
        isLowercase: true,
        validate: [isEmail, `Please provide a valid email!`],

    },
    password: {
        type: String,
        required: [true, `Please provide a password!`],
        minlength: [6, `Password muse be at lest 4 characters long`],

    }
});

//fire a function before doc is saved to db
UserSchema.pre(`save`, async function(next) {
    console.log(`Just before saving the /* ${this} */`);
    next();
});

//fire a function after doc is saved to db
UserSchema.post(`save`, async function(doc, next) {
    console.log(`new user was created and saved /* ${doc} */`);
    next();
})
const User = mongoose.model(`clients`, UserSchema);
export default User;