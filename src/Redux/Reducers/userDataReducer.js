const initialState = {
   userData:{},
  };

const userDataReducer = (state = initialState,action) => {
    switch(action.type){
        case "SET_USER_DATA":
            return action.payload;
        default:
            return state;
    }
};

export default userDataReducer;