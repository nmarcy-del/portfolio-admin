import React from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <div className="sticky bottom-0 w-full h-1/8 bg-gray-900 mt-2 px-2 pb-2 mx-auto overflow-hidden sm:px-6 lg:px-8 z-50">
        <div className="flex justify-center mt-6 space-x-6">
          <a href="/" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Linkedin</span>
            <BsLinkedin size={16} />
          </a>
          <a href="/" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">GitHub</span>
            <BsGithub size={16} />
          </a>
        </div>
        <p className="mt-2 text-md text-center text-gray-400">
          © 2021 Del001, All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
