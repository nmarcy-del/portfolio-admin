import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from "react-country-flag"
import { AiOutlineDown } from "react-icons/ai"; 
 
const LanguageSwitcher = (props) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState("")
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  function changeLanguage(e) {
    i18n.changeLanguage(e.target.value);
  }

  return (
    <div className="flex-column items-center text-center">
      <div className="flex-1">
      <button 
        id="language-selector"
        onClick={toggleDropdown}
        data-dropdown-toggle="languages"
        className="flex-shrink-0 w-28 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center border rounded-md bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 text-white border-gray-700"
        type="button"
      >
          <div className="inline-flex items-center">
              <ReactCountryFlag
                  className='inline h-3.5 w-3.5 mr-3'
                  countryCode="fr"
                  svg
                  style={{
                      width: '1.5rem',
                      height: '1.5rem',
                  }}
                  title="US"
              />
              <p className='uppercase'>{currentLanguage}</p> <AiOutlineDown className='inline h-3 w-3 ml-1.5'/>
          </div>
      </button>
      </div>
      {isOpen && (
        <div id="languages" className="absolute right-[45%] rounded-md mt-2 w-32 flex-1 z-10 shadow bg-gray-700 divide-y divide-gray-100">
          <ul className="py-2 text-sm text-gray-200" aria-labelledby="language-button">
            <li>
              <button type="button" className="inline-flex px-4 py-2 text-sm text-gray-400 hover:bg-gray-600 hover:text-white">
                <div className="inline-flex items-center text-center">
                  <ReactCountryFlag
                      className='inline h-3.5 w-3.5 mr-3'
                      countryCode="ES"
                      svg
                      style={{
                          width: '1.5rem',
                          height: '1.5rem',
                      }}
                      title="US"
                  />
                  <p className='uppercase'>ES</p>
                </div>
              </button>
            </li>
            <li>
              <button type="button" className="inline-flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                <div className="inline-flex items-center text-center">
                  <ReactCountryFlag
                      className='inline h-3.5 w-3.5 mr-3'
                      countryCode="ES"
                      svg
                      style={{
                          width: '1.5rem',
                          height: '1.5rem',
                      }}
                      title="US"
                  />
                  <p className='uppercase'>ES</p>
                </div>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;