const initialState = {
  isAuthenticated: false,
  expirationTime: null,
  authNotification: { code: "", message: "" },
  adminUsername: "",
  adminCanEdit: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      const expirationTime = Date.now() + 1800000; // 30 minutes in milliseconds
      return {
        ...state,
        isAuthenticated: true,
        expirationTime: expirationTime,
        authNotification: {},
        adminUsername: action.adminUsername,
        adminCanEdit: action.adminCanEdit,
      };
    case "LOGIN_CREDENTIAL_ERROR":
      return {
        ...state,
        isAuthenticated: false,
        expirationTime: null,
        authNotification: {
          code: "error",
          message: "Your username or password is invalid.",
        },
        adminUsername: "",
        adminCanEdit: "",
      };
    case "LOGIN_GENERIC_ERROR":
      return {
        ...state,
        isAuthenticated: false,
        expirationTime: null,
        authNotification: {
          code: "error",
          message: "An unexpected error occurred, please try again later.",
        },
        adminUsername: "",
        adminCanEdit: "",
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        expirationTime: null,
        authNotification: {
          code: "success",
          message: "You have been logged out.",
        },
        adminUsername: "",
        adminCanEdit: "",
      };
    case "SESSION_EXPIRED":
      return {
        ...state,
        isAuthenticated: false,
        expirationTime: null,
        authNotification: {
          code: "error",
          message: "Your session has expired, please log in again.",
        },
        adminUsername: "",
        adminCanEdit: "",
      };
    case "CLOSE_LOGIN_ALERT":
      return {
        ...state,
        isAuthenticated: false,
        expirationTime: null,
        authNotification: {},
        adminUsername: "",
        adminCanEdit: "",
      };
    default:
      return state;
  }
};

export default authReducer;
