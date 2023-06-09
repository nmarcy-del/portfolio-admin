import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axiosInstance from "config/axiosInstance";
import appConf from "config/config";
import { CgLogOff } from "react-icons/cg";
import { useTranslation } from 'react-i18next';

function LogoutButton() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseUrl = appConf.backendBaseUrl;
  const authEndPoint = appConf.backendAuthEndpoint;

  const logout = async (e) => {
    try {
      await axiosInstance.get(`${baseUrl}${authEndPoint}logout`, {
        withCredentials: true,
      });
      // store user token in local storage
      sessionStorage.removeItem("jwt-token");
      dispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
      console.error(error);
      }
    }
  };

  return (
    <li>
      <button
        onClick={logout}
        className=" block absolute mt-20 lg:mt-0 bottom-40 md:bottom-26 lg:bottom-26 flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-red-700 hover:text-red-900 border-l-4 border-transparent hover:border-red-500 pr-6"
      >
        <span className="inline-flex justify-center items-center ml-4 mt-1">
          <CgLogOff size={24} />
        </span>
        <span className="ml-5 text-md tracking-wide truncate">{t("Logout")}</span>
      </button>
    </li>
  );
}

export default LogoutButton;
