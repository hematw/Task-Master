import { Controller, useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import axiosIns from "@/axios";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import PassInput from "@/components/PassInput";
import { toast, ToastContainer } from "react-toastify";

const schema = Joi.object({
  password: Joi.string().required().min(8).max(20),
  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .options({ messages: { "any.only": "{{#label}} does not match" } }),
});

function ResetPassword() {
  const [URLSearchParams] = useSearchParams();
  const token = URLSearchParams.get("token");
  const user = URLSearchParams.get("user");
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
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
    try {
      const { data } = await axiosIns.post(
        `/auth/reset-password?token=${token}&user=${user}`,
        values
      );
      reset();
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response.data.message ||
          "Something went wrong, please try again later!"
      );
    }
  }

  return (
    <div className="h-screen flex items-center">
      <ToastContainer position="top-center" />
      <div className="m-auto w-96 ">
        <h1 className="text-3xl font-semibold text-center my-10">
          Create a new Password
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <PassInput
                label="Confirm Password"
                radius="sm"
                variant="bordered"
                className="mt-6"
                isInvalid={errors.confirmPassword ? true : false}
                errorMessage={errors.confirmPassword?.message}
                {...field}
              />
            )}
          />
          <Button
            className="w-full mt-6 bg-black text-white"
            size="lg"
            radius="sm"
            type="submit"
          >
            <span>Save and continue</span>
            <span>
              <ArrowRight width={18} />
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
