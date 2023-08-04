import React, { useState } from "react";
import Login from "./componants/authentication/Login/Login";
import Register from "./componants/authentication/Register";
import Landing from "./componants/Pages/Landing";
import Home from "./componants/Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Otp from "./componants/OTP/Otp";
import ResetPassword from "./componants/authentication/ResetPassword";
import PageNotFound from "./componants/authentication/PageNotFound";
import ProtectedRoute from "./componants/RouteProtectionLogics/ProtectedRoute";
import ProtectedResetPassword from "./componants/RouteProtectionLogics/ResetPassword";
import ProtectedOtpRoute from "./componants/RouteProtectionLogics/OtpRoute";
import ProgressBar from "./componants/ProgressBar/ProgressBar";
import UserProfile from "./componants/userProfile/UserProfile";
import LoginRegister from "./componants/RouteProtectionLogics/LoginRegister";
import AddRestaurantForm from "./componants/restaurant/AddRestaurantForm/AddRestaurantForm";
import Restaurant from "./componants/RouteProtectionLogics/Restaurant";

function App() {
  const [loading, setLoading] = useState(false);
  return (
    <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <BrowserRouter>
        {loading && <ProgressBar />}
        <Routes>
          {/* Protected from unAuthurised user */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/landing"
              element={<Landing setLoading={setLoading} />}
            />
            <Route
              path="/user-profile"
              element={<UserProfile setLoading={setLoading} />}
            />
          </Route>
          {/* if the reset password link is not sended then these are protected */}
          <Route element={<ProtectedResetPassword />}>
            <Route
              path="reset-password/:user_id/:token"
              element={<ResetPassword setLoading={setLoading} />}
            />
            <Route path="reset-password" />
          </Route>
          {/* if otp is not sended then this is protected */}
          <Route element={<ProtectedOtpRoute />}>
            <Route path="/send-otp" element={<Otp setLoading={setLoading} />} />
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route element={<Restaurant />}>
            <Route
              path="/add-restaurant"
              element={<AddRestaurantForm setLoading={setLoading} />}
            />
          </Route>

          <Route element={<LoginRegister />}>
            <Route path="/login" element={<Login />} />
            <Route
              path="/register"
              element={<Register setLoading={setLoading} />}
            />
          </Route>
          <Route path="/page-not-found" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
