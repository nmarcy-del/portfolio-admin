import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";

const DeleteButton = (props) => {
  const dispatch = useDispatch();
  const handleDeleteAction = () => {
    dispatch({
      type: "HANDLE_DELETE_ACTION",
      itemId: props.itemId,
      itemName: props.itemName,
    });
  };
  return (
    <button
      className="text-gray-400 hover:shadow-xl hover:text-gray-600 transition duration-200 text-2xl ml-2"
      onClick={handleDeleteAction}
    >
      <RiDeleteBin6Line />
    </button>
  );
};

export default DeleteButton;
