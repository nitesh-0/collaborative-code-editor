import mongoose from "mongoose";
import { mailSender } from "../utility/mailSender";

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:600*1000
    }
});

async function sendVerificationEmail(email:string, otp:string){
    try{
        
       const mailResponse =  await mailSender(email , "otp verification email" , otp);
        console.log("Successively send mail" , mailResponse);

    }catch(err){
        console.log(err);
    }

}


otpSchema.pre("save" , async function (next){
    await sendVerificationEmail(this.email , this.otp);
    next();
})

export const Otp = mongoose.model('otp', otpSchema);