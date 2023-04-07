import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CgMenu } from "react-icons/cg";
import Header from "components/dashboardItems/menu/Header";
import MainMenu from "components/dashboardItems/menu/MainMenu";

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const adminUsername = useSelector((state) => state.auth.adminUsername);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
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
              <Header />
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-menu"
        className={`fixed top-0 left-0 z-30 w-64 h-screen pt-20 transition-transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-700 md:dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <MainMenu handleMenuClick={handleMenuClick} adminUsername={adminUsername} />
      </aside>
    </>
  );
};

export default Menu;
