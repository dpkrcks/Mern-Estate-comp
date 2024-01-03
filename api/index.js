import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.route.js'

dotenv.config();

mongoose.connect(process.env.CONNECTION_URL)
 .then(()=>{
    console.log("MongoDb is connected sucessfully.");
 }).catch((err)=>{
    console.log(err);
 });

const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log('Server is running on port 3000');
});

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

//error handeling middleware
app.use((err,req,res,next)=>{
   const statusCode = err.statusCode || 500;
   const message = err.message || "Internal Server error";
   return res.status(statusCode).json({
      Success:false,
      statusCode,
      message
   });
});