import React from "react";

const NewOrEditModal = (props) => {
  const title = props.itemId ? "Editer" : "Ajouter";

  return (
    <div className="p-3 mt-2 text-center space-x-4 md:block">
      <h1 className="text-xl font-bold text-gray-300">{title}</h1>
      <div>
        <props.FormContent
          itemId={props.itemId}
          apiUrl={props.apiUrl}
          itemName={props.itemName}
          actionType={props.actionType}
        />
      </div>
    </div>
  );
};

export default NewOrEditModal;
