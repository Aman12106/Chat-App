import { login, signup, resendOtp, verifyEmailOtp, fetchUser } from "../services/auth.service.js";
import {generateToken} from "../utils/index.js";
import { ENV } from "../config/env.js";

// Shared cookie settings for the "token" cookie, used whenever we log a user in.
const setAuthCookie = (res, token) => {
    res.cookie("token", token, {
        httpOnly: true,
        secure: ENV.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};

export const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await login({ email, password });
        const token = generateToken(user);
        setAuthCookie(res, token);
        return res.status(200).json({
            success: true,
            message: "Login successful",
            user
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
}

// Creates the account as "unverified" and emails an OTP.
// The user is NOT logged in yet — that only happens after verifyOtp succeeds.
export const handleSignup = async (req, res) => {
    try {
        const {name, email, password, phoneNumber} = req.body;

        const result = await signup({name, email, password, phoneNumber});

        return res.status(201).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
}

// Lets a user ask for a brand new OTP, e.g. if the previous one expired.
export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        
        const result = await resendOtp(email);
        console.log("Email received for OTP resend:", email);
        return res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
}

// Verifies the OTP, activates the account, and logs the user in automatically.
export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await verifyEmailOtp(email, otp);

        const token = generateToken(user);
        setAuthCookie(res, token);

        return res.status(200).json({
            success: true,
            message: "Email verified successfully. You are now logged in.",
            user
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
}

export const handleLogout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: ENV.NODE_ENV === "production",
        sameSite: "strict",
    });
    return res.status(200).json({
        success: true,
        message: "Logout successful"
    });
}

export const getCurrentUser = async (req, res) => {
    try {
        const user = await fetchUser(req.user.id);
        return res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            user
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
}