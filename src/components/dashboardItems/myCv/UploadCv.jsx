import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axiosInstance from "config/axiosInstance";
import appConf from "config/config";
import CtaButton from "components/commons/CtaButton";

const UploadCv = (props) => {
  const [file, setFile] = useState(null);
  const [fileSize, setFileSize] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, [setFile, setFileSize]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileSize(e.target.files[0].size / (1024 * 1024));
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("cv", file);

    try {
      const response = await axiosInstance.post(
        `${appConf.backendApiEndpoint}cv`,
        formData,
        {
          withCredentials: true,
        }
      );
      props.onUpload(response.data.filename);
      setFileSize(null);
      setFile(null);
    } catch (error) {
      if (error.response && error.response.status) {
        console.log(error.response.status);
        if (error.response.status === 401) {
          sessionStorage.removeItem("jwt-token");
          dispatch({ type: "SESSION_EXPIRED" });
          navigate("/");
        } else if (
          error.response.status === 403 &&
          error.response.data.message === "User doesn't have write access"
        ) {
          dispatch({
            type: "HANDLE_AFTER_WARNING",
            message: `Cet utilisateur n'a pas les droit nécessaire pour ajouter, éditer ou supprimer des éléments.`,
          });
        } else {
          console.log(error.response);
          dispatch({
            type: "HANDLE_AFTER_ERROR",
            message: `Erreur lors de l'upload du fichier`,
          });
        }
      } else {
        console.log(error);
        dispatch({
          type: "HANDLE_AFTER_ERROR",
          message: `Erreur lors de l'upload du fichier`,
        });
      }
    }
  };

  const handleDownloadCv = async () => {
    try {
      // Télécharger le fichier
      const response = await axiosInstance.get(
        `${appConf.backendApiEndpoint}cv/download/${props.filename}`,
        {
          withCredentials: true,
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      const date = new Date();
      const day = date.getDate();
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = `0${month}`;
      }
      const year = date.getFullYear();
      const exportedFilename = `cv-${appConf.author}-${day}${month}${year}`;
      a.download = `${exportedFilename}.pdf`;
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error downloading CV:", error);
    }
  };

  const handleDeleteAction = () => {
    dispatch({ type: "HANDLE_DELETE_CV_ACTION" });
  };

  return (
    <div className="w-full pt-8 md:pt-0 lg:pt-0 pr-0 md:pr-0 lg:pr-4 pb-0 pl-0 mt-0 mb-0 md:mb-8 lg:mb-8 mr-auto mb-0 ml-auto sm:flex sm:items-center sm:justify-between">
      <div className="flex flex-col mt-4 items-start justify-center">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="text-sm mt-1 font-semi-bold text-gray-400"
        />
        {fileSize > 0 && (
          <p className="text-sm mt-1 font-semi-bold text-gray-400">
            File size: {fileSize.toFixed(2)} MB
          </p>
        )}
        {file && <CtaButton title="Upload" onClick={handleUpload} />}
      </div>
      {props.fileExists && (
        <div className="mt-3 flex space-between space-x-2 md:space-x-1 lg:space-x-2 justify-start items-center lg:justify-end">
          <CtaButton
            title="Télécharger"
            onClick={handleDownloadCv}
            actionType="DOWNLOAD"
          />
          <CtaButton
            title="Supprimer"
            onClick={handleDeleteAction}
            actionType="DELETE"
          />
        </div>
      )}
    </div>
  );
};

export default UploadCv;
