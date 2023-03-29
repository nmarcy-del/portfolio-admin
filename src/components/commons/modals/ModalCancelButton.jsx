import React from "react";

const ModalCancelButton = ({ onClick }) => {
  return (
    <button
      className="mb-2 mt-10 md:mb-0 bg-gray-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wide cursor-pointer rounded-md font-semibold text-white hover:shadow-lg hover:bg-gray-700"
      onClick={onClick}
    >
      Annuler
    </button>
  );
};

export default ModalCancelButton;
