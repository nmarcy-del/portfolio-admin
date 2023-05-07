import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { BiX } from "react-icons/bi";
import { useTranslation } from 'react-i18next';

const InfoMessage = ({ adminUserCanEdit, showInfo, handleCloseInfo }) => {
  const { t } = useTranslation();
  if (!adminUserCanEdit && showInfo) {
    return (
      <div className="fixed w-full bottom-0 mb-2 flex p-2 justify-between items-center text-yellow-100 bg-orange-500 z-50">
        <div className="flex items-center">
          <RiErrorWarningLine size={24} />
          <span className="sr-only">Info</span>
          <span className="ml-3 text-sm font-medium">
            {t("This user is a demo user and has no write permissions.")}
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
