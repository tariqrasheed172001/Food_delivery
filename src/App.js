import React, { useState } from 'react'
import Login from "./componants/authentication/Login/Login";
import Register from "./componants/authentication/Register";
import Landing from "./componants/Pages/Landing";
import Home from "./componants/Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Otp from "./componants/OTP/Otp";
import ResetPassword from "./componants/authentication/ResetPassword";
import PageNotFound from "./componants/authentication/PageNotFound";
import ProtectedRoute from "./componants/ProtectedRoutes/ProtectedRoute";
import store from "./reducers/otp";
import { Provider } from "react-redux";
import ProtectedResetPassword from "./componants/ProtectedRoutes/ProtectedResetPassword";
import ProtectedOtpRoute from "./componants/ProtectedRoutes/ProtectedOtpRoute";
import ProgressBar from './componants/ProgressBar/ProgressBar';


function App() {
    const [loading,setLoading] = useState(false);
  return (
    <Provider store={store}>
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <BrowserRouter>
            {loading && <ProgressBar />}
          <Routes>
            {/* Protected from unAuthurised user */}
            <Route element={<ProtectedRoute />}>
              <Route path="/landing" element={<Landing setLoading={setLoading} />} />
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

            <Route path="/" element={<Home  />} />
            <Route path="/home" element={<Home  />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register setLoading={setLoading} />} />
            <Route path="/page-not-found" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>
  )
}

export default App