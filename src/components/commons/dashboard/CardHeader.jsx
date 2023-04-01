import React, { useEffect } from "react";
import { BsSortDownAlt, BsSortUpAlt } from "react-icons/bs";
import { useDispatch } from "react-redux";
import AddButton from "components/commons/dashboard/AddButton";

const CardHeader = (props) => {
  const dispatch = useDispatch();
  const newSortOrder = props.sortOrder === "asc" ? "desc" : "asc";

  useEffect(() => {}, [props.hideNewContact]);

  const handleSortOrder = () => {
    dispatch({ type: "HANDLE_CHANGE_SORT_ORDER", sortOrder: newSortOrder });
  };

  const shouldDisplaySortOrderButton = () => {
    if (
      props.apiUrl === "skills" ||
      props.apiUrl === "tools" ||
      props.apiUrl === "works"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const orderProperty =
    props.apiUrl === "skills" || props.apiUrl === "tools"
      ? "Ordre"
      : "Date de début";

  return (
    <>
      <div className="w-full pt-8 pr-0 md:pr-0 lg:pr-4 pb-0 pl-0 md:pl-4 lg:pl-4 mt-0 mb-8 mr-auto mb-0 ml-auto sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-xl font-bold text-gray-300">{props.title}</p>
          <p className="text-sm mt-1 font-semi-bold text-gray-400">
            {props.desc}
          </p>
        </div>
        {!props.hideNewContact && (
          <div className="mt-4">
            <AddButton />
          </div>
        )}
      </div>
      <div className="w-full pl-0 md:pl-4 lg:pl-4 flex items-center justify-start mb-1">
        {shouldDisplaySortOrderButton() &&
          (props.sortOrder === "asc" || !props.sortOrder) && (
            <button onClick={handleSortOrder} className="flex items-center">
              <span className="mr-2">
                <BsSortUpAlt />
              </span>
              <span>Trier par {orderProperty} desc</span>
            </button>
          )}
        {shouldDisplaySortOrderButton() && props.sortOrder === "desc" && (
          <button onClick={handleSortOrder} className="flex items-center">
            <span className="mr-2">
              <BsSortDownAlt />
            </span>
            <span>Trier par {orderProperty} asc</span>
          </button>
        )}
      </div>
    </>
  );
};

export default CardHeader;
