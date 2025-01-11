import { Request, Response } from "express";
import { Project } from "../models/projectSchema";

export const createNewProject = async (req:Request , res:Response ):Promise<void> => {

    try {

        const {projectName , visibility , description ,theme,tags} = req.body ; 
        const ownerId = (req.user as any)?._id ; 

        console.log(projectName, visibility , description , theme , tags , ownerId);
        if( !projectName || !visibility || !description || !theme || !tags || !ownerId ){
            res.status(402).json({
                success:false,
                message:"All fields are required",
            })
            return ;
        }
        const socketRoomId = "socketId--> generated from socket server";
        const project = await Project.create({
            projectName,
            description,
            owner:ownerId,
            visibility,
            theme,
            tags,
            socketRoomId:socketRoomId}); 

        if( !project ){
            res.status(400).json({
                success:false,
                message:"project not created",
            })
        }

        res.status(200).json({
            success:true,
            message:"project successfully created",
        })

        
    } catch (error) {
        console.log(error);
    }

}