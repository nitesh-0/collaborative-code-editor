import { Request, Response } from "express";
import {app} from "./socket/stocketio"
import dbConnection from "./utility/dbConnect"

//connection
dbConnection();

app.get("/", (req:Request, res:Response)=> {
    res.send("Hi there")
})

