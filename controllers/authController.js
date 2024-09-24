import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Signup endpoint
export const registerUser = async (req, res) => {
    const {name, email, password, role} = req.body;
    try {
        
        if(!name || !email || !password || !role){
            return res.status(400).json({message: `Please provide all fields`});
        }
  
        //check if the user already exists
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: `User already exists`});
        }
        //create a new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({name, email, password: hashedPassword, role});
        await user.save();
        res.status(201).json({message: `Your account has been created successfully!`});
        console.log(`User created successfully!`);
    } catch(error) {
        console.log(error);
        res.status(500).json({error: `Server Error ${error.message}`});

    }
};

//login endpoint
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

        //create a jwt token and send it to the user
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h'});
        res.status(200).json({token});
        console.log(`Logged in Successfully!`);
    }catch(error) {
        console.error(error.message);
        res.status(500).json({message: `Server Error ${error.message}`});
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
};

//endpoint to get user details
export const getProfile = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);
        if(!user) {
            return res.status(400).json({message: `User not found`});
        }
        res.status(200).json({profile: user});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: `Server Error ${error.message}`});

    }
};

//endpoint to get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        if(!users) {
            return res.status(400).json({message: `No users found`});
        }
        res.status(200).json({users});
    } catch( error ) {
        console.error(error.message);
        res.status(500).json({message: `Server Error ${error.message}`});
    }
}