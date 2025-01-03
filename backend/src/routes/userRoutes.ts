import express, { Request, Response } from "express"
const router = express.Router()


import { registerUser, sendOtp, verifyOtp } from "../controller/userController";


router.post("/sendOtp", sendOtp);
router.post("/verifyOtp",verifyOtp);
router.post("/signup", registerUser);

export default router;