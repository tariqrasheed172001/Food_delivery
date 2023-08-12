import React, { useState } from "react";
import useNotification from "../../../snackbars/SnackBar";
import Iframe from "react-iframe";
import Autocomplete from "react-google-autocomplete";
import { Button } from "react-bootstrap";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

function Details({
  handleNextPage,
  classes,
  setRestaurantData,
  restaurantData,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRestaurantData((prevData) => ({
      ...prevData,
      restaurant: {
        ...prevData.restaurant,
        [name]: value,
      },
    }));
  };
  const [conf, setConf] = useNotification();

  const handleNext = () => {
    // Check if the required fields are filled
    const { name, address } = restaurantData?.restaurant;
    if (!name || !address) {
      setConf({ msg: "Please fill all fields.", variant: "warning" });
      return;
    } else handleNextPage();
  };

  const mapUrl = `https://www.google.com/maps/embed/v1/search?key=${process.env.REACT_APP_Google_API_KEY}&q=Hazratbal, Srinagar, Jammu and Kashmir 190006&zoom=16&maptype=satellite`;

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  }); 

  const [open, setOpen] = useState(false);

  const handleClickOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <section className="vh-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row justify-content-center">
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form method="POST">
                      <h2>Restaurant details</h2>
                      <p className="small text-muted">
                        Name,Address and Contact
                      </p>
                      <div className="form-outline flex-fill mb-4">
                        <input
                          required
                          placeholder="Restaurant Name"
                          type="test"
                          id="form2Example17"
                          className="form-control"
                          name="name"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-outline flex-fill mb-4">
                        <input
                          required
                          placeholder="Full address"
                          type="text"
                          id="form2Example27"
                          className="form-control"
                          name="address"
                          onChange={handleChange}
                        />

                        <div>
                          <button  className="btn btn-outline-primary" style={{fontSize:"1rem", marginLeft: "1rem"}} variant="outlined" onClick={handleClickOpen}>
                            Get
                          </button>
                          {open && 
                          <Dialog
                            fullScreen
                            open={open}
                            TransitionComponent={Transition}
                          >
                            <AppBar sx={{ position: "relative" }}>
                              <Toolbar>
                                <IconButton
                                  edge="start"
                                  color="inherit"
                                  onClick={handleClose}
                                  aria-label="close"
                                >
                                  <CloseIcon />
                                </IconButton>
                                <Typography
                                  sx={{ ml: 2, flex: 1 }}
                                  variant="h6"
                                  component="div"
                                >
                                  Find your restaurant
                                </Typography>
                                <Button
                                  autoFocus
                                  color="inherit"
                                  onClick={()=>handleClose()}
                                >
                                  save
                                </Button>
                              </Toolbar>
                            </AppBar>
                            <Divider/>
                            <Divider/>
                            <Divider/>
                            <Divider/>
                            <Divider/>
                            <Divider/>
                            <Divider/>
                            <Autocomplete
                                apiKey={process.env.REACT_APP_Google_API_KEY}
                                onPlaceSelected={(place) => {
                                  console.log(place);
                                }}
                              />
                              <Divider/>
                              <Divider/>
                              <Divider/>
                              <Divider/>
                              <Divider/>
                              <Divider/>
                              <Divider/>
                              <Iframe
                                src={mapUrl}
                                allowFullScreen
                                styles={{
                                  height: "100vh",
                                  borderRadius: "5px",
                                }}
                              />
                          </Dialog>
                        }
                        </div>
                      </div>
                      <div className={classes.navigation}>
                        <Button variant="primary" onClick={() => handleNext()}>
                          Next
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Details;
