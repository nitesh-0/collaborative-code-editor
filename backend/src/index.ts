import "dotenv/config";
import express from "express";
import session from "express-session";
import passport from "./middlewares/passport";
import dbConnection from "./utility/dbConnect"
import userRoute from "./routes/userRoutes"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import { authentication } from "./middlewares/auth";
import dashboardRoute from "./routes/dashboard";

const app = express();

const PORT = process.env.PORT || 8000;

//connection
dbConnection();

app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use("/",userRoute);
app.use("/",dashboardRoute)

app.get("/", (req, res) => {
  res.send("Hello from landing page");
});

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});