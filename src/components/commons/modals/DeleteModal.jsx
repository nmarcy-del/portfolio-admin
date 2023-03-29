import React from "react";
import { useDispatch } from "react-redux";
import { SlClose } from "react-icons/sl";
import axiosInstance from "config/axiosInstance"
import appConf from "config/config";
import ModalCancelButton from "components/commons/modals/ModalCancelButton";
import ModalCtaButton from "components/commons/modals/ModalCtaButton";

const DeleteModal = (props) => {
  const dispatch = useDispatch();

  const handleDelete = (event) => {
    if (props.itemId !== "CV") {
      event.preventDefault();
      axiosInstance
        .delete(
          `${appConf.backendApiEndpoint}${props.apiUrl}/${props.itemId}`,
          {
            //headers: headers,
            withCredentials: true,
          }
        )
        .then((response) => {
          dispatch({
            type: "HANDLE_AFTER_SUCCESS",
            message: `${props.itemName} à été supprimé`,
          });
        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: "HANDLE_AFTER_ERROR",
            message: `Erreur lors de la suppression de ${props.itemName}`,
          });
        });
    }

    if (props.itemId === "CV") {
      event.preventDefault();
      axiosInstance
      .delete(
        `${appConf.backendApiEndpoint}cv`,
        {
          //headers: headers,
          withCredentials: true,
        }
      )
      .then((response) => {
        dispatch({
          type: "HANDLE_AFTER_SUCCESS",
          message: `Votre CV à été supprimé`,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "HANDLE_AFTER_ERROR",
          message: `Erreur lors de la tentative de supression du CV`,
        });
      });
    }
  };

  const handleCancel = () => {
    dispatch({ type: "HANDLE_CLOSE_ACTION" });
  };

  return (
    <div className="p-3 mt-2 text-center space-x-4 md:block">
      <div>
        <SlClose className="mx-auto text-red-600" size={48} />
        <p className="mt-5 text-gray-300 text-lg">Êtes-vous sûr ?</p>
        {props.itemId && props.itemId !== "CV" && (
        <p className="mt-2 text-gray-500 text-sm">
          Vous allez supprimer "{props.itemName}", cette action est
          irréversible.
        </p>
        )}
        {props.itemId === "CV" && (
          <p className="mt-2 text-gray-500 text-sm">
            Vous allez supprimer votre CV, cette action est
            irréversible.
          </p>
        )}
      </div>
      <ModalCancelButton onClick={handleCancel} />
      <ModalCtaButton actionType={props.actionType} onClick={handleDelete} />
    </div>
  );
};

export default DeleteModal;
