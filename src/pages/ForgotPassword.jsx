import { Controller, useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axiosIns from "@/axios";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

function ForgotPassword() {
  const [isSent, setIsSent] = useState(false);
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function getEmailAlias() {
    const mailArr = getValues("email").split("@");
    const substr = mailArr[0].slice(2);
    mailArr[0] = mailArr[0].replace(substr, "***");
    setEmail(mailArr.join("@"));
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  // Submit handler function
  async function onSubmit(values) {
    console.log(values);
    try {
      const { data } = await axiosIns.post("/auth/forgot-password", values);
      console.log(data);
      setIsSent(true);
      getEmailAlias();
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.message ||
          "Something went wrong, please try again later!"
      );
    }
  }

  return (
    <div className="h-screen flex items-center">
      <ToastContainer position="top-center" />
      <div className="m-auto w-96 text-center">
        {isSent ? (
          <>
            <h1 className="text-3xl font-semibold">
              Password Reset Link Sent!
            </h1>
            <p className="mt-10 text-sm">
              A password reset link has been sent to &nbsp;
              {email}
            </p>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-3xl font-semibold text-center">
              Forgot Password?
            </h1>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  label="Email"
                  radius="sm"
                  variant="bordered"
                  className="mt-6"
                  isInvalid={errors.email ? true : false}
                  errorMessage={errors.email?.message}
                  {...field}
                />
              )}
            />
            <Button
              className="w-full mt-10 bg-black text-white"
              size="lg"
              radius="sm"
              type="submit"
            >
              Get a Reset Link
            </Button>
          </form>
        )}
        <p className="text-center mt-8">
          <span className="text-gray-400">Back to </span>
          <Link to="/signin" className="font-semibold underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
