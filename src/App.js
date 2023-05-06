import { React, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "store/store";
import Routes from "routers/LoginRoutes";
import { useTranslation } from "react-i18next";
import appConf from "config/config";

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t(appConf.appName);
  }, [t]);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <div>
              <Routes />
            </div>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
