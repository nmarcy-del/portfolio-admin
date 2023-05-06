import React from "react";
import ErrorAlert from "components/commons/ErrorAlert";
import SuccessAlert from "components/commons/SuccessAlert";
import { useTranslation } from 'react-i18next';

const Alerts = (props) => {
  const { t } = useTranslation();

  let showAlert = !props.closeAlert;
  const WELCOME_MESSAGE = t("Welcome, please log in.");

  if (props.queueMessage) {
    showAlert = !showAlert;
  }

  return (
    <>
      {showAlert && props.showErrorAlert && (
        <ErrorAlert
          message={t(props.queueMessage.message)}
          onClick={props.closeAlert}
        />
      )}
      {showAlert && props.showSuccessAlert && (
        <SuccessAlert
          message={t(props.queueMessage.message)}
          onClick={props.closeAlert}
        />
      )}
      {!props.showErrorAlert && !props.showSuccessAlert && (
        <p className="text-gray-600 pt-2 text-center text-lg">
          {WELCOME_MESSAGE}
        </p>
      )}
    </>
  );
};

export default Alerts;
