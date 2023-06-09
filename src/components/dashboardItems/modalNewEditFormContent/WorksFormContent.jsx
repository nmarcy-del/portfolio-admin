import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axiosInstance from "config/axiosInstance";
import appConf from "config/config";
import ModalCancelButton from "components/commons/modals/ModalCancelButton";
import ModalCtaButton from "components/commons/modals/ModalCtaButton";
import FormTwoFieldOnLine from "components/commons/modals/FormTwoFieldOnLine";
import FormTextArea from "components/commons/modals/FormTextArea";
import FormOneLineField from "components/commons/modals/FormOneLineField";
import { useTranslation } from 'react-i18next';

const WorksFormContent = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    img: "",
    place: "",
    desc: "",
    technologies: "",
    startDate: "",
    endDate: "",
  });
  const [titlePlaceError, setTitlePlaceError] = useState({
    message1: null,
    message2: null,
  });

  const [descError, setDescError] = useState({message: null});
  const [startDateError, setStartDateError] = useState({message1: null});
  const [techError, setTechError]= useState({message: null});

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const formatDate = (dateString) => {
    if (dateString && dateString !== "") {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return "";
  };

  useEffect(() => {
    if (props.itemId) {
      axiosInstance
        .get(
          `${appConf.backendBaseUrl}${appConf.backendApiEndpoint}${props.apiUrl}/${props.itemId}`
        )
        .then((res) => {
          const formattedStartDate = formatDate(res.data.startDate);
          const formattedEndDate = formatDate(res.data.endDate);
          setForm({
            ...res.data,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
          });
        })
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
  }, [props.itemId, props.apiUrl, navigate, dispatch]);

  const handleCancel = () => {
    dispatch({ type: "HANDLE_CLOSE_ACTION" });
  };

  const handleSubmit = (form) => {
    console.log(form.endDate);
    if (!form.title || form.title === "") {
      setTitlePlaceError({message1: t("Please enter a title")});
      return;
    } else {
      setTitlePlaceError({message1: null})
    }
    if (!form.place || form.place === "") {
      setTitlePlaceError({message2: t("Please enter a location")})
      return;
    } else {
      setTitlePlaceError({message2: null})
    }
    if (!form.desc || form.desc === "") {
      setDescError({message: t("Please enter a description")})
      return;
    } else {
      setDescError({message: null})
    }
    if (!form.technologies || form.technologies === "") {
      setTechError({message: t("Please enter technologies")})
      return;
    } else {
      setTechError({message: null})
    }
    if (!form.startDate || form.startDate === "") {
      setStartDateError({message1: t("Please enter a start date")})
      return;
    } else {
      setStartDateError({message1: null})
    }
    
    if (form.endDate === "") {
      form.endDate = null;
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
            message: `${form.title} ${t("has been successfully added.")}`,
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
      <div className="mt-8 md:mt-5 lg:mt-5 mb-0">
        <FormTwoFieldOnLine
          label1={t("Title")}
          type1="text"
          name1="title"
          value1={form.title}
          onChange1={handleFormChange}
          mandatory1={true}
          label2="Lieu"
          type2="text"
          name2="place"
          value2={form.place}
          onChange2={handleFormChange}
          mandatory2={true}
          error={titlePlaceError}
        />
        <FormTextArea
          label={t("Description")}
          type="text"
          name="desc"
          value={form.desc}
          onChange={handleFormChange}
          mandatory={true}
          height="56"
          error={descError}
        />
        <FormTextArea
          label={t("Technologies")}
          type="text"
          name="technologies"
          value={form.technologies}
          onChange={handleFormChange}
          mandatory={true}
          height="44"
          error={techError}
        />
        <FormTwoFieldOnLine
          label1={`${t("From")}:`}
          type1="date"
          name1="startDate"
          value1={form.startDate}
          onChange1={handleFormChange}
          mandatory1={true}
          label2={`${t("to")}:`}
          type2="date"
          name2="endDate"
          value2={form.endDate}
          onChange2={handleFormChange}
          error={startDateError}
        />
        <FormOneLineField
          label={t("Image url")}
          type="text"
          name="img"
          value={form.img}
          onChange={handleFormChange}
        />
      </div>
      <div className="flex space-x-4 mx-auto mt-2">
        <ModalCancelButton onClick={handleCancel} />
        <ModalCtaButton actionType={props.actionType} />
      </div>
    </form>
  );
};

export default WorksFormContent;
