import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { SlClose } from "react-icons/sl";
import axiosInstance from "config/axiosInstance";
import appConf from "config/config";
import ModalCancelButton from "components/commons/modals/ModalCancelButton";
import ModalCtaButton from "components/commons/modals/ModalCtaButton";
import { useTranslation, Trans } from 'react-i18next';

const DeleteModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  let itemName = props.itemName;

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
            message: `${itemName} ${t("has been deleted")}`,
          });
        })
        .catch((error) => {
          if (error.response && error.response.status) {
            console.log(error.response.status);
            if (error.response.status === 401) {
              sessionStorage.removeItem("jwt-token");
              dispatch({ type: "SESSION_EXPIRED" });
              navigate("/");
            } else if (
              error.response.status === 403 &&
              error.response.data.message === "User doesn't have write access"
            ) {
              dispatch({
                type: "HANDLE_AFTER_WARNING",
                message: t(`This user does not have the necessary permissions to add, edit, or delete items.`),
              });
            } else {
              console.log(error.response);
              dispatch({
                type: "HANDLE_AFTER_ERROR",
                message: `${t("Error while deleting")} ${itemName}"`,
              });
            }
          } else {
            console.log(error);
            dispatch({
              type: "HANDLE_AFTER_ERROR",
              message: `${t("Error while deleting")} ${itemName}"`,
            });
          }
        });
    }

    if (props.itemId === "CV") {
      event.preventDefault();
      axiosInstance
        .delete(`${appConf.backendApiEndpoint}cv`, {
          //headers: headers,
          withCredentials: true,
        })
        .then((response) => {
          dispatch({
            type: "HANDLE_AFTER_SUCCESS",
            message: t(`Your resume has been deleted.`),
          });
        })
        .catch((error) => {
          if (error.response && error.response.status) {
            console.log(error.response.status);
            if (error.response.status === 401) {
              sessionStorage.removeItem("jwt-token");
              dispatch({ type: "SESSION_EXPIRED" });
              navigate("/");
            } else if (
              error.response.status === 403 &&
              error.response.data.message === "User doesn't have write access"
            ) {
              dispatch({
                type: "HANDLE_AFTER_WARNING",
                message: t(`This user does not have the necessary permissions to add, edit, or delete items.`),
              });
            } else {
              console.log(error.response);
              dispatch({
                type: "HANDLE_AFTER_ERROR",
                message: t(`Error while attempting to delete the resume.`),
              });
            }
          } else {
            console.log(error);
            dispatch({
              type: "HANDLE_AFTER_ERROR",
              message: t(`Error while attempting to delete the resume.`),
            });
          }
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
        <p className="mt-5 text-gray-300 text-lg">{t("Êtes-vous sûr ?")}</p>
        {props.itemId && props.itemId !== "CV" && (
          <p className="mt-2 text-gray-500 text-sm">
            <Trans i18nKey='delete-item'>
                {{itemName}}
            </Trans>
          </p>
        )}
        {props.itemId === "CV" && (
          <p className="mt-2 text-gray-500 text-sm">
            {t("You are about to delete your resume, this action is irreversible.")}
          </p>
        )}
      </div>
      <ModalCancelButton onClick={handleCancel} />
      <ModalCtaButton actionType={props.actionType} onClick={handleDelete} />
    </div>
  );
};

export default DeleteModal;
