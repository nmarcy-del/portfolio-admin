import React from "react";
import SuccessAlert from "components/commons/SuccessAlert";
import ErrorAlert from "components/commons/ErrorAlert";

const Alerts = ({ showSuccessAlert, showErrorAlert, message, closeAlert }) => {
  return (
    <>
      {showSuccessAlert && (
        <div className="fixed bottom-20 right-0">
          <SuccessAlert message={message} onClick={closeAlert} />
        </div>
      )}
      {showErrorAlert && (
        <div className="fixed top-0 left-0 w-full">
          <ErrorAlert message={message} onClick={closeAlert} />
        </div>
      )}
    </>
  );
};

export default Alerts;
