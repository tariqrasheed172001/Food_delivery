const initialState = {
    flag: false,
  };
  
  const flagReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_FLAG":
        return action.payload;
      default:
        return state;
    }
  };

  export default flagReducer;