import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Login from "./componants/authentication/Login";
import Register from "./componants/authentication/Register";
import Home from "./componants/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Otp from "./componants/OTP/Otp";
import ResetPassword from "./componants/authentication/ResetPassword";
import PageNotFound from "./componants/authentication/PageNotFound";
import { gapi } from "gapi-script";
import ProtectedRoute from "./componants/ProtectedRoutes/ProtectedRoute";
import store from "./reducers/otp";
import { Provider } from "react-redux";
import ProtectedResetPassword from "./componants/ProtectedRoutes/ProtectedResetPassword";
import ProtectedOtpRoute from "./componants/ProtectedRoutes/ProtectedOtpRoute";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <BrowserRouter>
          <Routes>
            {/* Protected from unAuthurised user */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
            </Route>
            {/* if the reset password link is not sended then these are protected */}
            <Route element={<ProtectedResetPassword />}>
              <Route
                path="reset-password/:user_id/:token"
                element={<ResetPassword />}
              />
              <Route path="reset-password" />
            </Route>
            {/* if otp is not sended then this is protected */}
            <Route element={<ProtectedOtpRoute />}>
              <Route path="/send-otp" element={<Otp />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/page-not-found" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>
);
// this the solution for google authenctication client id issue
gapi.load("client:auth2", () => {
  gapi.client.init({
    clientId: "*****.apps.googleusercontent.com",
    plugin_name: "chat",
  });
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
