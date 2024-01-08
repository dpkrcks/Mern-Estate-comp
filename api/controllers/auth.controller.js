import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js';
import  jwt  from 'jsonwebtoken';

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

export const signIn = async (req,res,next)=>{
    const {email , password} = req.body;
    try {
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404 , "No user is registered with this email."));
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandler(401,"Invalid credentials."));
        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET);
        const {password : pass ,...rest} = validUser._doc;
        res.cookie('access_token',token,{httpOnly:true})
           .status(200)
           .json(rest);

    } catch (error) {
        next(error);
    }
    
};

export const google = async (req,res,next)=>{
try {
    const user = await User.findOne({email : req.body.email});
    if(user){
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        const {password : pass , ...rest} = user._doc;
        res.cookie('access_token',token,{httpOnly : true})
           .status(200)
           .json(rest);
    }else{
        const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(18).slice(-4);
        const hashedpassword = bcryptjs.hashSync(generatedPassword,10);

        const googleUser = new User({
            username : req.body.name.split(" ").join("").toLowerCase()
                       + Math.random().toString(36).slice(-4),
            email : req.body.email,
            password : hashedpassword,
            avatar : req.body.photo,
        });

        await googleUser.save();
        const token = jwt.sign({id:googleUser._id},process.env.JWT_SECRET);
        const {password : pass , ...rest} = googleUser._doc;

        res.cookie('access_token',token,{htttpOnly : true})
           .status(200)
           .json(rest);
    }

} catch (error) {
    next(error);
}
};

export const signOut = async (req,res,next)=>{
    try {
        res.clearCookie('access_token');
        res.status(200).json('User is logged out.');
    } catch (error) {
        next(error);
    }
};