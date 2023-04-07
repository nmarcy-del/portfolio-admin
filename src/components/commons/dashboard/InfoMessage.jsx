import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { BiX } from "react-icons/bi";

const InfoMessage = ({ adminUserCanEdit, showInfo, handleCloseInfo }) => {
  if (!adminUserCanEdit && showInfo) {
    return (
      <div className="fixed w-full bottom-0 mb-2 flex p-2 justify-between items-center text-yellow-100 bg-orange-500 z-50">
        <div className="flex items-center">
          <RiErrorWarningLine size={24} />
          <span className="sr-only">Info</span>
          <span className="ml-3 text-sm font-medium">
            Cet utilisateur est un utilisateur de démonstration et n'a aucun droit en écriture.
          </span>
        </div>
        <BiX
          size={24}
          className="feather feather-x cursor-pointer hover:text-red-800 rounded-full ml-2"
          onClick={handleCloseInfo}
        />
      </div>
    );
  }
  return null;
};

export default InfoMessage;
