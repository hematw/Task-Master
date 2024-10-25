import { Controller, useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axiosIns from "@/axios";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import PassInput from "@/components/PassInput";

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
});

export function LoginForm() {
  const navigate = useNavigate();

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

  // Submit handler function
  async function onSubmit(values) {
    console.log(values);
    try {
      const { data:{token, user} } = await axiosIns.post("/auth/login", values);
      localStorage.setItem("auth", JSON.stringify({token, user}));
      console.log(user);
      navigate("/");
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <div className="h-screen flex items-center">
      <div className="m-auto w-96 ">
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
          <Button
            className="w-full mt-10 bg-black text-white"
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
          <Link to="/signup" className="font-semibold">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
