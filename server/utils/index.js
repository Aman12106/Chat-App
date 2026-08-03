import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";


export const generateToken = (user) => {
    const payload = {
        name: user.name,
        email: user.email,
        id: user.id,
    }

    return jwt.sign(payload, ENV.SECRET_KEY, { expiresIn: ENV.JWT_EXPIRE });
}


export const verifyToken = (token) => {
    try {
        return jwt.verify(token, ENV.SECRET_KEY);
    } catch (error) {
        console.error("Token verification failed:", error);
        throw { status: 401, message: "Invalid or expired token" };
    }
}

export const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

