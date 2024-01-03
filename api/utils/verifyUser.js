import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken';

export const verifyUser = (req,res,next)=>{
    try {
        const token = req.cookies.access_token;

        if(!token) return next(new errorHandler("401","Unauthorized"));

        jwt.verify(token,process.env.JWT_SECRET,(error,user)=>{
           if(error) return next(new errorHandler("403","forbidden"));
           req.user = user;
           next();
        });

    } catch (error) {
        next(error);
    }
};