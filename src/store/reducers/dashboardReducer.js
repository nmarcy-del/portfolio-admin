const initialState = {
  sortOrder: "asc",
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "HANDLE_CHANGE_SORT_ORDER":
      return {
        ...state,
        sortOrder: action.sortOrder,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
