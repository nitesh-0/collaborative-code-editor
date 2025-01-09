import express from "express"
import passport from "../middlewares/passport";
const router = express.Router()


import { loginUser, logout, registerUser, sendOtp, verifyOtp } from "../controller/userController";

router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/login/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback",passport.authenticate("google", { failureRedirect: "/" }),(req, res) => {
        res.redirect("/dashboard");
});


export default router;