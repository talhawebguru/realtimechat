"use client";
import React, { useContext } from "react";
import { IoMdNotifications } from "react-icons/io";
import { logout } from "@/app/services/Auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ThemeContext } from "@/app/context/ThemeContext";

const Header = () => {
  const router = useRouter();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = async () => {
    try {
      await logout();
      Cookies.remove("token");
      router.push("/login");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <div className="h-[86px] bg-[#5d5fef] shadow-[0px_4px_4px_0px_rgba(241,120,182,0.25)]">
      <div className="container mx-auto px-4 flex justify-between items-center h-full">
        <h1 className="text-white text-xl font-bold">Real Time Chat Application</h1>
        <div className="flex items-center gap-8">
          <IoMdNotifications size={26} className="text-white" />
          <button
            onClick={toggleTheme}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;