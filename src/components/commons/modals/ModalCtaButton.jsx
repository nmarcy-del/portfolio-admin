import React from "react";

const ModalCtaButton = (props) => {
  return (
    <>
      {props.actionType === "DELETE" && (
        <button
          className="mb-2 mt-10 md:mb-0 bg-red-600 px-5 py-2 text-sm shadow-sm font-medium tracking-wide cursor-pointer rounded-md font-semibold text-white hover:shadow-lg hover:bg-red-700"
          onClick={props.onClick}
        >
          Supprimer
        </button>
      )}
      {(props.actionType === "NEW" || props.actionType === "EDIT") && (
        <button
          className="mb-2 mt-10 md:mb-0 lg:mb-0 bg-green-600 px-5 py-2 text-sm shadow-sm font-medium tracking-wide cursor-pointer rounded-md font-semibold text-white hover:shadow-lg hover:bg-green-700"
          onClick={props.onClick}
          type="submit"
        >
          {props.actionType === "NEW" && "Ajouter"}
          {props.actionType === "EDIT" && "Editer"}
        </button>
      )}
    </>
  );
};

export default ModalCtaButton;
