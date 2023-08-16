import React, { useEffect, useState } from "react";
import "./myRestaurant.css";
import Iframe from "react-iframe";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  addRestaurantBankDetailsURL,
  editRestaurantBankDetailsURL,
  editRestaurantInfoURL,
  editRestaurantOnwerDetails,
  getRestaurantURL,
} from "../../../BackEndURLs/Urls";
import axios from "axios";
import useNotification from "../../snackbars/SnackBar";
import BankDetails from "./editPopUps/BankDetails";
import Information from "./editPopUps/Information";
import OwnerDetails from "./editPopUps/OwnerDetails";
import Timings from "./editPopUps/Timings";

function MyRestaurant() {
  const [mapUrl, setMapUrl] = useState(
    `https://www.google.com/maps/embed/v1/search?key=${process.env.REACT_APP_Google_API_KEY}&q=Umer Abad, Zainakote, Ummer Abad, Srinagar, Jammu and Kashmir 190012&zoom=16&maptype=satellite`
  );
  const [restaurantProfile, setRestaurantProfile] = useState({});
  const [conf, setConf] = useNotification();
  const data = useSelector((state) => state.userData);

  const [bankDetails, setBankDetails] = useState({
    account_number: "",
    bank_name: "",
    bank_code: "",
    restaurant_id: "",
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(restaurantProfile);
  const getRestaurant = async () => {
    await axios
      .post(getRestaurantURL, data, { withCredentials: true })
      .then((res) => {
        if (res.status === 202) {
          console.log("data is not there");
        } else {
          setRestaurantProfile(res.data);
          console.log("data is there", res);
        }
      })
      .catch((error) => {
        console.log("Restaurant details not found", error);
      });
  };
  // console.log(restaurantProfile);
  const [bankFlag, setBankFlag] = useState(false);

  useEffect(() => {
    getRestaurant();
  }, []);

  useEffect(() => {
    if (restaurantProfile?.bank_details?.bank_name) {
      setBankFlag(true);
    }
    console.log(restaurantProfile?.restaurant?.restaurant_id);
    setBankDetails({
      ...bankDetails,
      restaurant_id: restaurantProfile?.restaurant?.restaurant_id,
    });
    setMapUrl(
      `https://www.google.com/maps/embed/v1/search?key=${process.env.REACT_APP_Google_API_KEY}&q=${restaurantProfile?.restaurant?.address}&zoom=16&maptype=satellite`
    );
  }, [restaurantProfile]);

  const handleChange = (event, container, setContainer) => {
    const { name, value } = event.target;
    setContainer({ ...container, [name]: value });
  };

  const addBankDetails = async () => {
    await axios
      .post(addRestaurantBankDetailsURL, bankDetails, { withCredentials: true })
      .then((res) => {
        console.log("response:", res);
        handleClose();
        setConf({ msg: "Bank details saved.", variant: "success" });
        getRestaurant();
      })
      .catch((error) => {
        console.log("error occured while saving bank details.", error);
        setConf({
          msg: "Internal server error try after some time.",
          variant: "error",
        });
      });
  };

  return (
    <div className="">
      <div className="row">
        <div>
          <div className="card map-card">
            <div className="card-body">
              <h5 className="card-title">Restaurant Location</h5>
              <Divider />
              <Iframe
                src={mapUrl}
                allowFullScreen
                width="100%"
                styles={{ marginTop: "10px", borderRadius: "4px" }}
                height="91%"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="card-columns">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Information</h5>
                <div className="divider">
                  <Divider />
                </div>
                <form>
                  <div className="form-group row align-items-start">
                    <div className="mb-3">
                      <label for="Name" className="col-sm-12 col-form-label">
                        Name
                      </label>
                      <input
                        class="form-control "
                        type="text"
                        value={restaurantProfile.restaurant?.name}
                        aria-label="readonly input example"
                        readonly
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="mb-3">
                      <label for="Address" className="col-sm-12 col-form-label">
                        Address
                      </label>
                      <input
                        class="form-control "
                        type="text"
                        value={restaurantProfile.restaurant?.address}
                        aria-label="readonly input example"
                        readonly
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="mb-3">
                      <label for="Contact" className="col-sm-12 col-form-label">
                        Contact
                      </label>
                      <input
                        class="form-control "
                        type="text"
                        value={restaurantProfile.restaurant?.phone_number}
                        aria-label="readonly input example"
                        readonly={false}
                      />
                    </div>
                  </div>
                  <div>
                    <Information
                      handleChange={handleChange}
                      restaurantProfile={restaurantProfile}
                      getRestaurant={getRestaurant}
                    />
                  </div>
                </form>
              </div>
            </div>
            {bankFlag ? (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Bank details</h5>
                  <div className="divider">
                    <Divider />
                  </div>
                  <form>
                    <div className="form-group row">
                      <div className="mb-3">
                        <label
                          for="account-number"
                          className="col-sm-12 col-form-label"
                        >
                          Account Number
                        </label>
                        <input
                          class="form-control "
                          type="text"
                          value={restaurantProfile.bank_details?.account_number}
                          aria-label="readonly input example"
                          readonly
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="mb-3">
                        <label
                          for="Bank-name-and-address"
                          className="col-lg-12 col-form-label"
                        >
                          Bank name
                        </label>
                        <input
                          class="form-control "
                          type="text"
                          value={restaurantProfile.bank_details?.bank_name}
                          aria-label="readonly input example"
                          readonly
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="mb-3">
                        <label for="Phone" className="col-sm-12 col-form-label">
                          Bank code/IFSC code
                        </label>
                        <input
                          class="form-control "
                          type="text"
                          value={restaurantProfile.bank_details?.bank_code}
                          aria-label="readonly input example"
                          readonly
                        />
                      </div>
                    </div>
                    <div>
                      <BankDetails
                        handleChange={handleChange}
                        restaurantProfile={restaurantProfile}
                        getRestaurant={getRestaurant}
                      />
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="card-body">
                  <Button variant="outlined" onClick={handleClickOpen}>
                    Add bank details
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Bank details</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Kindly provide restaurant bank details.
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        label="Account Number"
                        type="number"
                        fullWidth
                        variant="standard"
                        name="account_number"
                        onChange={(event) =>
                          handleChange(event, bankDetails, setBankDetails)
                        }
                      />
                      <TextField
                        autoFocus
                        margin="dense"
                        label="Bank Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        name="bank_name"
                        onChange={(event) =>
                          handleChange(event, bankDetails, setBankDetails)
                        }
                      />
                      <TextField
                        autoFocus
                        margin="dense"
                        label="Bank code"
                        type="text"
                        fullWidth
                        variant="standard"
                        name="bank_code"
                        onChange={(event) =>
                          handleChange(event, bankDetails, setBankDetails)
                        }
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={() => addBankDetails()}>Save</Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            )}

            <div className="card">
              <div className="card-body ">
                <h5 className="card-title">Owner</h5>
                <div className="divider">
                  <Divider />
                </div>
                <form>
                  <div className="form-group row">
                    <div className="mb-3">
                      <label for="Name" className="col-sm-12 col-form-label">
                        Name
                      </label>
                      <input
                        class="form-control "
                        type="text"
                        value={restaurantProfile.owner?.name}
                        aria-label="readonly input example"
                        readonly
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="mb-3">
                      <label for="Email" className="col-sm-12 col-form-label">
                        Email
                      </label>
                      <input
                        class="form-control "
                        type="text"
                        value={restaurantProfile.owner?.email}
                        aria-label="readonly input example"
                        readonly
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="mb-3">
                      <label for="Phone" className="col-sm-12 col-form-label">
                        Phone
                      </label>
                      <input
                        class="form-control "
                        type="text"
                        value={restaurantProfile.owner?.phone_number}
                        aria-label="readonly input example"
                        readonly
                      />
                    </div>
                  </div>
                  <OwnerDetails
                    handleChange={handleChange}
                    restaurantProfile={restaurantProfile}
                    getRestaurant={getRestaurant}
                  />
                </form>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Timing</h5>
                <div className="divider">
                  <Divider />
                </div>
                <form>
                  <div className="form-group row">
                    <div className="mb-3">
                      <label for="Opening" className="col-sm-12 col-form-label">
                        Opening
                      </label>
                      <input
                        class="form-control "
                        type="text"
                        value={restaurantProfile.timings?.opening_time}
                        aria-label="readonly input example"
                        readonly
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="mb-3">
                      <label for="Closing" className="col-sm-12 col-form-label">
                        Closing
                      </label>
                      <input
                        class="form-control "
                        type="text"
                        value={restaurantProfile.timings?.closing_time}
                        aria-label="readonly input example"
                        readonly
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="mb-3">
                      <label
                        for="open-days"
                        className="col-sm-12 col-form-label"
                      >
                        Open days
                      </label>
                      <input
                        class="form-control "
                        type="text"
                        value={restaurantProfile.timings?.working_days}
                        aria-label="readonly input example"
                        readonly
                      />
                    </div>
                  </div>
                  <div>
                    <Timings
                      handleChange={handleChange}
                      restaurantProfile={restaurantProfile}
                      getRestaurant={getRestaurant}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyRestaurant;
