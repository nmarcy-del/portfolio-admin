import React from "react";
import { BiCheckCircle, BiX } from "react-icons/bi";

const SuccessAlert = ({ message, onClick }) => {
  return (
    <div className="flex justify-center items-center m-1 font-medium py-3 px-2 text-green-100 bg-green-700 border border-green-700 ">
      <BiCheckCircle size={28} className="mr-3 text-size-lg flex-shrink-0" />
      <div className="text-sm font-normal  max-w-full flex-initial">
        {message}
      </div>
      <div className="flex flex-auto flex-row-reverse">
        <div>
          <BiX
            size={24}
            className="feather feather-x cursor-pointer hover:text-green-800 rounded-full ml-2"
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};

export default SuccessAlert;
