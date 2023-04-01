import React, { useState } from "react";
import { useSelector } from "react-redux";
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
import { RiDatabase2Line } from "react-icons/ri";
import LogoutButton from "components/dashboardItems/sidebar/LogoutButton";
import SidebarItem from "components/dashboardItems/sidebar/SideBarItem";

const SideBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const adminUsername = useSelector((state) => state.auth.adminUsername);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="fixed top-0 z-40 w-full bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={handleMenuClick}
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-300 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <CgMenu
                  className="w-6 h-6"
                />
              </button>
              <span className="flex ml-2 md:mr-24">
                <RiDatabase2Line
                  size={32}
                   className="text-green-500 h-8 mr-3 ml-3"
                  alt="Admin Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-gray-200">
                  Mon admin
                </span>
              </span>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-30 w-64 h-screen pt-20 transition-transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-700 md:dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-700 md:dark:bg-gray-800">
          <p className="relative flex flex-row items-center h-11 text-gray-300 pr-6 pb-5">Bienvenue, {adminUsername}</p>
          <ul className="space-y-2 font-medium">
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
      </aside>
    </div>
  );
};

export default SideBar;
