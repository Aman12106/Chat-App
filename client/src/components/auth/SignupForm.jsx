import { sendOTP } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const onSubmit = async (data) => {
  try {
    const response = await sendOTP(data.email);

    console.log(response);

    navigate("/verify-otp");
  } catch (error) {
    console.log(error);
  }
};