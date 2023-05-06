import React from "react";
import { RiLock2Line, RiUser3Line } from "react-icons/ri";
import FormSubmitButton from "components/commons/FormSubmitButton";
import { useTranslation } from 'react-i18next';

const LoginForm = (props) => {
  const { t } = useTranslation();

  return (
    <form className="flex flex-col" onSubmit={props.handleSubmit}>
      <div className="mb-6 pt-3 rounded relative">
        <label
          className="block text-gray-700 mb-2 ml-3 text-sm sm:text-xs"
          htmlFor="email"
        >
          <span className="text-red-800 font-bold">*</span> {t("Username")}
        </label>
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 pt-9 text-gray-400">
          <RiUser3Line size={20} />
        </div>
        <input
          className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-green-600 transition duration-500 px-3 p-3 text-sm pl-10"
          type="text"
          id="username"
          name="username"
          placeholder={t("Username")}
          value={props.form.username}
          onChange={props.handleFormChange}
        />
      </div>
      <div className="mb-6 pt-3 rounded relative text-gray-600">
        <label
          className="block text-gray-700 mb-2 ml-3 text-sm"
          htmlFor="password"
        >
          <span className="text-red-800 font-bold">*</span> {t("Password")}
        </label>
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 pt-9 text-gray-400">
          <RiLock2Line size={20} />
        </div>
        <input
          className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-green-600 transition duration-500 px-3 p-3 text-sm pl-10"
          type="password"
          id="password"
          name="password"
          placeholder={t("Password")}
          value={props.form.password}
          onChange={props.handleFormChange}
        />
      </div>
      <p className="block text-gray-700 ml-3 text-sm">
        {t("For demo access, please try demo/demo.")}
      </p>
      <FormSubmitButton title={t("Login")} />
    </form>
  );
};

export default LoginForm;
