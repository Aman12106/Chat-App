import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signupSchema } from "../../schemas/signupSchema";
import Button from "../common/Button";
import Input from "../common/Input";

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);

    // sendOTP(data.email)
  };

  return (
    <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <h1 className="mb-2 text-center text-3xl font-bold">
        Create Account
      </h1>

      <p className="mb-6 text-center text-gray-500">
        Join our chat application
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <Input
          label="Full Name"
          id="name"
          register={register}
          error={errors.name}
          placeholder="John Doe"
        />

        <Input
          label="Username"
          id="username"
          register={register}
          error={errors.username}
          placeholder="john123"
        />

        <Input
          label="Email"
          id="email"
          type="email"
          register={register}
          error={errors.email}
          placeholder="john@gmail.com"
        />

        <Input
          label="Password"
          id="password"
          type="password"
          register={register}
          error={errors.password}
          placeholder="********"
        />

        <Input
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          register={register}
          error={errors.confirmPassword}
          placeholder="********"
        />

        <Button
          type="submit"
          loading={isSubmitting}
        >
          Send OTP
        </Button>
      </form>

      <p className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-blue-600 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default SignupForm;