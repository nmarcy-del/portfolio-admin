import React from "react";
import SuccessAlert from "components/commons/SuccessAlert";
import ErrorAlert from "components/commons/ErrorAlert";

const Alerts = ({ showSuccessAlert, showErrorAlert, message, closeAlert }) => {
  return (
    <>
      {showSuccessAlert && (
        <div className="fixed bottom-0 right-0 z-50">
          <SuccessAlert message={message} onClick={closeAlert} />
        </div>
      )}
      {showErrorAlert && (
        <div className="fixed top-14 left-0 w-full z-50">
          <ErrorAlert message={message} onClick={closeAlert} />
        </div>
      )}
    </>
  );
};

export default Alerts;
