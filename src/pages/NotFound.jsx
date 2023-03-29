import React from "react";
import { useNavigate } from "react-router-dom";
import { TbError404 } from "react-icons/tb";

const NotFound = () => {
  const navigate = useNavigate();

  // Function to return to the dashboard
  const returnToDashboard = () => {
    navigate("/dashboard/home");
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-center items-center mx-auto">
      <h1 className="text-gray-200  text-6xl md:text-6xl lg:text-8xl mb-5">Oops..</h1>
      <h2 className="text-gray-500 text-2xl md:text-2xl lg:text-4xl mb-2">Page Introuvable</h2>
        <p className="text-gray-400 text-md md:text-md lg:text-2xl mb-20 text-center">
          La page que vous cherchez est introuvable ou n'existe tout simplement
          pas.
        </p>
      <TbError404 className="text-white text-4xl md:text-4xl lg:text-8xl" size={120} />
      <button className="text-gray-600" onClick={returnToDashboard}>
        Retourner à la page d'accueil
      </button>
    </div>
  );
};

export default NotFound;
