import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username :{
        type:String,
        required: true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatatr:{
        type:String,
        default:"https://www.bing.com/images/blob?bcid=r876AvagpIAGXA"
    }
});

const User = new mongoose.model("User",userSchema);

export default User;