import React, { useContext } from "react";
import { Button } from "@nextui-org/react";
import githubIcon from "@/assets/github_icon.svg";
import axiosIns from "@/axios";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

function GitHubAuth() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGitHubLogin = async () => {
    try {
      // Redirect to GitHub OAuth authorization page
      const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
      const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI;
      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user`;

      window.location.href = githubAuthUrl;
    } catch (error) {
      console.error(error);
      toast.error("GitHub Login failed");
    }
  };

  return (
    <Button
      className="bg-[#333] text-white flex items-center mt-4"
      radius="sm"
      size="lg"
      onClick={handleGitHubLogin}
      fullWidth
    >
      <img src={githubIcon} alt="Github icon." />
      <span>Continue with GitHub</span>
    </Button>
  );
}

export default GitHubAuth;
