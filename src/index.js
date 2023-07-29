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

// this is the index file
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/send-otp" element={<Otp />} />
            <Route
              path="reset-password/:user_id/:token"
              element={<ResetPassword />}
            />
            <Route path="/page-not-found" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    ;
  </React.StrictMode>
);

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
