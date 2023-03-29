import React from "react";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ ...props }) => {
  return (
    <li>
      <NavLink
        to={props.to}
        className={({ isActive, isPending }) =>
          isPending
            ? "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-gray-300 hover:text-gray-500 border-l-4 border-transparent hover:border-green-500 pr-6"
            : isActive
            ? "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-gray-300 hover:text-gray-500 border-l-4 border-green-600 hover:border-green-500 pr-6"
            : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-gray-300 hover:text-gray-500 border-l-4 border-transparent hover:border-green-500 pr-6"
        }
        onClick={props.onClick}
      >
        <span className="inline-flex justify-center items-center ml-4 mt-1">
          {props.icon}
        </span>
        <span className="ml-5 text-md tracking-wide truncate">
          {props.label}
        </span>
      </NavLink>
    </li>
  );
};

export default SidebarItem;
