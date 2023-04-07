import React from "react";
import { RiDatabase2Line } from "react-icons/ri";

const Header = () => {
  return (
    <div className="flex items-center justify-start">
      <span className="flex ml-2 md:mr-24">
        <RiDatabase2Line
          size={32}
          className="text-green-500 h-8 mr-3 ml-3"
          alt="Admin Logo"
        />
        <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-gray-200">
          Mon admin
        </span>
      </span>
    </div>
  );
};

export default Header;