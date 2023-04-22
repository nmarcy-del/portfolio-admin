import React from "react";
import DeleteButton from "components/commons/dashboard/DeleteButton";
import EditButton from "components/commons/dashboard/EditButton";

const WorksCardContent = ({ item }) => {
  const formatDate = (date) => {
    if (!date) {
      return "Aujourd'hui";
    }
    const d = new Date(date);
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
    return `${month}/${year}`;
  };

  return (
    <div
      key={item._id}
      className="mt-8 bg-gray-700 shadow-xl pl-5 pr-5 pt-2 mr-0 mb-0 ml-0 lg:pr-0 pb-4 flow-root"
    >
      <div className="pr-0 pb-10 pl-0">
        <div className="pt-5 pr-0 pb-0 pl-0 mt-5 mr-0 mb-0 ml-0">
          <div className="sm:flex">
            <div className="flex flex-col justify-between lg:w-5/6 md:w-5/6 min-w-0">
              <div className="flex items-center justify-start mb-2 space-x-10">
                <p className="whitespace-no-wrap text-lg">{item.title}</p>
                <div>
                  <img
                    className="w-auto h-20"
                    src={item.img}
                    alt={`alt: ${item.title}`}
                  />
                </div>
              </div>
              <div>
                <p className="whitespace-no-wrap mt-5">{item.place}</p>
              </div>
              <div className="flex items-center justify-start space-x-4 mt-2">
                <div>
                  <p className="whitespace-no-wrap">
                    <span className="font-bold">De : </span>{" "}
                    {formatDate(item.startDate)}
                  </p>
                </div>
                <div>
                  <p className="whitespace-no-wrap">
                    <span className="font-bold">à : </span>{" "}
                    {formatDate(item.endDate)}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <p className="whitespace-no-wrap mt-5">
                  <span className="font-bold">Description :</span> {item.desc}
                </p>
              </div>
              <div className="mt-2">
                <p className="whitespace-no-wrap">
                  <span className="font-bold">Technologies utilisée :</span>{" "}
                  {item.technologies}
                </p>
              </div>
            </div>
            <div className="ml-0 lg:ml-6 md:ml-6 mt-8 mr-0 mb-0 pt-0 pr-0 pb-0 pl-0 flex flex-row md:flex-row lg:flex-row items-center justify-center md:w-1/6">
              <EditButton itemId={item._id} itemName={item.title} />
              <DeleteButton itemId={item._id} itemName={item.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorksCardContent;
