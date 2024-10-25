import { AuthContext } from "@/App";
import axiosIns from "@/axios";
import { Avatar, Badge, Button } from "@nextui-org/react";
import { Bell, LogOut, UserRound } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Header() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { data } = await axiosIns.get("/auth/signout");
      localStorage.removeItem("auth");
      navigate("signin");
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong try again later");
    }
  };

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("auth")).user;
    setUser(loggedUser);
  }, []);

  return (
    <>
      <ToastContainer position="top-center" />
      <header className="flex justify-between items-center w-full border-b-2 py-2 bg-white absolute top-0 left-0 z-20">
        <div className="flex items-center">
          <Avatar
            radius="sm"
            fallback={<UserRound />}
            src={user?.profile}
            className="text-white"
          />
          <div className="ml-2">
            <p className="font-semibold">{user?.firstName}</p>
            <p className="text-sm text-gray-p">{user?.email}</p>
          </div>
        </div>
        <h3 className="font-semibold text-xl">Projects</h3>
        <div className="flex items-center gap-2">
          <Badge content="4" shape="rectangle" color="danger">
            <Button isIconOnly radius="sm" className="bg-black text-white">
              <Bell />
            </Button>
          </Badge>
          <Button
            variant="light"
            radius="sm"
            className="border-2 font-medium border-black"
            onClick={handleSignOut}
          >
            Sign Out
            <LogOut width={18} />
          </Button>
        </div>
      </header>
    </>
  );
}
