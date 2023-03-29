import React from "react";
import { useDispatch } from "react-redux";

const AddButton = (props) => {
  const dispatch = useDispatch();
  const handleNewAction = () => {
    dispatch({ type: "HANDLE_NEW_ACTION" });
  };
  return (
    <div className="lg:ml-40 md:ml-10 space-x-6">
      <button
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-white tracking-wide cursor-pointer"
        onClick={handleNewAction}
      >
        <p>Ajouter</p>
      </button>
    </div>
  );
};

export default AddButton;
