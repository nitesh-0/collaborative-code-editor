"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConnect_1 = __importDefault(require("./utility/dbConnect"));
require("dotenv/config");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
//connection
(0, dbConnect_1.default)();
app.get("/", (req, res) => {
    res.send("Hi there");
});
app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});
