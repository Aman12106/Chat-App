import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../features/auth/authStore";

import {
  verifyOTP,
  signup,
  getCurrentUser,
} from "../../api/auth.api";

function OTPForm() {

    const navigate = useNavigate();

    const signupData = useAuthStore(
        state => state.signupData
    );

    const setUser = useAuthStore(
        state => state.setUser
    );

    const clearSignupData = useAuthStore(
        state => state.clearSignupData
    );

    const {
        register,
        handleSubmit
    } = useForm();

    // Write onSubmit here 👇

    const onSubmit = async ({ otp }) => {

    };

    return (

        ...

    );

}