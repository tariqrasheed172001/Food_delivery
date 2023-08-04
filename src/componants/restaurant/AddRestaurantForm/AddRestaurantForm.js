import React, { useState } from "react";
import { makeStyles } from '@mui/styles';
import OwnerDetails from "./formPages/OwnerDetails";
import RestaurantDetails from "./formPages/Details";
import RestaurantContact from "./formPages/Contact";
import RestaurantTiming from "./formPages/Timing";

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
  button:{
    marginRight:20,
  },
}));

const AddRestaurantForm = () => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className={classes.formContainer}>
      {/* Page 1 */}
      <div
        className={currentPage === 1 ? classes.activePage : classes.formPage}
      >
        <RestaurantDetails handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} classes={classes} />
      </div>
      {/* Page 2 */}
      <div
        className={currentPage === 2 ? classes.activePage : classes.formPage}
      >
        <RestaurantContact handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} classes={classes} />
      </div>

      {/* Page 3 */}
      <div
        className={currentPage === 3 ? classes.activePage : classes.formPage}
      >
        <OwnerDetails handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} classes={classes} />
      </div>
      {/* Page 4 */}
      <div
        className={currentPage === 4 ? classes.activePage : classes.formPage}
      >
        <RestaurantTiming handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} classes={classes} />
      </div>
    </div>
  );
};

export default AddRestaurantForm;
