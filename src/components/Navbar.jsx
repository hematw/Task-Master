import React from "react";
import { NavLink } from "react-router-dom";
import { NotepadText, Home, UserRound } from "lucide-react";

function Navbar() {
  return (
    <nav className="flex justify-center py-4 w-full border-t-2 bg-white absolute bottom-0 left-0 z-10">
      <div className="flex bg-zinc-100 gap-2 rounded-2xl p-1 border-1">
        <NavLink
          end
          to={"/"}
          className={({ isActive }) =>
            `${isActive ? "nav-link bg-black text-white" : "nav-link"}`
          }
        >
          <span>
            <Home />
          </span>
          <span>Home</span>
        </NavLink>
        <NavLink
          end
          to={"/projects"}
          className={({ isActive }) =>
            `${isActive ? "nav-link bg-black text-white" : "nav-link"}`
          }
        >
          <span>
            <NotepadText />
          </span>
          <span>Projects</span>
        </NavLink>
        <NavLink
          end
          to={"/profile"}
          className={({ isActive }) =>
            `${isActive ? "nav-link bg-black text-white" : "nav-link"}`
          }
        >
          <span>
            <UserRound />
          </span>
          <span>Profile</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
