import { AuthContext } from "@/context/AuthContext";
import { Avatar, Badge, Button } from "@nextui-org/react";
import { Bell, LogOut, UserRound } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Notifications from "./Notifications";

export default function Header() {
  const { userData, logout, setUser } = useContext(AuthContext);

  const handleSignOut = async () => {
    await logout();
  };

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
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
            src={userData?.profile}
            className="text-white"
          />
          <div className="ml-2">
            <p className="font-semibold">{userData?.firstName}</p>
            <p className="text-sm text-gray-p">{userData?.email}</p>
          </div>
        </div>
        <h3 className="font-semibold text-xl">Projects</h3>
        <div className="flex items-center gap-2">
          <Notifications />
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
