import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { lazy } from "react";
import { Route, Routes, useNavigate, useHref } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import AuthProvider from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import GitHubAuth from "./components/GithubAuth";
import GitHubCallback from "./components/GithubCallback";
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const LoginForm = lazy(() => import("@/pages/Login"));
const RegisterForm = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const SelectedProject = lazy(() => import("./pages/SelectedProject"));
const Home = lazy(() => import("./pages/Home"));
const ProtectedPages = lazy(() => import("./pages/ProtectedPages"));
const Projects = lazy(() => import("./pages/Projects"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  const navigate = useNavigate();
  console.log(1212);
  return (
    <>
      <AuthProvider>
        <ToastContainer position="top-center" />
        <NextUIProvider navigate={navigate} useHref={useHref}>
          <GoogleOAuthProvider clientId={clientId}>
            <Routes>
              <Route path="signin" element={<LoginForm />} />
              <Route path="signup" element={<RegisterForm />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="/auth/github" element={<GitHubAuth />} />
              <Route path="/auth/callback" element={<GitHubCallback />} />
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
