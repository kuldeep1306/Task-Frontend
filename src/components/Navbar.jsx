import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, Zap, ChevronDown, LogOut } from "lucide-react";

const Navbar = ({user={}, onLogout}) => {
  const menuref = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuref.current && !menuref.current.contains(event.target)) {
      setMenuOpen(false);
    }
  }
  document.addEventListener("mousedown", handleClickOutside)
  return() => document.removeEventListener("mousedown", handleClickOutside);
  
},[])

  const handleMenuToggle = () => {
    setMenuOpen(prev => !prev);
  };

  const handleLogout = () => {
    setMenuOpen(false);
    onLogout();
    console.log("Logged out");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">

        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-indigo-500">
            <Zap className="w-6 h-6 text-white" />
            </div>

            <span className="text-2xl font-bold bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            TaskFlow
            </span>

        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <button
            className="p-2 hover:bg-purple-50 rounded-full"
            onClick={() => navigate("/profile")}
          >
            <Settings className="w-5 h-5" />
          </button>

          <div ref={menuref} className="relative">
            <button
              onClick={handleMenuToggle}
              className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-purple-50"
            >
               <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-500 text-white font-semibold">
  {user?.name?.trim()?.charAt(0)?.toUpperCase() || "U"}
          </div> 
          <div className="text-left hidden md:block">
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>


              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  menuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {menuOpen && (
              <ul className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border">
                <li>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/profile");
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-purple-50 flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Profile Settings
                  </button>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left hover:bg-red-50 text-red-600 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
