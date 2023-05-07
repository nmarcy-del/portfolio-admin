import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { RiDatabase2Line } from "react-icons/ri";
import axiosInstance from "config/axiosInstance";
import appConf from "config/config";
import LoginForm from "components/loginPageItems/LoginForm";
import Alerts from "components/loginPageItems/Alerts";
import LanguageSwitcher from "components/commons/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  // Get the translation engine
  const { t } = useTranslation();

  // State for form input values
  const [form, setForm] = useState({ username: "", password: "" });

  // State for showing/hiding alerts
  const [isAlertClose, setIsAlertClose] = useState(true);

  // Get backend base URL and auth endpoint from config
  const { backendBaseUrl, backendAuthEndpoint, appName } = appConf;

  // Redux hooks for dispatching actions and selecting data from state
  const dispatch = useDispatch();
  const queueMessage =
    useSelector((state) => state.auth.authNotification) || {};

  // Navigate hook for redirecting user to dashboard
  const navigate = useNavigate();

  // Function for closing alerts
  const closeAlert = () => {
    setIsAlertClose(true);
    dispatch({ type: "CLOSE_LOGIN_ALERT" });
  };

  // Function for handling API errors
  const handleError = (error) => {
    if (error.response) {
      dispatch({ type: "LOGIN_CREDENTIAL_ERROR" });
      console.error(error.response.data.message);
    } else {
      dispatch({ type: "LOGIN_GENERIC_ERROR" });
    }
  };

  // Function for getting CSRF token
  const getCsrfToken = async (token) => {
    axiosInstance.interceptors.request.use((config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });
    axiosInstance.post(`${backendBaseUrl}/csrf/csrf`).then((response) => {
      console.log(response.data.message);
    });
  };

  // Function for handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `${backendBaseUrl}${backendAuthEndpoint}login`,
        { username: form.username, password: form.password },
        { withCredentials: true }
      );
      const { token } = response.data.token;

      // Store JWT token in local storage
      sessionStorage.setItem("jwt-token", token);

      // Dispatch success action and navigate to dashboard
      dispatch({
        type: "LOGIN_SUCCESS",
        adminUsername: response.data.username,
        adminCanEdit: response.data.canEdit
      });
      navigate("/dashboard/home");

      // Get CSRF token
      getCsrfToken(token);
    } catch (err) {
      handleError(err);
    }
  };

  // Function for handling form input changes
  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const showErrorAlert = queueMessage && queueMessage.code === "error";
  const showSuccessAlert = !showErrorAlert && queueMessage.code === "success";

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-center items-center">
      <h1 className="text-4xl text-white mt-2">{t(appName)}</h1>
      <main className="bg-white md:max-w-sm sm:max-w-sm mx-auto p-8 my-10 shadow-1cs shadow-black w-11/12">
        <section className="px-3">
          <div className="flex items-center justify-center pr-20 mb-5">
            <RiDatabase2Line className="text-6xl text-green-600 mr-5" />
            <h2 className="text-2xl text-gray-700">{t("Admin")}</h2>
          </div>
          <Alerts
            isAlertClose={isAlertClose}
            showErrorAlert={showErrorAlert}
            showSuccessAlert={showSuccessAlert}
            queueMessage={queueMessage}
            closeAlert={closeAlert}
          />
        </section>
        <section className="px-3 mt-5">
          <LoginForm
            form={form}
            handleFormChange={handleFormChange}
            handleSubmit={handleSubmit}
          />
        </section>
        <div>
        </div>
      </main>
        <LanguageSwitcher/>
    </div>
  );
};

export default LoginPage;
