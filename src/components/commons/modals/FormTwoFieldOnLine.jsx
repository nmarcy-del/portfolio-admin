import React from "react";

const FormTwoFieldOnLine = (props) => {
  const displayError =
    props.error && (props.error.message1 || props.error.message2)
      ? true
      : false;
  return (
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
          htmlFor="grid-first-name"
        >
          {props.mandatory1 && (
            <span className="text-red-600 font-bold">* </span>
          )}
          {props.label1}
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type={props.type1}
          id={props.name1}
          name={props.name1}
          placeholder={props.label1}
          value={props.value1}
          onChange={props.onChange1}
        />
      </div>
      <div className="w-full md:w-1/2 px-3">
        <label
          className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
          htmlFor="grid-last-name"
        >
          {props.mandatory2 && (
            <span className="text-red-600 font-bold">* </span>
          )}{" "}
          {props.label2}
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type={props.type2}
          id={props.name2}
          name={props.name2}
          placeholder={props.placeholder2}
          value={props.value2}
          onChange={props.onChange2}
        />
      </div>
      {displayError && (
        <div className="w-full px-3">
          {props.error.message1 && (
            <p className="text-red-600">{props.error.message1}</p>
          )}
          {props.error.message2 && (
            <p className="text-red-600">{props.error.message2}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FormTwoFieldOnLine;
