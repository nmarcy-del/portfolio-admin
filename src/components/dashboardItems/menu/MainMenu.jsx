import React from "react";
import MenuItem from "components/dashboardItems/menu/MenuItem";
import {
  CgHomeAlt,
  CgWebsite,
  CgBriefcase,
  CgTerminal,
  CgBrowser,
  CgTrack,
  CgFileDocument,
} from "react-icons/cg";
import LogoutButton from "components/dashboardItems/menu/LogoutButton";

const MainMenu = (props) => {
  return (
    <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-700 md:dark:bg-gray-800">
      <p className="relative flex flex-row items-center h-11 text-gray-300 pr-6 pb-5">
        Bienvenue, {props.adminUsername}
      </p>
      <ul className="space-y-2 font-medium">
        <MenuItem
          icon={<CgHomeAlt size={24} />}
          to="home"
          label="Accueil"
          onClick={props.handleMenuClick}
        />
        <MenuItem
          icon={<CgWebsite size={24} />}
          to="cms"
          label="CMS"
          onClick={props.handleMenuClick}
        />
        <MenuItem
          icon={<CgBriefcase size={24} />}
          to="works"
          label="Expériences"
          onClick={props.handleMenuClick}
        />
        <MenuItem
          icon={<CgTerminal size={24} />}
          to="skills"
          label="Compétences"
          onClick={props.handleMenuClick}
        />
        <MenuItem
          icon={<CgBrowser size={24} />}
          to="tools"
          label="Outils"
          onClick={props.handleMenuClick}
        />
        <MenuItem
          icon={<CgTrack size={24} />}
          to="contactInformations"
          label="Coordonnées"
          onClick={props.handleMenuClick}
        />
        <MenuItem
          icon={<CgFileDocument size={24} />}
          to="cv"
          label="Mon CV"
          onClick={props.handleMenuClick}
        />
        <LogoutButton />
      </ul>
    </div>
  );
};

export default MainMenu;