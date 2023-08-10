const initialState = {
    restaurantProfile:{},
   };
 
 const restaurantProfileReducer = (state = initialState,action) => {
     switch(action.type){
         case "SET_RESTAURANT_PROFILE":
             return action.payload;
         default:
             return state;
     }
 };
 
 export default restaurantProfileReducer;