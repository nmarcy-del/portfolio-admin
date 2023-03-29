import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "components/commons/PrivateRoute";
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
import SkillsAndToolsFormContent from "components/dashboardItems/adminFormContent/SkillsAndToolsFormContent";
import CmsFormContent from "components/dashboardItems/adminFormContent/CmsFormContent";
import WorksFormContent from "components/dashboardItems/adminFormContent/WorksFormContent";
import ContactInformationsFormContent from "components/dashboardItems/adminFormContent/ContactInformationsFormContent";


const AppRoutes = () => {
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
              title="Accueil"
              desc="Bienvenue sur votre interface d'administration"
            />
          </PrivateRoute>
        }
      />
      <Route
        path="/cv"
        element={
          <PrivateRoute>
            <MyCv
              title="Mon CV"
              desc="Consulter / Uploader votre CV"
            />
          </PrivateRoute>
        }
      />
      <Route
        path="/skills"
        element={renderAdminTable(
          "skills",
          "Compétences",
          "Mes compétences",
          SkillsAndToolsCardContent,
          SkillsAndToolsFormContent
        )}
      />
      <Route
        path="/works"
        element={renderAdminTable(
          "works",
          "Expériences",
          "Mes expériences",
          WorksCardContent,
          WorksFormContent
        )}
      />
      <Route
        path="/cms"
        element={renderAdminTable(
          "cms-block",
          "CMS",
          "Liste des blocs cms utilisé sur le frontend",
          CmsCardContent,
          CmsFormContent
        )}
      />
      <Route
        path="/contactInformations"
        element={renderAdminTable(
          "contacts",
          "Informations de contact",
          "Mes informations de contact",
          ContactInformationsCardContent,
          ContactInformationsFormContent
        )}
      />
      <Route
        path="/tools"
        element={renderAdminTable(
          "tools",
          "Outils",
          "Les outils que j'utilise",
          SkillsAndToolsCardContent,
          SkillsAndToolsFormContent
        )}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
