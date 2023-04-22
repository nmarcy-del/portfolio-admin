import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import axiosInstance from "config/axiosInstance";
import appConf from "config/config";
import { BsGithub, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`${appConf.backendBaseUrl}${appConf.backendApiEndpoint}contacts`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response && response.data[0]) {
          setLinkedin(
            response.data[0].linkedin
              ? response.data[0].linkedin
              : "https://www.linkedin.com"
          );
          setGithub(
            response.data[0].github
              ? response.data[0].github
              : "https://github.com"
          );
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        } else {
          console.log(error);
        }

        if (
          error.response &&
          error.response.status &&
          error.response.status === 401
        ) {
          console.log(error.response.status);
          sessionStorage.removeItem("jwt-token");
          dispatch({ type: "SESSION_EXPIRED" });
          navigate("/");
        }
      });
  }, [navigate, dispatch]);

  return (
      <footer className="relative bottom-0 w-full h-[8vh] bg-gray-900 px-2 pb-24 md:pb-32 lg:pb-32 mx-auto overflow-hidden sm:px-6 lg:px-8 z-40">
        <div className="flex justify-center mt-6 space-x-6">
          <a href={linkedin} className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Linkedin</span>
            <BsLinkedin size={16} />
          </a>
          <a href={github} className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">GitHub</span>
            <BsGithub size={16} />
          </a>
        </div>
        <p className="mt-2 text-md text-center text-gray-400">
          © 2023 Del001, All rights reserved.
        </p>
      </footer>
  );
};

export default Footer;
