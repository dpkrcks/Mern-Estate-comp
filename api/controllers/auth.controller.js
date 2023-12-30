import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js';

export const postUser =async (req,res,next)=>{
    const {username , email , password} = req.body;
    const hashPassword = bcryptjs.hashSync(password);

    const newUser = new User({username , email , password : hashPassword});
    
    try {
        await newUser.save();
        res.status(200).json(newUser);

    } catch (error) {
       next(error);
       //next(errorHandler(550,"Custom Error"));
    }
};