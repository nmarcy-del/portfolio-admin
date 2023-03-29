import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "store/store";
import Routes from "routers/LoginRoutes";

function App() {
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
