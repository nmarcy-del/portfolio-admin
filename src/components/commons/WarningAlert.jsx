import React from "react";
import { BiInfoCircle, BiX } from "react-icons/bi";

const WarningAlert = ({ message, onClick }) => {
  return (
    <div className="flex justify-center items-center m-1 font-medium py-1 px-3 text-yellow-100 bg-orange-500 border border-orange-500">
      <BiInfoCircle size={28} className="mr-3 text-sm flex-shrink-0 text-yellow-100" />
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

export default WarningAlert;
