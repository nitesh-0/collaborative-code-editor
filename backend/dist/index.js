"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stocketio_1 = require("./socket/stocketio");
const dbConnect_1 = __importDefault(require("./utility/dbConnect"));
//connection
(0, dbConnect_1.default)();
stocketio_1.app.get("/", (req, res) => {
    res.send("Hi there");
});
