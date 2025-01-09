import jwt from "jsonwebtoken"
import "dotenv/config"

interface dataInterface{
    username:string,
    email:string,
    profilePic:string,   
}

const secret:string = process.env.JWT_SECRET || "abc";


export const getJwtToken = (data:dataInterface) => {
    try {
        
        return jwt.sign(data, secret , { expiresIn: 60 * 60 });

    } catch (error) {
        console.log(error);
    }
}

export const getJwtVerified = (token:string)=> {
    try {
        
        return jwt.verify(token, secret);

    } catch (error) {
        console.log(error);
    }
}