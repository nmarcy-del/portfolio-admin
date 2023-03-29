import React from "react";
import { BiError, BiX } from "react-icons/bi";

const ErrorAlert = ({ message, onClick }) => {
  return (
    <div className="flex justify-center items-center m-1 font-medium py-1 px-3 text-red-100 bg-red-700 border border-red-700">
      <BiError size={28} className="mr-3 text-sm flex-shrink-0 text-red-100" />
      <div className="text-sm font-normal  max-w-full flex-initial">
        {message}
      </div>
      <div className="flex flex-auto flex-row-reverse">
        <div>
          <BiX
            size={24}
            className="feather feather-x cursor-pointer hover:text-red-800 rounded-full ml-2"
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;
