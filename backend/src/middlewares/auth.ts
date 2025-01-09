import { NextFunction, Request, Response } from "express";
import { getJwtVerified } from "../utility/jwt";


export const authentication = async (req:Request, res:Response , next:NextFunction) => {

    try {
        if (req.isAuthenticated()) {            
            return next();
        }

        const token = req.cookies.token 
        console.log(token);
        if( !token ){
            res.status(401).json({
                success:false,
                message:"token not found",
            })
            return;
        }
        console.log("Helllll");

        const user = getJwtVerified(token);

        if( !user ){
            res.status(401).json({
                success:false,
                message:"Invalid token",
            })
            return;
        }

        req.body.user = user
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        })
        return;
    }   

}