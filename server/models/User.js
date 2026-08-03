import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, "Invalid email address"],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    phoneNumber: {
        type: String,
    },
    avatar: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
// User.createIndexes({ email: 1 }, { unique: true });

export default User;
