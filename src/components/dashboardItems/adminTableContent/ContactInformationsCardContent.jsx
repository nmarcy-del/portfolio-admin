import React from "react";
import DeleteButton from "components/commons/dashboard/DeleteButton";
import EditButton from "components/commons/dashboard/EditButton";

const ContactInformationsCardContent = ({ item }) => {
  return (
    <div
      key={item.id}
      className="mt-8 bg-gray-700 shadow-xl pl-12 pr-0 mr-0 mb-0 ml-0 pt-4 lg:pr-10 pb-4 lg:pl-10 flow-root"
    >
      <div className="pr-0 pb-10 pl-0">
        <div className="pt-5 pr-0 pb-0 pl-0 mt-5 mr-0 mb-0 ml-0">
          <div className="sm:flex">
            <div className="flex flex-col justify-between lg:w-5/6 md:w-5/6 min-w-0">
              <div className="flex items-center justify-start mb-2 space-x-10">
                <p className="whitespace-no-wrap text-lg font-bold">
                  {item.addressName}
                </p>
              </div>
              <div className="mt-2">
                <p className="whitespace-no-wrap">
                  <span className="font-bold">Adresse :</span>
                </p>
                <p className="whitespace-no-wrap mt-2">{item.name}</p>
                <p className="whitespace-no-wrap">{item.addressL1}</p>
                <p className="whitespace-no-wrap">{item.addressL2}</p>
                <p className="whitespace-no-wrap">
                  {item.postalCode} - {item.city}
                </p>
              </div>
              <div className="mt-3">
                <p className="whitespace-no-wrap">
                  <span className="font-bold">Téléphone :</span> {item.phone}
                </p>
              </div>
              <div className="mt-1">
                <p className="whitespace-no-wrap">
                  <span className="font-bold">Email :</span> {item.email}
                </p>
              </div>
              <div className="mt-1">
                <p className="whitespace-no-wrap">
                  <span className="font-bold">Linkedin :</span> {item.linkedin}
                </p>
              </div>
              <div className="mt-1">
                <p className="whitespace-no-wrap">
                  <span className="font-bold">Github :</span> {item.github}
                </p>
              </div>
            </div>
            <div className="mr-12 lg:ml-6 md:ml-6 mt-8 mr-0 mb-0 pt-0 pr-0 pb-0 pl-0 flex flex-row md:flex-row lg:flex-row items-center justify-center md:w-1/6">
              <EditButton itemId={item._id} itemName={item.addressName} />
              <DeleteButton itemId={item._id} itemName={item.addressName} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformationsCardContent;
