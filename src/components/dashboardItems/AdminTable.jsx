import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "config/axiosInstance";
import appConf from "config/config";
import Modal from "components/commons/modals/Modal";
import AdminCard from "components/commons/dashboard/AdminCard";
import Alerts from "components/commons/dashboard/Alerts";

const AdminTable = (props) => {
  // sortedItems stores the sorted elements that will be displayed in the table.
  const [sortedItems, setSortedItems] = useState([]);
  // refresh is used to trigger a table refresh when needed.
  const [refresh, setRefresh] = useState(false);
  // sortOrder is used to determine the sorting order of the table.
  const sortOrder = useSelector((state) => state.dashboard.sortOrder);
  // modalOptions contains the options for the Modal component.
  const modalOptions = useSelector((state) => state.modal);
  // errorAlert and successAlert are booleans for determining if an error or success alert should be displayed.
  const queueMessage = useSelector((state) => state.modal.notification) || {};

  const dispatch = useDispatch();

  // errorAlert et successAlert sont des booléens pour déterminer si une alerte d'erreur ou de succès doit être affichée.
  const errorAlert = queueMessage && queueMessage.code === "error";
  const successAlert = !errorAlert && queueMessage.code === "success";

  // sortItems sorts the data elements based on the specified sorting order and field.
  const sortItems = useCallback((data, sortOrder, field) => {
    if (field) {
      return data.sort((a, b) => {
        if (sortOrder === "asc") {
          return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
        } else {
          return a[field] > b[field] ? -1 : a[field] < b[field] ? 1 : 0;
        }
      });
    } else {
      return data;
    }
  }, []);

  // getSortField returns the field used for sorting based on the API used.
  const getSortField = useCallback(() => {
    if (props.apiUrl === "skills" || props.apiUrl === "tools") {
      return "order";
    }
    if (props.apiUrl === "works") {
      return "startDate";
    }
    return null;
  }, [props.apiUrl]);

  useEffect(() => {
    axiosInstance
      .get(
        `${appConf.backendBaseUrl}${appConf.backendApiEndpoint}${props.apiUrl}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const sortedItems = sortItems(response.data, sortOrder, getSortField());
        setSortedItems(sortedItems);
      })
      .catch((error) => {
        console.log(error);
      });

    if (modalOptions.refresh) {
      setRefresh(true);
    }
  }, [props.apiUrl, modalOptions.refresh, sortOrder, sortItems, getSortField]);

  useEffect(() => {
    if (modalOptions.refresh) {
      setRefresh(true);
    }
  }, [modalOptions.refresh]);

  // closeAlert closes the current alert by dispatching a "CLOSE_ALERT_MESSAGE" action to the reducer.
  const closeAlert = () => {
    dispatch({ type: "CLOSE_ALERT_MESSAGE" });
  };

  return (
    <div className="pl-10 pr-2 pt-2 md:pl-0 lg:pl-0 lg:pr-0 md:pr-0 md:mr-0 w-full">
      <Modal
        apiUrl={props.apiUrl}
        modalOptions={modalOptions}
        FormContent={props.FormContent}
      />
      <AdminCard
        title={props.title}
        desc={props.desc}
        refresh={refresh}
        items={sortedItems}
        apiUrl={props.apiUrl}
        CardContent={props.CardContent}
        sortOrder={sortOrder}
      />
      <Alerts
        showSuccessAlert={successAlert}
        showErrorAlert={errorAlert}
        message={queueMessage.message}
        closeAlert={closeAlert}
      />
    </div>
  );
};

export default AdminTable;
