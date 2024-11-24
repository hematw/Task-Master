import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { lazy } from "react";
import { LoginForm } from "@/pages/Login";
import { RegisterForm } from "./pages/Register";
import { Route, Routes, useNavigate, useHref } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import ProtectedPages from "./pages/ProtectedPages";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SelectedProject from "./pages/SelectedProject";
import AuthProvider from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// const Home = lazy(()=> import("./pages/Home"))
// const ProtectedPages = lazy(()=> import("./pages/ProtectedPages"))
// const Projects = lazy(()=> import("./pages/Projects"))
// const Profile = lazy(()=> import("./pages/Profile"))
lazy(() => import("@/pages/ProtectedPages"));

function App() {
  const navigate = useNavigate();
  return (
    <>
      <AuthProvider>
        <NextUIProvider navigate={navigate} useHref={useHref}>
          <GoogleOAuthProvider clientId={clientId}>
            <Routes>
              <Route path="signin" element={<LoginForm />} />
              <Route path="signup" element={<RegisterForm />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route element={<ProtectedPages />}>
                <Route path="/" element={<Home />} />
                <Route path="projects" element={<Projects />} />
                <Route path="projects/:id" element={<SelectedProject />} />
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route path="*" element={<h1>You are lost</h1>} />
            </Routes>
          </GoogleOAuthProvider>
        </NextUIProvider>
      </AuthProvider>
    </>
  );
}

export default App;
