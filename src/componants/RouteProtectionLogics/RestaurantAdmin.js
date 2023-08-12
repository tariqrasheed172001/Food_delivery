import React, { useEffect, useState } from "react";
import { getRestaurantURL } from "../../BackEndURLs/Urls";
import axios from "axios";
import AddRestaurantForm from "../restaurant/AddRestaurantForm/AddRestaurantForm";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../authentication/Login/Login";
import Cookies from "js-cookie";

function RestaurantAdmin() {
  const [restaurantProfile, setRestaurantProfile] = useState(false);
  const [auth, setAuth] = useState(false);
  const data = useSelector((state) => state.userData);
  const getRestaurant = async () => {
    await axios
      .post(getRestaurantURL, data, { withCredentials: true })
      .then((res) => {
        if (res.status === 202) {
          console.log("data is not there");
          setRestaurantProfile(false);
        } else {
          setRestaurantProfile(true);
          console.log("data is there", res);
        }
      })
      .catch((error) => {
        console.log("Restaurant details not found", error);
      });
  };
  useEffect(()=>{
    getRestaurant();
    const token = Cookies.get("token");
    if (token) setAuth(true);
    else setAuth(false);
  },[])
  return <div>{restaurantProfile ? <Outlet /> : (auth ? <AddRestaurantForm /> : <Login />)}</div>;
}

export default RestaurantAdmin;
