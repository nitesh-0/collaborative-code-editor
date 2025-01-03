"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const userSchema_1 = __importDefault(require("../models/userSchema"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email } = req.body;
        if (!email || !username) {
            return res.status(400).json({
                success: false,
                message: "All field are required."
            });
        }
        const user = yield userSchema_1.default.create({ username, email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not created."
            });
        }
        res.status(200).json({
            success: true,
            message: "successfully created user",
            user
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.registerUser = registerUser;
