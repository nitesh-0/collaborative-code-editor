import "dotenv/config";
import express from "express";
import session from "express-session";
import passport from "./middlewares/passport";
import dbConnection from "./utility/dbConnect";
import userRoute from "./routes/userRoutes";
import cookieParser from "cookie-parser";
import dashboardRoute from "./routes/dashboard";
import projectRoute from "./routes/projectRoutes";
import commandRoutes from "./routes/commandRoute";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 8000;

// Connection
dbConnection();

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use('/api', commandRoutes);

app.use("/", userRoute);
app.use("/", dashboardRoute);
app.use("/", projectRoute);

app.get("/", (req, res) => {
  res.send("Hello from landing page");
});

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
