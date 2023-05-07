import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "config/axiosInstance";
import appConf from "config/config";
import UploadCv from "components/dashboardItems/myCv/UploadCv";
import PdfViewer from "components/dashboardItems/myCv/PdfViewer";
import Modal from "components/commons/modals/Modal";
import DashboardAlerts from "components/commons/dashboard/DashboardAlerts";
import { useTranslation } from 'react-i18next';

const MyCv = () => {
  const { t } = useTranslation();

  const [pdfUrl, setPdfUrl] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [fileExists, setFileExists] = useState(false);
  const [filename, setFilename] = useState(null);
  const modalOptions = useSelector((state) => state.modal);
  const queueMessage = useSelector((state) => state.modal.notification) || {};
  const dispatch = useDispatch();

  const errorAlert = queueMessage && queueMessage.code === "error";
  const successAlert = !errorAlert && queueMessage.code === "success";
  const warningAlert = !successAlert && !errorAlert && queueMessage.code === "warning";

  const checkIfFileExists = async (filename) => {
    try {
      const response = await axiosInstance.get(
        `${appConf.backendApiEndpoint}cv/download/${filename}`,
        {
          withCredentials: true,
        }
      );
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const fetchExistingPdf = async () => {
      try {
        const response = await axiosInstance.get(
          `${appConf.backendApiEndpoint}cv`,
          {
            withCredentials: true,
          }
        );
        const currentFilename = response.data.filename;
        const fileUrl = `${appConf.backendBaseUrl}/public/${currentFilename}`;
        setFileExists(await checkIfFileExists(currentFilename));

        if (fileExists) {
          setPdfUrl(fileUrl);
          setFilename(currentFilename);
        }
      } catch (error) {
        console.error("Error fetching existing PDF:", error);
      }
    };

    fetchExistingPdf();
  }, [refresh, fileExists]);

  const closeAlert = () => {
    dispatch({ type: "CLOSE_ALERT_MESSAGE" });
  };

  useEffect(() => {
    if (!modalOptions.refresh) {
      setRefresh(false);
    } else {
      setRefresh(true);
    }
  }, [modalOptions.refresh]);

  const handleUploadSuccess = (filename) => {
    const fileUrl = `${appConf.backendBaseUrl}/public/${filename}`;
    setFileExists(checkIfFileExists(filename));
    if (fileExists) {
      setPdfUrl(fileUrl);
    }
  };

  return (
    <div className="w-full min-h-fit pt-20 pl-6 pr-3 pb-4 mt-0 mr-auto mb-0 ml-auto text-gray-300">
      <div className="w-full mt-0 mr-auto mb-0 ml-auto max-w-7xl md:pl-2 md:pr-4 lg:px-0">
        <div className="w-full mt-0 mr-auto mb-0 ml-auto md:max-w-lg lg:max-w-4xl">
          <h1 className="text-xl font-bold text-gray-300">
            {t("Download and view my resume.")}
          </h1>
          <UploadCv
            onUpload={handleUploadSuccess}
            fileExists={fileExists}
            filename={filename}
          />
          <div>
            {fileExists && <PdfViewer pdfUrl={pdfUrl} refresh={refresh} />}
          </div>
        </div>
      </div>
      <Modal modalOptions={modalOptions} />
      <DashboardAlerts
        showSuccessAlert={successAlert}
        showErrorAlert={errorAlert}
        showWarningAlert={warningAlert}
        message={queueMessage.message}
        closeAlert={closeAlert}
      />
    </div>
  );
};

export default MyCv;
