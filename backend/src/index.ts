import express from "express"
import dbConnection from "./utility/dbConnect"
import "dotenv/config"

const app = express()

const PORT = process.env.PORT || 8000; 

//connection
dbConnection();

app.get("/", (req, res)=> {
    res.send("Hi there")
})

app.listen(PORT , () => {
    console.log(`Server started at port: ${PORT}`);
})