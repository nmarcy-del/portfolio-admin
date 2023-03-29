import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "config/axiosInstance";
import appConf from "config/config";
import ModalCancelButton from "components/commons/modals/ModalCancelButton";
import ModalCtaButton from "components/commons/modals/ModalCtaButton";
import FormTwoFieldOnLine from "components/commons/modals/FormTwoFieldOnLine";
import FormOneLineField from "components/commons/modals/FormOneLineField";

const ContactInformationsFormContent = (props) => {
  const dispatch = useDispatch();
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
    github: ""
  });
  const [titleSectionError, setTitleSectionError] = useState({
    message1: null,
    message2: null,
  });
  const [contentError, setContentError] = useState({ message: null });
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
        .catch((err) => console.log(err));
    }
  }, [props.itemId, props.apiUrl]);

  const handleCancel = () => {
    dispatch({ type: "HANDLE_CLOSE_ACTION" });
  };

  const handleSubmit = (form) => {
    if (
      form.title === "" ||
      !form.title ||
      form.section === "" ||
      !form.section
    ) {
      if (form.title === "" || !form.title) {
        setTitleSectionError({ message1: "Veuillez saisir un titre" });
      }
      if (form.section === "" || !form.section) {
        setTitleSectionError({ message2: "Veuillez saisir une section" });
      }
      return;
    } else {
      setTitleSectionError({ message1: null, message2: null });
    }

    if (form.content === "" || !form.content) {
      setContentError({ message: "Le contenu ne peut être vide" });
      return;
    } else {
      setContentError({ message: null });
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
          console.log(error);
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
            message: `${form.title} à bien été ajouté`,
          });
        })
        .catch((error) => {
          console.log(error);
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
          error={titleSectionError}
        />
        <FormOneLineField
          label="Adresse"
          type="text"
          name="addressL1"
          value={form.addressL1}
          onChange={handleFormChange}
          mandatory={true}
          error={contentError}
        />
        <FormOneLineField
          label="Complément d'adresse"
          type="text"
          name="addressL2"
          value={form.addressL2}
          onChange={handleFormChange}
          mandatory={true}
          error={contentError}
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
          error={titleSectionError}
        />
        <FormOneLineField
          label="Téléphone"
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleFormChange}
          mandatory={true}
          error={contentError}
        />
        <FormOneLineField
          label="E-mail"
          type="text"
          name="email"
          value={form.email}
          onChange={handleFormChange}
          mandatory={true}
          error={contentError}
        />
        <FormOneLineField
          label="Linkedin"
          type="text"
          name="linkedin"
          value={form.linkedin}
          onChange={handleFormChange}
          mandatory={true}
          error={contentError}
        />
        <FormOneLineField
          label="Linkedin"
          type="text"
          name="github"
          value={form.github}
          onChange={handleFormChange}
          mandatory={true}
          error={contentError}
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
