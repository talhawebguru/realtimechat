import React from "react";
import { IoMdNotifications } from "react-icons/io";

const Header = () => {
  return (
    <>
      <div className="h-[86px] bg-[#5d5fef] shadow-[0px_4px_4px_0px_rgba(241,120,182,0.25)]">
        <div className="container mx-auto px-4 flex justify-between items-center h-full">
          <h1>Real Time Chat Application</h1>
          <IoMdNotifications size={26} className="" />
        </div>
      </div>
    </>
  );
};

export default Header;
