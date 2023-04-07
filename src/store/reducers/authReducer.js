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
          message:
            "Votre nom d'utilisateur ou votre mot de passe est invalide.",
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
          message:
            "Une erreur inattendue s'est produite, veuillez réessayer ultérieurement.",
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
          message: "Vous avez été déconnecté.",
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
          message: "Votre session à expiré, veuillez vous reconnecter.",
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
