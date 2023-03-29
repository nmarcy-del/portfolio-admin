import React from "react";

const FormSubmitButton = (props) => {
  return (
    <button
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 text-xl mt-5"
      type="submit"
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
};

export default FormSubmitButton;
