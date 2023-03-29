import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "components/commons/PrivateRoute";
import DashboardPage from "pages/Dashboard";
import LoginPage from "pages/LoginPage";
import NotFoundPage from "pages/NotFound";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route path="/*" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
