// store.js
import { legacy_createStore as createStore,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};



const initialState = {
  otpFlag: false,
  resetPasswordFlag: false,
  loginFlag: false,
  userData: {},
};

const FlagReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOGIN_FLAG":
      return { ...state, loginFlag: action.payload };
    case "SET_OTP_FLAG":
      return { ...state, otpFlag: action.payload };
    case "SET_RESET_PASSWORD_LINK_FLAG":
      return { ...state, resetPasswordFlag: action.payload };
    case "SET_USER_DATA":
      console.log("SET_USER_DATA action dispatched:", action.payload);
      return { ...state, userData: action.payload};
    default:
      return state;
  }
};

const persistedReducer = persistReducer(persistConfig,FlagReducer,applyMiddleware(thunk));


const store = createStore(persistedReducer);

let persistor = persistStore(store);

export {store,persistor};
