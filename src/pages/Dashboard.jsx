import React, { useState } from "react";
import { useSelector } from "react-redux";
import Menu from "components/dashboardItems/Menu";
import DashboardRoute from "routers/DashboardRoutes";
import Footer from "components/commons/Footer";
import InfoMessage from "components/commons/dashboard/InfoMessage";

const Dashboard = () => {
  const adminUserCanEdit = useSelector((state) => state.auth.adminCanEdit);
  const [showInfo, setShowInfo] = useState(true);

  const handleCloseInfo = () => {
    setShowInfo(false);
  };

  return (
    <div>
      <div className="min-h-[90vh] bg-gray-800 flex">
        <div className="md:flex lg:flex flew-row w-auto md:w-64 lg:w-64">
          <Menu />
        </div>
        <div className="flex flex-row flex-grow bg-gray-800">
          <DashboardRoute />
        </div>
      </div>
      <InfoMessage
        adminUserCanEdit={adminUserCanEdit}
        showInfo={showInfo}
        handleCloseInfo={handleCloseInfo}
      />
      <Footer />
    </div>
  );
};

export default Dashboard;
