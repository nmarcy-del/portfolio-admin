import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import DeleteModal from "components/commons/modals/DeleteModal";
import NewOrEditModal from "components/commons/modals/NewOrEditModal";
import { CgClose } from "react-icons/cg";

const Modal = ({ ...props }) => {
  const dispatch = useDispatch();

  const handleCloseAction = () => {
    dispatch({ type: "HANDLE_CLOSE_ACTION" });
  };

  useEffect(() => {
    if (props.modalOptions.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [props.modalOptions.isOpen]);

  return (
    <div
      className={`min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover ${
        props.modalOptions.isOpen ? "visible" : "invisible"
      }`}
      id={(props.modalOptions.itemId ? String(props.modalOptions.itemId) + "_" : "") + props.modalOptions.action}
    >
      <div
        className="absolute bg-black opacity-80 inset-0 z-0"
        onClick={handleCloseAction}
      />
      <div className="w-11/12 md:w-full max-h-[75%] md:max-h-fit lg:max-h-fit lg:w-full max-w-lg px-3 py-2 md:p-5 lg:p-5 relative mx-auto my-auto rounded-md shadow-lg bg-gray-800 overflow-y-auto max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        {props.modalOptions.action === "EDIT" ||
        props.modalOptions.action === "NEW" ? (
          <NewOrEditModal
            actionType={props.modalOptions.action}
            itemId={props.modalOptions.itemId}
            apiUrl={props.apiUrl}
            itemName={props.modalOptions.itemName}
            FormContent={props.FormContent}
          />
        ) : (
          <DeleteModal
            actionType={props.modalOptions.action}
            itemId={props.modalOptions.itemId}
            apiUrl={props.apiUrl}
            itemName={props.modalOptions.itemName}
          />
        )}
        <button
          className="absolute top-0 right-3 mt-3 mr-3 focus:outline-none hover:text-red-800"
          onClick={handleCloseAction}
        >
          <CgClose size={20} />
        </button>
      </div>
    </div>
  );
};

export default Modal;