import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosIns from "@/axios";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const GitHubCallback = () => {
  const [searchParams] = useSearchParams();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const code = searchParams.get("code");
    console.log(code)
    if (code) {
      exchangeCodeForToken(code);
    }
  }, [searchParams]);

  const exchangeCodeForToken = async (code) => {
    try {
      const { data } = await axiosIns.post("/auth/github", { code });
      console.log(data)
      toast.success(data.message);
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Authentication failed");
    }
  };

  return <div>Authenticating with GitHub...</div>;
};

export default GitHubCallback;
