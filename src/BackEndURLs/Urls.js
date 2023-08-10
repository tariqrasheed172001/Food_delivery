const getRestaurantURL = `${process.env.REACT_APP_API}/get-restaurant`;
const loginURL = `${process.env.REACT_APP_API}/login`;
const ResetPasswordURL = `${process.env.REACT_APP_API}/reset-password`;
const otpURL = `${process.env.REACT_APP_API}/send-otp`;
const emailExistingURL = `${process.env.REACT_APP_API}/checkExistingEmail`;
const registerURL = `${process.env.REACT_APP_API}/register`;
const restaurantContactOtpURL = `${process.env.REACT_APP_API}/send-restaurant-contact-otp`;
const addRestaurantURL = `${process.env.REACT_APP_API}/add-restaurant`;
export {
  getRestaurantURL,
  loginURL,
  ResetPasswordURL,
  otpURL,
  emailExistingURL,
  registerURL,
  restaurantContactOtpURL,
  addRestaurantURL
};
