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
exports.registerUser = exports.verifyOtp = exports.sendOtp = void 0;
const userSchema_1 = __importDefault(require("../models/userSchema"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const otp_1 = require("../models/otp");
const node_crypto_1 = require("node:crypto");
require("dotenv/config");
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        console.log(email);
        if (!email) {
            res.status(400).json({
                success: false,
                message: "Please Enter you email"
            });
            return;
        }
        var otp = otp_generator_1.default.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        });
        var isOtpUnique = yield otp_1.Otp.findOne({ otp });
        while (isOtpUnique) {
            otp = otp_generator_1.default.generate(5, {
                digits: true,
                upperCaseAlphabets: false,
                specialChars: false,
                lowerCaseAlphabets: false
            });
            isOtpUnique = yield otp_1.Otp.findOne({ otp });
        }
        yield otp_1.Otp.create({
            email,
            otp,
        });
        res.status(200).json({
            success: true,
            message: "Successively created otp",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
});
exports.sendOtp = sendOtp;
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp, email } = req.body;
        if (!otp || !email) {
            res.status(400).json({
                success: false,
                message: "Please provide otp."
            });
            return;
        }
        const updatedOtp = yield otp_1.Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (updatedOtp[0].otp !== otp) {
            res.status(400).json({
                success: false,
                message: "OTP not matched"
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Correct OTP",
            user: {
                email,
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
});
exports.verifyOtp = verifyOtp;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, confirmPassword } = req.body;
        if (!email || !username || !password || !confirmPassword) {
            res.status(400).json({
                success: false,
                message: "All field are required."
            });
            return;
        }
        const user = yield userSchema_1.default.findOne({ email });
        if (user) {
            res.status(400).json({
                success: false,
                message: "User already registered."
            });
            return;
        }
        if (password !== confirmPassword) {
            res.status(400).json({
                success: false,
                message: "Passowrd doesn't match."
            });
            return;
        }
        const secret = process.env.HASH_SECRET || "";
        const hashedPassword = (0, node_crypto_1.createHmac)('sha256', secret)
            .update(password)
            .digest('hex');
        const userCreated = yield userSchema_1.default.create({ username, email, password: hashedPassword, confirmPassword: hashedPassword });
        if (!userCreated) {
            res.status(200).json({
                success: false,
                message: "user not created",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "successfully created user",
            user: userCreated
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
});
exports.registerUser = registerUser;
