import React from "react";
import DeleteButton from "components/commons/dashboard/DeleteButton";
import EditButton from "components/commons/dashboard/EditButton";

const SkillsAndToolsCardContent = ({ item, apiUrl }) => {
  return (
    <div
      key={item.id}
      className="mt-8 bg-gray-700 mt-8 shadow-xl mr-0 mb-0 ml-0 pt-4 pr-10 pb-4 pl-10 flow-root sm:py-2"
    >
      <div className="pr-0 pb-10 pl-0">
        <div className="pt-5 pr-0 pb-0 pl-0 mt-5 mr-0 mb-0 ml-0">
          <div className="sm:flex">
            <div className="flex flex-col justify-between lg:w-5/6 md:w-5/6 min-w-0">
              <div className="flex items-center justify-start mb-2 space-x-10">
                <p className="whitespace-no-wrap text-md md:mx-0 lg:mx-0">
                  {apiUrl === "skills" && (
                    <span className="font-bold">Compétence : </span>
                  )}
                  {apiUrl === "tools" && (
                    <span className="font-bold">Outil : </span>
                  )}
                  {item.name}
                </p>
              </div>
              <div className="mt-2">
                <p className="whitespace-no-wrap">
                  <span className="font-bold">Ordre :</span> {item.order}
                </p>
              </div>
              {item.img && item.img !== "" && (
                <div className="mt-2">
                  <p className="whitespace-no-wrap">
                    <span className="font-bold">Image (aperçu) :</span>
                    <img
                      className="w-auto h-24 inline ml-5 mt-2 md:mt-0 lg:mt-0"
                      src={item.img}
                      alt={item.title}
                    />
                  </p>
                </div>
              )}
            </div>
            <div className="ml-0 lg:ml-6 md:ml-6 mt-8 mr-0 mb-0 pt-0 pr-0 pb-0 pl-0 flex flex-row md:flex-row lg:flex-row items-center justify-center md:w-1/6">
              <EditButton itemId={item._id} itemName={item.name} />
              <DeleteButton itemId={item._id} itemName={item.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsAndToolsCardContent;
