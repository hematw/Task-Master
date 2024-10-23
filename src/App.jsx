import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { createContext, lazy, useState } from "react";
import { LoginForm } from "@/pages/Login";
import { RegisterForm } from "./pages/Register";
import { Route, Routes, useNavigate, useHref } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import ProtectedPages from "./pages/ProtectedPages";

// const Home = lazy(()=> import("./pages/Home"))
// const ProtectedPages = lazy(()=> import("./pages/ProtectedPages"))
// const Projects = lazy(()=> import("./pages/Projects"))
// const Profile = lazy(()=> import("./pages/Profile"))
lazy(() => import("@/pages/ProtectedPages"));

export const AuthContext = createContext(null);

function App() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  return (
    <>
      <AuthContext.Provider
        value={{
          userData,
          setUser(obj) {
            setUserData(obj);
          },
        }}
      >
        <NextUIProvider navigate={navigate} useHref={useHref}>
          <Routes>
            <Route path="signin" element={<LoginForm />} />
            <Route path="signup" element={<RegisterForm />} />
            <Route element={<ProtectedPages />}>
              <Route path="/" element={<Home />} />
              <Route path="projects" element={<Projects />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<h1>You are lost</h1>} />
          </Routes>
        </NextUIProvider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
