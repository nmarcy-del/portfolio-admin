import React, { useState } from "react";
import {
  CgWebsite,
  CgTerminal,
  CgBrowser,
  CgBriefcase,
  CgTrack,
  CgMenu,
  CgHomeAlt,
  CgFileDocument,
} from "react-icons/cg";
import LogoutButton from "components/dashboardItems/sidebar/LogoutButton";
import Header from "components/dashboardItems/sidebar/Header";
import SidebarItem from "components/dashboardItems/sidebar/SideBarItem";

const SideBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <div
      className={`
          ${
            isMenuOpen
              ? "fixed w-full mt-0 md:mt-0 xl:mt-0 bg-gray-700 z-50"
              : "fixed flex w-full md:mt-0 xl:mt-0 bg-gray-700"
          } lg:block md:block overflow-y-auto overflow-x-hidden flex-grow
        `}
    >
      <button
        className={`
          ${
            isMenuOpen ? "block bg-gray-700" : "sticky bg-gray-700 w-full"
          } mt-2 py-2 ml-5 text-gray-300 hover:text-gray-400 lg:hidden md:hidden focus:outline-none focus:text-gray-400
        `}
        onClick={handleMenuClick}
      >
        <CgMenu size={32} />
        <p
          className={`
            ${
              isMenuOpen
                ? "absolute top-5 right-1/2"
                : "absolute top-3 right-1/2"
            }
          `}
        >
          Menu
        </p>
      </button>
      <div
        className={`
            ${
              isMenuOpen ? "block" : "hidden"
            } lg:block md:block overflow-y-auto overflow-x-hidden flex-grow
          `}
      >
        <div className="fixed w-64 bg-gray-700 h-full border-gray-400 lg:border-r-4 md:border-r-2">
          <div className="lg:flex lg:items-center lg:justify-between px-6 py-3 border-b lg:border-b-0 lg:pb-0">
            <div className="flex items-center justify-between">
              <Header />
            </div>
          </div>
          <ul className="flex flex-col py-4 space-y-1">
            <SidebarItem
              icon={<CgHomeAlt size={24} />}
              to="home"
              label="Accueil"
              onClick={handleMenuClick}
            />
            <SidebarItem
              icon={<CgWebsite size={24} />}
              to="cms"
              label="CMS"
              onClick={handleMenuClick}
            />
            <SidebarItem
              icon={<CgBriefcase size={24} />}
              to="works"
              label="Expériences"
              onClick={handleMenuClick}
            />
            <SidebarItem
              icon={<CgTerminal size={24} />}
              to="skills"
              label="Compétences"
              onClick={handleMenuClick}
            />
            <SidebarItem
              icon={<CgBrowser size={24} />}
              to="tools"
              label="Outils"
              onClick={handleMenuClick}
            />
            <SidebarItem
              icon={<CgTrack size={24} />}
              to="contactInformations"
              label="Coordonnées"
              onClick={handleMenuClick}
            />
            <SidebarItem
              icon={<CgFileDocument size={24} />}
              to="cv"
              label="Mon CV"
              onClick={handleMenuClick}
            />
            <LogoutButton />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
