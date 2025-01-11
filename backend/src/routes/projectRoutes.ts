import express from "express"
import { createNewProject } from "../controller/ProjectController";
import { authentication } from "../middlewares/auth";

const router = express.Router() ;


router.post("/createproject",authentication, createNewProject); 




export default router ; 