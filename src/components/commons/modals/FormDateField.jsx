import React from "react";

const FormTwoFieldOnLine = (props) => {
  return (
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
          htmlFor="grid-first-name"
        >
          {props.mandatory && (
            <span className="text-red-600 font-bold">* </span>
          )}
          {props.label1}
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type={props.type}
          id={props.name}
          name={props.name}
          placeholder={props.label}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
      <div class="mb-5">
            <label
              for="date"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
      </div>
    </div>
  );
};

export default FormTwoFieldOnLine;
