import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedPages() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="signin" />;
  }

  return (
    <div className="h-screen mx-6 relative flex flex-col justify-center">
      <Header />
      <main className="p-6 mb-20 mt-16 overflow-auto">
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
}

export default ProtectedPages;
