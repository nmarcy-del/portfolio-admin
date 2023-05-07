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

const ContactInformationsFormContent = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    addressName: "",
    name: "",
    addressL1: "",
    addressL2: "",
    postalCode: "",
    city: "",
    phone: "",
    email: "",
    linkedin: "",
    github: "",
  });
  const [namesError, setNamesError] = useState({
    message1: null,
    message2: null,
  });
  const [cityNpaError, setCityNpaError] = useState({
    message1: null,
    message2: null,
  });
  const [addressError, setAddressError] = useState({ message: null });
  const [emailError, setEmailError] = useState({ message: null });

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
  }, [props.itemId, props.apiUrl, navigate, dispatch]);

  const handleCancel = () => {
    dispatch({ type: "HANDLE_CLOSE_ACTION" });
  };

  const handleSubmit = (form) => {
    if (
      form.addressName === "" ||
      !form.addressName ||
      form.name === "" ||
      !form.name
    ) {
      if (form.name === "" || !form.name) {
        setNamesError({ message2: t("Please enter your full name") });
      }
      if (form.addressName === "" || !form.addressName) {
        setNamesError({ message1: t("Please enter an address name") });
      }
      return;
    } else {
      setNamesError({ message1: null, message2: null });
    }

    if (form.addressL1 === "" || !form.addressL1) {
      setAddressError({ message: t("The address cannot be empty") });
      return;
    } else {
      setAddressError({ message: null });
    }

    if (
      form.postalCode === "" ||
      !form.postalCode ||
      form.city === "" ||
      !form.city
    ) {
      if (form.city === "" || !form.city) {
        setCityNpaError({ message2: t("Please enter a city") });
      }
      if (form.postalCode === "" || !form.postalCode) {
        setCityNpaError({ message1: t("Please enter a zip code") });
      }
      return;
    } else {
      setCityNpaError({ message1: null, message2: null });
    }

    if (form.email === "" || !form.email) {
      setEmailError({ message: t("The email cannot be empty") });
      return;
    } else {
      setEmailError({ message: null });
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
            message: `${form.addressName} ${t("has been successfully added.")}`,
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
          label1={t("Address name")}
          type1="text"
          name1="addressName"
          value1={form.addressName}
          onChange1={handleFormChange}
          mandatory1={true}
          label2="Nom complet"
          type2="text"
          name2="name"
          value2={form.name}
          onChange2={handleFormChange}
          mandatory2={true}
          error={namesError}
        />
        <FormOneLineField
          label={t("Address")}
          type="text"
          name="addressL1"
          value={form.addressL1}
          onChange={handleFormChange}
          mandatory={true}
          error={addressError}
        />
        <FormOneLineField
          label={t("Address line 2")}
          type="text"
          name="addressL2"
          value={form.addressL2}
          onChange={handleFormChange}
        />
        <FormTwoFieldOnLine
          label1={t("Zip code")}
          type1="text"
          name1="postalCode"
          value1={form.postalCode}
          onChange1={handleFormChange}
          mandatory1={true}
          label2="Ville"
          type2="text"
          name2="city"
          value2={form.city}
          onChange2={handleFormChange}
          mandatory2={true}
          error={cityNpaError}
        />
        <FormOneLineField
          label={t("Phone")}
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleFormChange}
        />
        <FormOneLineField
          label={t("E-mail")}
          type="text"
          name="email"
          value={form.email}
          onChange={handleFormChange}
          mandatory={true}
          error={emailError}
        />
        <FormOneLineField
          label="Linkedin"
          type="text"
          name="linkedin"
          value={form.linkedin}
          onChange={handleFormChange}
        />
        <FormOneLineField
          label="Github"
          type="text"
          name="github"
          value={form.github}
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

export default ContactInformationsFormContent;
