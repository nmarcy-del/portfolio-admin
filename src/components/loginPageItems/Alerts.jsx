import React from "react";
import ErrorAlert from "components/commons/ErrorAlert";
import SuccessAlert from "components/commons/SuccessAlert";

const Alerts = (props) => {
  let showAlert = !props.closeAlert;
  const WELCOME_MESSAGE = "Bienvenue, veuillez vous connecter";

  if (props.queueMessage) {
    showAlert = !showAlert;
  }

  return (
    <>
      {showAlert && props.showErrorAlert && (
        <ErrorAlert
          message={props.queueMessage.message}
          onClick={props.closeAlert}
        />
      )}
      {showAlert && props.showSuccessAlert && (
        <SuccessAlert
          message={props.queueMessage.message}
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
