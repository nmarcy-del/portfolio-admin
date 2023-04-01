import React from "react";
import SideBar from "components/dashboardItems/Sidebar";
import DashboardRoute from "routers/DashboardRoutes";
import Footer from "components/commons/Footer";

const Dashboard = () => {
  return (
    <div>
      <div className="min-h-[90vh] bg-gray-800 flex">
        <div className="md:flex lg:flex flew-row w-auto md:w-64 lg:w-64">
          <SideBar />
        </div>
        <div className="flex flex-row flex-grow bg-gray-800">
          <DashboardRoute />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
