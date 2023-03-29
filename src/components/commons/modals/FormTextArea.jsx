import React from "react";

const FormTextArea = (props) => {

  const displayError = props.error && props.error.message ? true : false;
  let areaHeight = 48
  if (props.height) {
    areaHeight = props.height;
  }

  return (
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3">
        <label
          className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
          htmlFor="grid-password"
        >
          {props.mandatory && (
            <span className="text-red-600 font-bold">* </span>
          )}
          {props.label}
        </label>
        <textarea
          className={`no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-${areaHeight} resize-none`}
          type={props.type}
          id={props.name}
          name={props.name}
          placeholder={props.label}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
      {displayError && (
        <div className="w-full px-3">
          {props.error.message && (
            <p className="text-red-600">{props.error.message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FormTextArea;
