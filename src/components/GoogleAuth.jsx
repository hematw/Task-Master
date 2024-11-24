import { Button } from "@nextui-org/react";
import React, { useContext } from "react";
import googleIcon from "@/assets/google_icon.svg";
import { useGoogleLogin } from "@react-oauth/google";
import axiosIns from "@/axios";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

function GoogleAuth() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const { data } = await axiosIns.post("/auth/google", {
        access_token: codeResponse.access_token,
      });
      toast.success(data.message);
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      navigate("/")
    },
    onError: (errorResponse) => {
      console.log(errorResponse);
      toast.error("Google Login field");
    },
  });

  return (
    <Button
      className="bg-[#d23c3c] text-white flex items-center"
      radius="sm"
      size="lg"
      onClick={googleLogin}
      fullWidth
    >
      <img src={googleIcon} alt="google icon" className="max-w-full" />
      <span>Continue with Google</span>
    </Button>
  );
}

export default GoogleAuth;
