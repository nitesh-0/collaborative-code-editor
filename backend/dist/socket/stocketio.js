"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.app = void 0;
const http_1 = require("http");
const socket_io_1 = require("socket.io");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.app = app;
const httpServer = (0, http_1.createServer)(app);
const PORT = process.env.PORT || 8000;
const io = new socket_io_1.Server(httpServer, {});
exports.io = io;
io.on("connection", (socketId) => {
    console.log(`user get connected: ${socketId}`);
});
httpServer.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});
