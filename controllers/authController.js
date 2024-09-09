import User from '../models/User.js';
import bcrypt from 'bcryptjs';

//register controller to handle user registration
export const registerUser = async (req, res) => {
    
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message: `Please provide all fields`});
        }
       /*  console.log(`Received data: ${JSON.stringify(req.body)}`) */
        //check if the user already exists
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: `User already exists`});
        }
        //create a new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const user = new User({name, email, password: hashedPassword});
        await user.save();
        res.status(201).json({message: `Your account has been created successfully!`});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: `Server Error`});

    }
};

//login controller
export const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;
        console.log(`Received data: ${JSON.stringify(req.body)}`);
        if(!email || !password) {
            return res.status(400).json({message: `Please provide all fields`});
        };
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: `Invalid credentials`});
        };
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: `Invalid credentials`});
        }
        res.status(200).json({message: `You have successfully logged in!`});
    }catch(error) {
        console.error(error);
        res.status(500).json({message: `Server Error`});
    }
};

//delete user controller
export const deleteUser = async(req, res) => {
    try {
        const {email} = req.body;
        if(!email){
            return res.status(400).json({message: `Please provide an email`});
        };
        const user = await User.findOneAndDelete({email});
        if(!user){
            return res.status(400).json({message: `User not found`});
        }
        res.status(200).json({message: `User deleted successfully!`});
    } catch (error) {
        res.status(500).json({message: `Server Error ${error.message}`});
    }
}