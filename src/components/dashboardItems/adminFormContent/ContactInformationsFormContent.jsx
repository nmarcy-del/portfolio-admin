import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axiosInstance from "config/axiosInstance";
import appConf from "config/config";
import ModalCancelButton from "components/commons/modals/ModalCancelButton";
import ModalCtaButton from "components/commons/modals/ModalCtaButton";
import FormTwoFieldOnLine from "components/commons/modals/FormTwoFieldOnLine";
import FormOneLineField from "components/commons/modals/FormOneLineField";

const ContactInformationsFormContent = (props) => {
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
        setNamesError({ message2: "Veuillez saisir votre nom complet" });
      }
      if (form.addressName === "" || !form.addressName) {
        setNamesError({ message1: "Veuillez saisir un nom d'adresse" });
      }
      return;
    } else {
      setNamesError({ message1: null, message2: null });
    }

    if (form.addressL1 === "" || !form.addressL1) {
      setAddressError({ message: "L'adresse ne peut être vide" });
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
        setCityNpaError({ message2: "Veuillez saisir une ville" });
      }
      if (form.postalCode === "" || !form.postalCode) {
        setCityNpaError({ message1: "Veuillez saisir un code postal" });
      }
      return;
    } else {
      setCityNpaError({ message1: null, message2: null });
    }

    if (form.email === "" || !form.email) {
      setEmailError({ message: "L'email ne peut être vide" });
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
            message: `${props.itemName} à correctement été édité`,
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

          dispatch({
            type: "HANDLE_AFTER_ERROR",
            message: `Erreur lors de l'édition de ${props.itemName}`,
          });
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
            message: `${form.addressName} à bien été ajouté`,
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

          dispatch({
            type: "HANDLE_AFTER_ERROR",
            message: `Erreur lors de l'ajout d'un nouvel élément`,
          });
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
          label1="Nom de l'adresse"
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
          label="Adresse"
          type="text"
          name="addressL1"
          value={form.addressL1}
          onChange={handleFormChange}
          mandatory={true}
          error={addressError}
        />
        <FormOneLineField
          label="Complément d'adresse"
          type="text"
          name="addressL2"
          value={form.addressL2}
          onChange={handleFormChange}
        />
        <FormTwoFieldOnLine
          label1="Code postal"
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
          label="Téléphone"
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleFormChange}
        />
        <FormOneLineField
          label="E-mail"
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
