//testing purpose 
import express from "express";
import { authentication } from "../middlewares/auth";

const router = express();

router.get("/dashboard", authentication, (req , res) => {
            const user = req.user as any;
              console.log(user);
              res.json({
              user,
            });
})

export default router;