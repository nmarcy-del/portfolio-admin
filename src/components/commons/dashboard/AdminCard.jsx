import React from "react";
import CardHeader from "./CardHeader";

const AdminCard = (props) => {
  return (
    <div className="w-full pt-12 pr-3 pb-4 mt-0 mr-auto mb-0 ml-auto text-gray-300">
      <div className="w-full mt-0 mr-auto mb-0 ml-auto max-w-7xl md:pl-2 md:pr-4 lg:px-0">
        <div className="w-full mt-0 mr-auto mb-0 ml-auto md:max-w-lg lg:max-w-4xl">
          <CardHeader
            title={props.title}
            apiUrl={props.apiUrl}
            desc={props.desc}
            sortOrder={props.sortOrder}
          />
          {props.items.map((item, index) => (
            <props.CardContent key={index} item={item} apiUrl={props.apiUrl} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
