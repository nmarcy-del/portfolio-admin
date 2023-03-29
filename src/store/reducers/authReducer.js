const initialState = {
  isAuthenticated: false,
  expirationTime: null,
  authNotification: { code: "", message: "" },
  adminUsername: "",
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
      };
    case "CLOSE_LOGIN_ALERT":
      return {
        ...state,
        isAuthenticated: false,
        expirationTime: null,
        authNotification: {},
        adminUsername: "",
      };
    default:
      return state;
  }
};

export default authReducer;
