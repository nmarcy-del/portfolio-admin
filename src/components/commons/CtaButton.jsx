import React from "react";

const CtaButton = (props) => {
  return (
    <>
      {props.actionType === "DELETE" && (
        <button
          className="mb-2 mt-2 md:mb-0 bg-red-600 px-6 py-1 text-sm shadow-sm font-medium tracking-wide cursor-pointer rounded-md font-semibold text-white hover:shadow-lg hover:bg-red-700"
          onClick={props.onClick}
          type="submit"
        >
          {props.title}
        </button>
      )}
      {props.actionType !== "DELETE" && (
        <button
          className="mb-2 mt-2 md:mb-0 bg-green-600 px-6 py-1 text-sm shadow-sm font-medium tracking-wide cursor-pointer rounded-md font-semibold text-white hover:shadow-lg hover:bg-green-700"
          onClick={props.onClick}
          type="submit"
        >
          {props.title}
        </button>
      )}
    </>
  );
};

export default CtaButton;
