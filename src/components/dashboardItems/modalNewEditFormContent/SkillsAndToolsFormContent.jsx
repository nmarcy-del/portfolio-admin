import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axiosInstance from "config/axiosInstance";
import appConf from "config/config";
import ModalCancelButton from "components/commons/modals/ModalCancelButton";
import ModalCtaButton from "components/commons/modals/ModalCtaButton";
import FormTwoFieldOnLine from "components/commons/modals/FormTwoFieldOnLine";
import FormOneLineField from "components/commons/modals/FormOneLineField";
import { useTranslation } from 'react-i18next';

const SkillsAndToolsFormContent = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    img: "",
    order: "",
  });
  const [error, setError] = useState({ message1: null, message2: null });
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  useEffect(() => {
    if (props.itemId) {
      axiosInstance
        .get(
          `${appConf.backendBaseUrl}${appConf.backendApiEndpoint}${props.apiUrl}/${props.itemId}`
        )
        .then((res) => setForm(res.data))
        .catch((error) => {

          if (error.response) {
            console.log(error.response);
          } else {
            console.log(error);
          }

          if (
            error.response &&
            error.response.status &&
            error.response.status === 401
          ) {
            console.log(error.response.status);
            sessionStorage.removeItem("jwt-token");
            dispatch({ type: "SESSION_EXPIRED" });
            navigate("/");
          }
        });
    }
  }, [props.itemId, props.apiUrl, dispatch, navigate]);

  const handleCancel = () => {
    dispatch({ type: "HANDLE_CLOSE_ACTION" });
  };

  const handleSubmit = (form) => {
    if (form.name === "" || !form.name || isNaN(parseInt(form.order))) {
      if (isNaN(parseInt(form.order))) {
        setError({ message2: t("The value of order must be an integer") });
      }

      if (form.name === "" || !form.name) {
        setError({ message1: t("Please enter a name") });
      }

      return;
    }

    if (form.name !== "") {
      setError({ message1: null });
    }

    if (!isNaN(parseInt(form.order))) {
      setError({ message2: null });
    }

    if (props.itemId) {
      axiosInstance
        .put(
          `${appConf.backendBaseUrl}${appConf.backendApiEndpoint}${props.apiUrl}/${props.itemId}`,
          form,
          {
            //headers: headers,
            withCredentials: true,
          }
        )
        .then((response) => {
          dispatch({
            type: "HANDLE_AFTER_SUCCESS",
            message: `${props.itemName} ${t("has been successfully edited.")}`,
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
                message: t("This user does not have the necessary permissions to add, edit, or delete items."),
              });
            } else {
              console.log(error.response);
              dispatch({
                type: "HANDLE_AFTER_ERROR",
                message: `${t("Error while editing")} "${props.itemName}"`,
              });
            }
          } else {
            console.log(error);
            dispatch({
              type: "HANDLE_AFTER_ERROR",
              message: `${t("Error while editing")} "${props.itemName}"`,
            });
          }
        });
    } else {
      axiosInstance
        .post(
          `${appConf.backendBaseUrl}${appConf.backendApiEndpoint}${props.apiUrl}`,
          form,
          {
            //headers: headers,
            withCredentials: true,
          }
        )
        .then((response) => {
          dispatch({
            type: "HANDLE_AFTER_SUCCESS",
            message: `${form.name} ${t("has been successfully added.")}`,
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
                message: t("This user does not have the necessary permissions to add, edit, or delete items."),
              });
            } else {
              console.log(error.response);
              dispatch({
                type: "HANDLE_AFTER_ERROR",
                message: t("Error while adding a new item"),
              });
            }
          } else {
            console.log(error);
            dispatch({
              type: "HANDLE_AFTER_ERROR",
              message: t("Error while adding a new item"),
            });
          }
        });
    }
  };

  return (
    <form
      className="flex flex-col"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(form);
      }}
    >
      <div className="mt-8 md:mt-5 lg:mt-5">
        <FormTwoFieldOnLine
          label1={t("Name")}
          type1="text"
          name1="name"
          value1={form.name}
          onChange1={handleFormChange}
          mandatory1={true}
          label2="Ordre"
          type2="text"
          name2="order"
          value2={form.order}
          onChange2={handleFormChange}
          mandatory2={true}
          error={error}
        />
        <FormOneLineField
          label={t("Image url")}
          type="text"
          name="img"
          value={form.img}
          onChange={handleFormChange}
        />
      </div>
      <div className="flex space-x-4 mx-auto">
        <ModalCancelButton onClick={handleCancel} />
        <ModalCtaButton actionType={props.actionType} />
      </div>
    </form>
  );
};

export default SkillsAndToolsFormContent;
