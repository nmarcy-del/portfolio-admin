import React from "react";
import SuccessAlert from "components/commons/SuccessAlert";
import ErrorAlert from "components/commons/ErrorAlert";
import WarningAlert from "components/commons/WarningAlert";

const DashboardAlerts = (props) => {
  return (
    <>
      {props.showSuccessAlert && (
        <div className="fixed bottom-0 right-0 z-50">
          <SuccessAlert message={props.message} onClick={props.closeAlert} />
        </div>
      )}
      {props.showErrorAlert && (
        <div className="fixed top-0 left-0 w-full z-50">
          <ErrorAlert message={props.message} onClick={props.closeAlert} />
        </div>
      )}
      {props.showWarningAlert && (
        <div className="fixed top-0 left-0 w-full z-50">
          <WarningAlert message={props.message} onClick={props.closeAlert} />
        </div>
      )}
    </>
  );
};

export default DashboardAlerts;
