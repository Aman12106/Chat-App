import User from "../models/User.js";
import Otp from "../models/Otp.js";
import * as bcrypt from "bcryptjs";
import { otpTemplate } from "../templates/otp.template.js";
import { sendEmail } from "../utils/nodemailer.js";
import { generateOtp } from "../utils/index.js";

// Turns a Mongoose user document into a plain object that is safe to send to the client.
const toSafeUser = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    isVerified: user.isVerified,
});

// Generates a fresh OTP, saves it to the DB (auto-expires after 10 minutes,
// see the TTL index on Otp.createdAt), and emails it to the user.
const createAndSendOtp = async (email) => {
    const otp = generateOtp();

    await Otp.deleteMany({ email });
    await Otp.create({ email, otp });

    const html = otpTemplate(otp)
    console.log("Sending OTP email to:", email);
    
    await sendEmail(email, "Your OTP Code", html);
};

export const login = async (data) => {
    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user) {
        throw { status: 401, message: "Invalid email or password" };
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        throw { status: 401, message: "Invalid email or password" };
    }

    if (!user.isVerified) {
        throw { status: 403, message: "Please verify your email before logging in. Check your inbox for the OTP." };
    }

    return toSafeUser(user);
};

// Creates the account as "unverified" and sends the first OTP.
// The account only becomes usable once verifyOtp() is called.
export const signup = async (data) => {
    const { name, email, password, phoneNumber } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw { status: 409, message: "User with this email already exists" };
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    await User.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        isVerified: false,
    });

    await createAndSendOtp(email);

    return { message: "OTP sent to your email. Please verify to activate your account." };
};

// Lets a user request a brand new OTP, e.g. because the old one expired.
export const resendOtp = async (email) => {
    const user = await User.findOne({ email });
    console.log("User found for OTP resend:", user ? user.email : "None", "Verified:", user ? user.isVerified : "N/A");
    if (!user) {
        throw { status: 404, message: "No account found with this email" };
    }


    if (user.isVerified) {
        throw { status: 400, message: "This account is already verified. Please log in." };
    }

    await createAndSendOtp(email);

    return { message: "OTP sent successfully" };
};

// Verifies the OTP and, on success, activates the account and returns it so the
// caller can log the user in automatically.
export const verifyEmailOtp = async (email, otp) => {
    const storedOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });
    if (!storedOtp) {
        throw { status: 400, message: "OTP has expired or is invalid. Please request a new one." };
    }
    if (storedOtp.otp !== otp) {
        throw { status: 400, message: "Invalid OTP" };
    }

    await Otp.deleteMany({ email });

    const user = await User.findOneAndUpdate(
        { email },
        { isVerified: true },
        { new: true }
    );
    if (!user) {
        throw { status: 404, message: "No account found with this email" };
    }

    return toSafeUser(user);
};

export const fetchUser = async (userId) => {
    const user = await User.findById(userId).select("-password");
    if (!user) {
        throw { status: 404, message: "User not found" };
    }

    return toSafeUser(user);
};
