import axiosIns from "@/axios";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedPages() {
  // const [user, setUser] = useState();
  // const [isLoading, setIsLoading] = useState(true);
  const auth = JSON.parse(localStorage.getItem("auth"));

  if (!auth?.token) {
    return <Navigate to="signin" />;
  }

  // useEffect(() => {
  //   async function getUser() {
  //     const { data } = await axiosIns.get(`/users/${auth.user._id}`);
  //     console.log(data);
  //     setUser(data.user);
  //     setIsLoading(false);
  //   }
  //   getUser();
  // }, []);

  return (
    <div className="h-screen mx-6 relative flex flex-col">
      <Header />
      <main className="p-6 my-20 overflow-auto">
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
}

export default ProtectedPages;
