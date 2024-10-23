import { Controller, useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axiosIns from "@/axios";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import PassInput from "@/components/PassInput";

// Joi schema for form validation
const registerSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  country: Joi.string(),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.pattern.base":
        "Password must contain one uppercase letter, number & special character",
    }),
  dob: Joi.date().required(),
});

export function RegisterForm() {
  const [serverError, setServerError] = useState();
  const [duplicateError, setDuplicateError] = useState();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      dob: "",
      country: "",
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
    setDuplicateError("");
    try {
      const { data } = await axiosIns.post("/auth/register", values);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 409) {
          setDuplicateError(error.response?.data.message);
        }
      } else {
        // If the register request had no Response
        setServerError("Something went wrong please try again later!");
      }
    }
  }

  if (serverError) {
    console.log(serverError);
  }
  console.log(duplicateError)

  return (
    <div className="h-screen flex items-center">
      <div className="m-auto w-96">
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
                {...field}
                isInvalid={errors.email || duplicateError ? true : false}
                errorMessage={errors.email?.message || duplicateError}
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
                {...field}
                isInvalid={errors.password ? true : false}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input
                label="First name"
                radius="sm"
                variant="bordered"
                className="mt-6"
                {...field}
                isInvalid={errors.firstName ? true : false}
                errorMessage={errors.firstName?.message}
                firstName
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input
                label="Last name"
                radius="sm"
                variant="bordered"
                className="mt-6"
                {...field}
                isInvalid={errors.lastName ? true : false}
                errorMessage={errors.lastName?.message}
              />
            )}
          />
          <Controller
            name="dob"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  type="date"
                  variant="bordered"
                  radius="sm"
                  className="mt-6"
                  value={field.value}
                  {...field}
                  label="Date of birth"
                  isInvalid={errors.dob ? true : false}
                  errorMessage={errors.dob?.message}
                />
              );
            }}
          />
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select
                label="Country"
                radius="sm"
                variant="bordered"
                className="mt-6"
                value={field.value}
                {...field}
                isInvalid={errors.country ? true : false}
                errorMessage={errors.country?.message}
              >
                <SelectItem key="AFG">Afghanistan</SelectItem>
                <SelectItem key="USA">USA</SelectItem>
                <SelectItem key="IRI">Iran</SelectItem>
              </Select>
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
          <span className="text-gray-400">Already a member? </span>
          <Link to="/signin" className="font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
