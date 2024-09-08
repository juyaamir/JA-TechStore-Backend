import User from '../models/User.js';
import bcrypt from 'bcryptjs';

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
}