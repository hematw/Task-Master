import { Controller, useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axiosIns from "@/axios";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button, Input } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import PassInput from "@/components/PassInput";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";
import GoogleAuth from "@/components/GoogleAuth";

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
});

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  let x = 2;
  console.log(x++);
  // Submit handler function
  async function onSubmit(values) {
    console.log(values);
    try {
      await login(values);
      navigate("/");
    } catch (error) {
      console.error("Error", error);
      toast.error(error.message);
    }
  }

  return (
    <div className="h-screen flex items-center">
      <div className="m-auto w-96 ">
        <h1 className="text-3xl font-semibold text-center">TaskMaster</h1>
        <GoogleAuth/>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PassInput
                label="Password"
                radius="sm"
                variant="bordered"
                className="mt-6"
                isInvalid={errors.password ? true : false}
                errorMessage={errors.password?.message}
                {...field}
              />
            )}
          />
          <div className="flex justify-between mt-6">
            <label>
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <Link to="/forgot-password" className="underline">
              Forgot password?
            </Link>
            {/* <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <Input
                label="Remember me"
                radius="sm"
                variant=""
                type="checkbox"
                className="mt-6"
                {...field}
              />
            )}
          /> */}
          </div>
          <Button
            className="w-full mt-6 bg-black text-white"
            size="lg"
            radius="sm"
            type="submit"
          >
            <span>Sign up</span>
            <span>
              <ArrowRight width={18} />
            </span>
          </Button>
        </form>
        <p className="text-center mt-8">
          <span className="text-gray-400">Not a member? </span>
          <Link to="/signup" className="font-semibold underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
