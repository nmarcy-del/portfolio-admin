import React from "react";
import { RiPencilLine } from "react-icons/ri";
import { useDispatch } from "react-redux";

const EditButton = (props) => {
  const dispatch = useDispatch();
  const handleEditAction = () => {
    dispatch({
      type: "HANDLE_EDIT_ACTION",
      itemId: props.itemId,
      itemName: props.itemName,
    });
  };
  return (
    <button
      className="text-gray-400 hover:shadow-xl hover:text-gray-600 transition duration-200 text-2xl mr-3"
      onClick={handleEditAction}
    >
      <RiPencilLine />
    </button>
  );
};

export default EditButton;
