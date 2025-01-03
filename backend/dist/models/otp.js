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
const mongoose_1 = __importDefault(require("mongoose"));
const otpSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 600 * 1000
    }
});
function sendVerificationEmail(email, otp) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mailResponse = yield mailSender(email, "otp verification email", otp);
            console.log("Successively send mail", mailResponse);
        }
        catch (err) {
            console.log(err);
        }
    });
}
otpSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield sendVerificationEmail(this.email, this.otp);
        next();
    });
});
