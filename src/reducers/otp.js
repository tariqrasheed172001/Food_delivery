// store.js
import { createStore } from 'redux';

const initialState = {
  otpFlag: false,
  resetPasswordFlag : false,
};

const otpFlagReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_OTP_FLAG':
      return { ...state, otpFlag: action.payload };
    case 'SET_RESET_PASSWORD_LINK_FLAG':
      return { ...state, otpFlag: action.payload };
    default:
      return state;
  }
};

const store = createStore(otpFlagReducer);

export default store;
