const getRestaurantURL = `${process.env.REACT_APP_API}/get-restaurant`;
const loginURL = `${process.env.REACT_APP_API}/login`;
const ResetPasswordURL = `${process.env.REACT_APP_API}/reset-password`;
const otpURL = `${process.env.REACT_APP_API}/send-otp`;
const emailExistingURL = `${process.env.REACT_APP_API}/checkExistingEmail`;
const registerURL = `${process.env.REACT_APP_API}/register`;
const restaurantContactOtpURL = `${process.env.REACT_APP_API}/verify-phone-number`;
const sendOtpEmailURL = `${process.env.REACT_APP_API}/send-owner-email-otp`;
const addRestaurantURL = `${process.env.REACT_APP_API}/add-restaurant`;
const addRestaurantBankDetailsURL = `${process.env.REACT_APP_API}/add-bank-details`;
const editRestaurantBankDetailsURL = `${process.env.REACT_APP_API}/update-bank-details`;
const editRestaurantInfoURL = `${process.env.REACT_APP_API}/update-information`;
const editRestaurantOnwerDetails = `${process.env.REACT_APP_API}/update-owner-details`;
const editRestaurantTimingsURL = `${process.env.REACT_APP_API}/update-timings`;

export {
  getRestaurantURL,
  loginURL,
  ResetPasswordURL,
  otpURL,
  emailExistingURL,
  registerURL,
  restaurantContactOtpURL,
  addRestaurantURL,
  addRestaurantBankDetailsURL,
  editRestaurantBankDetailsURL,
  editRestaurantInfoURL,
  editRestaurantOnwerDetails,
  sendOtpEmailURL,
  editRestaurantTimingsURL,
};
