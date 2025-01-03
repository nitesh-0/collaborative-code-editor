import express from "express";
import { registerUser, sendOtp, verifyOtp } from "../controller/userController";

const router = express.Router();

router.post("/sendotp", sendOtp);
router.post("/verifyotp",verifyOtp);
router.post("/signup",registerUser);

export default router;