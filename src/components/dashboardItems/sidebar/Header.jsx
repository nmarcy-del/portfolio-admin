import React from "react";
import { useSelector } from "react-redux";

function Header() {
  const adminUsername = useSelector((state) => state.auth.adminUsername);

  return (
    <div className="flex items-center pl-2 h-14 border-b text-xl text-gray-300">
      <div>Bienvenue, {adminUsername}</div>
    </div>
  );
}

export default Header;
