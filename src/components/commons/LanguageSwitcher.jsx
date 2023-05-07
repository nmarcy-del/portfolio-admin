import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from "react-country-flag"
import { AiOutlineDown } from "react-icons/ai"; 
 
const LanguageSwitcher = (props) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState("")
  const [languages, setLanguages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrentLanguage(i18n.language);
    if (languages.length === 0) {
      setLanguages(Object.keys(i18n.options.resources));
    }
  }, [i18n.language, i18n.options.resources, languages]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  function changeLanguage(e) {
    i18n.changeLanguage(e.currentTarget.value);
    localStorage.setItem('user-defined-language', e.currentTarget.value);
    toggleDropdown();
  }

  return (
    <div 
      className={(props.isMenu === true 
        ? "flex-column items-center text-center absolute mt-16 lg:mt-0 bottom-52 md:bottom-56 lg:bottom-52 left-6 z-50" 
        : "flex-column items-center text-center"
      )}
    >
      <div className="flex-1">
      <button 
        id="language-selector"
        onClick={toggleDropdown}
        data-dropdown-toggle="languages"
        className={(props.isMenu === true 
          ? "flex-shrink-0 w-28 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center border rounded-md bg-gray-700 md:bg-gray-800 hover:bg-gray-600 md:hover-gray-700 focus:ring-gray-700 text-white border-gray-600 md:border-gray-700"
          : "flex-shrink-0 w-28 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center border rounded-md bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 text-white border-gray-700"
        )}
        type="button"
      >
          <div className="inline-flex items-center">
              <ReactCountryFlag
                  className='inline h-3.5 w-3.5 mr-3'
                  countryCode={currentLanguage === 'en' ? 'gb' : currentLanguage}
                  svg
                  style={{
                      width: '1.5rem',
                      height: '1.5rem',
                  }}
                  title={currentLanguage}
              />
              <p className='uppercase'>{currentLanguage}</p> <AiOutlineDown className='inline h-3 w-3 ml-1.5'/>
          </div>
      </button>
      </div>
      {isOpen && (
        <div 
          id="languages"
          className={(props.isMenu === true
            ? "absolute w-max rounded-md mt-2 z-50 shadow bg-gray-600 md:bg-gray-700 divide-y divide-gray-100 top-[90%] left-[0] md:top-[95%]"
            : "absolute lg:right-[29%] md:right-[30%] right-[10%] rounded-md mt-2 z-50 shadow bg-gray-700 divide-y divide-gray-100"
          )}
        >
          <ul
            className="flex flex-row py-2 flex-wrap text-sm text-gray-200"
            aria-labelledby="language-button"
          >
          {languages.map((language) => (
            (language !== currentLanguage) && (
              <li
                key={language}
                className={(props.isMenu === true 
                  ? "flex-[0_0_50%] md:flex-[0_0_25%]"
                  : "flex-0 md:flex-[0_0_33%]"
                )}
              >
                <button 
                  type="button"
                  value={language}
                  onClick={changeLanguage} 
                  className="inline-flex px-4 py-2 text-sm text-gray-400 hover:bg-gray-600 hover:text-white"
                >
                  <div className="inline-flex item-left">
                    <ReactCountryFlag
                      className='inline h-3.5 w-3.5 mr-3 emojiFlag'
                      countryCode={language === 'en' ? 'gb' : language}
                      svg
                      style={{
                        width: '1.5rem',
                        height: '1.5rem',
                      }}
                      title={language}
                    />
                    <p className='uppercase'>{language}</p>
                  </div>
                </button>
              </li>
            )
          ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;