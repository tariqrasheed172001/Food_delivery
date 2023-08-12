import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import OwnerDetails from "./formPages/OwnerDetails";
import RestaurantDetails from "./formPages/Details";
import RestaurantContact from "./formPages/Contact";
import RestaurantTiming from "./formPages/Timing";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    maxWidth: 800,
    margin: "0 auto",
    padding: 20,
  },
  formPage: {
    display: "none",
  },
  activePage: {
    display: "block",
  },
  navigation: {
    marginTop: 20,
    textAlign: "center",
  },
  button: {
    marginRight: 20,
  },
}));

const AddRestaurantForm = ({ setLoading }) => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const userData = useSelector((state) => state.userData);
  const [restaurantData, setRestaurantData] = useState({
    restaurant: {
      name: "",
      address: "",
      phone: "",
      user_id: userData.user_id,
    },
    owner: {
      name: "",
      email: "",
      phone: "",
    },
    timings: {
      opens_at: "",
      closes_at: "",
      working_days: "",
    },
  });

  const handleNextPage = (event) => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = (event) => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  console.log(restaurantData);
  return (
    <div id="formId" className={classes.formContainer}>
      <form>
        {/* Restaurant Details */}
        <div
          className={currentPage === 1 ? classes.activePage : classes.formPage}
        >
          <RestaurantDetails
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            classes={classes}
            setRestaurantData={setRestaurantData}
            restaurantData={restaurantData}
          />
        </div>
        {/*  Contact */}
        <div
          className={currentPage === 2 ? classes.activePage : classes.formPage}
        >
          <RestaurantContact
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            classes={classes}
            setRestaurantData={setRestaurantData}
            restaurantData={restaurantData}
          />
        </div>

        {/* Onwer Details */}
        <div
          className={currentPage === 3 ? classes.activePage : classes.formPage}
        >
          <OwnerDetails
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            classes={classes}
            setRestaurantData={setRestaurantData}
            restaurantData={restaurantData}
          />
        </div>
        {/* Restaurant Timings */}
        <div
          className={currentPage === 4 ? classes.activePage : classes.formPage}
        >
          <RestaurantTiming
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            classes={classes}
            setRestaurantData={setRestaurantData}
            restaurantData={restaurantData}
          />
        </div>
      </form>
    </div>
  );
};

export default AddRestaurantForm;
