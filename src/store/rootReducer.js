import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
import authReducer from "store/reducers/authReducer";
import modalReducer from "store/reducers/modalReducer";
import dashboardReducer from "store/reducers/dashboardReducer";
import expireIn from "redux-persist-transform-expire-in";

const expireInTransform = expireIn(1800000);

const persitConfig = {
  key: "root",
  storage: sessionStorage,
  transforms: [expireInTransform],
};

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  dashboard: dashboardReducer,
});

export default persistReducer(persitConfig, rootReducer);
