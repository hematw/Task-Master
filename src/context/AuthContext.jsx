import axiosIns from "@/axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")));
  }, []);

  const login = async (values) => {
    const {
      data: { token, user },
    } = await axiosIns.post("/auth/login", values);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = async () => {
    try {
      const { data } = await axiosIns.get("/auth/signout");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("signin");
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong try again later");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        login,
        logout,
        setUser(obj) {
          setUserData(obj);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
