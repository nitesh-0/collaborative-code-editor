import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    googleId: {
        type: String, // Required for Google users
    },
    password: {
        type: String, // Optional for Google users
        required: function (this: any) {
            return !this.googleId; // Required if googleId is not present
        },
    },
    confirmPassword: {
        type: String, // Optional for Google users
        required: function (this: any) {
            return !this.googleId; // Required if googleId is not present
        },
    },
    
    profilePic: {
        type: String,
        default: "UserImage",
    },
}, { timestamps: true });

const User = mongoose.model("user", userSchema);
export default User;