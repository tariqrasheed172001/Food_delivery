import Home from "../Pages/Home";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoute() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  return <div>{auth ? <Outlet /> : <Home />}</div>;
}

export default ProtectedRoute;
