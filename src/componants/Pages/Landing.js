import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useNotification from "../snackbars/SnackBar";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";

function Landing({setLoading}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const [conf, setConf] = useNotification();

  const location = useLocation();

  const receivedData = useSelector((state)=> state.userData);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    // Check if a token exists in the cookies
    console.log(receivedData);
    const token = Cookies.get("token");
    if (token) {
      // You may want to check if the token is expired here
      // For simplicity, we'll assume the token is valid for now
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
   
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); 
    }, 1000); 
  }, [setLoading]);
  
  const handleLogout = (event) => {
    Cookies.remove("token");
    setLoggedIn(false);
    console.clear();
    dispatch({type:'SET_LOGIN_FLAG',payload:false});
  };

  return (
    <div className="container mt-4" style={{background:"none",color:"white"}}>
      {loggedIn &&
        <div>
          <h3>You are logged In {receivedData?.name}</h3>
          <h4>{receivedData?.email}</h4>
          <h4>{receivedData?.phone}</h4>
          <button className="btn btn-danger" onClick={handleLogout}>
            logout
          </button>
        </div>
      }
    </div>
  );
}

export default Landing;
