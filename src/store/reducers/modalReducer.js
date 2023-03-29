const initialState = {
  action: "",
  itemId: "",
  itemName: "",
  isOpen: false,
  notification: {},
  refresh: false,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "HANDLE_EDIT_ACTION":
      return {
        ...state,
        action: "EDIT",
        itemId: action.itemId,
        itemName: action.itemName,
        isOpen: true,
        notification: {},
        refresh: false,
      };
    case "HANDLE_NEW_ACTION":
      return {
        ...state,
        action: "NEW",
        itemId: "",
        itemName: "",
        isOpen: true,
        notification: {},
        refresh: false,
      };
    case "HANDLE_DELETE_ACTION":
      return {
        ...state,
        action: "DELETE",
        itemId: action.itemId,
        itemName: action.itemName,
        isOpen: true,
        notification: {},
        refresh: false,
      };
    case "HANDLE_DELETE_CV_ACTION":
      return {
        ...state,
        action: "DELETE",
        itemId: "CV",
        itemName: "CV",
        isOpen: true,
        notification: {},
        refresh: false,
      };
    case "HANDLE_CLOSE_ACTION":
      return {
        ...state,
        action: "",
        itemId: "",
        itemName: "",
        isOpen: false,
        notification: {},
        refresh: false,
      };
    case "HANDLE_AFTER_SUCCESS":
      return {
        ...state,
        action: "",
        itemId: "",
        itemName: "",
        isOpen: false,
        notification: {
          code: "success",
          message: action.message,
        },
        refresh: true,
      };
    case "HANDLE_AFTER_ERROR":
      return {
        ...state,
        action: "",
        itemId: "",
        itemName: "",
        isOpen: false,
        notification: {
          code: "error",
          message: action.message,
        },
        refresh: false,
      };
    case "CLOSE_ALERT_MESSAGE":
      return {
        ...state,
        action: "",
        itemId: "",
        itemName: "",
        isOpen: false,
        notification: {},
        refresh: false,
      };
    default:
      return state;
  }
};

export default modalReducer;
