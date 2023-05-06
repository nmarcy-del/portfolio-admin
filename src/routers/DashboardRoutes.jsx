import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "components/commons/PrivateRoute";
import { useTranslation } from "react-i18next";
// Pages du dashboard
import NotFoundPage from "pages/NotFound";
import AdminTable from "components/dashboardItems/AdminTable";
import Home from "components/dashboardItems/Home";
import MyCv from "components/dashboardItems/MyCv";
//Card content for admin table
import SkillsAndToolsCardContent from "components/dashboardItems/adminTableContent/SkillsAndToolsCardContent";
import WorksCardContent from "components/dashboardItems/adminTableContent/WorksCardContent";
import CmsCardContent from "components/dashboardItems/adminTableContent/CmsCardContent";
import ContactInformationsCardContent from "components/dashboardItems/adminTableContent/ContactInformationsCardContent";
//Form content for new/edit modals
import SkillsAndToolsFormContent from "components/dashboardItems/modalNewEditFormContent/SkillsAndToolsFormContent";
import CmsFormContent from "components/dashboardItems/modalNewEditFormContent/CmsFormContent";
import WorksFormContent from "components/dashboardItems/modalNewEditFormContent/WorksFormContent";
import ContactInformationsFormContent from "components/dashboardItems/modalNewEditFormContent/ContactInformationsFormContent";


const AppRoutes = () => {
  const { t } = useTranslation();

  // render admin table component
  const renderAdminTable = (
    apiUrl,
    title,
    desc,
    CardContent,
    FormContent
  ) => (
    <PrivateRoute>
      <AdminTable
        apiUrl={apiUrl}
        title={title}
        desc={desc}
        CardContent={CardContent}
        FormContent={FormContent}
      />
    </PrivateRoute>
  );

  return (
    <Routes>
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home
              title={t("Home")}
              desc={t("Welcome to your administration interface")}
            />
          </PrivateRoute>
        }
      />
      <Route
        path="/cv"
        element={
          <PrivateRoute>
            <MyCv
              title={t("My resume")}
              desc={t("View/Upload your CV")}
            />
          </PrivateRoute>
        }
      />
      <Route
        path="/skills"
        element={renderAdminTable(
          "skills",
          t("Skills"),
          t("My skills"),
          SkillsAndToolsCardContent,
          SkillsAndToolsFormContent
        )}
      />
      <Route
        path="/works"
        element={renderAdminTable(
          "works",
          t("Experiences"),
          t("My experiences"),
          WorksCardContent,
          WorksFormContent
        )}
      />
      <Route
        path="/cms"
        element={renderAdminTable(
          "cms-block",
          "CMS",
          t("List of CMS blocks used on the frontend"),
          CmsCardContent,
          CmsFormContent
        )}
      />
      <Route
        path="/contactInformations"
        element={renderAdminTable(
          "contacts",
          t("Contact information"),
          t("My contact information"),
          ContactInformationsCardContent,
          ContactInformationsFormContent
        )}
      />
      <Route
        path="/tools"
        element={renderAdminTable(
          "tools",
          t("Tools"),
          t("Tools I use"),
          SkillsAndToolsCardContent,
          SkillsAndToolsFormContent
        )}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
