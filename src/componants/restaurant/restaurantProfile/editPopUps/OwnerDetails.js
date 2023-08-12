import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import useNotification from "../../../snackbars/SnackBar";
import {
  editRestaurantOnwerDetails,
  restaurantContactOtpURL,
  sendOtpEmailURL,
} from "../../../../BackEndURLs/Urls";
import OtpVerifier from "../../AddRestaurantForm/formPages/OtpVerifier";

function OwnerDetails({
  handleChange,
  restaurantProfile,
  getRestaurant,
}) {
  const [open, setOpen] = React.useState(false);
  const [conf, setConf] = useNotification();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [editOwnerDetails, setEditOwnerDetails] = useState({
    owner_id: "",
    name: "",
    email: "",
    phone_number: "",
    restaurant_id: "",
  });
  useEffect(() => {
    setEditOwnerDetails({
      ...editOwnerDetails,
      owner_id: restaurantProfile?.owner?.owner_id,
      name: restaurantProfile?.owner?.name,
      email: restaurantProfile?.owner?.email,
      phone_number: restaurantProfile?.owner?.phone_number,
      restaurant_id: restaurantProfile?.restaurant?.restaurant_id,
    });
  }, [restaurantProfile]);
  const handleEditOwnerDetails = async () => {
    if (
      editOwnerDetails?.name === "" ||
      editOwnerDetails?.email === "" ||
      editOwnerDetails?.phone_number === ""
    ) {
      setConf({ msg: "Please fill all required fields.", variant: "warning" });
    } else {
      await axios
        .post(editRestaurantOnwerDetails, editOwnerDetails, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          handleClose();
          setConf({ msg: res.data, variant: "success" });
          getRestaurant();
        })
        .catch((error) => {
          console.log(error);
          setConf({
            msg: "Internal server error try after some time",
            variant: "error",
          });
        });
    }
  };

  const [email, setEmail] = useState({
    email: "",
  });
  const [emailFlag, setEmailFlag] = useState(false);
  const [receivedEmailOtp, setReceivedEmailOtp] = useState();
  const [emailVerified, setEmailVerified] = useState(false);

  const sendEmail = () => {
    axios
      .post(sendOtpEmailURL, email, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setReceivedEmailOtp(res.data.otp);
        setConf({ msg: "OTP sent", variant: "success" });
        console.log("received", receivedEmailOtp);
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
      });
  };
  useEffect(() => {
    if (emailFlag) sendEmail();
  }, [emailFlag]);

  const [phone, setPhone] = useState({
    phone: "",
  });
  const [sendOtp, setSendOtp] = useState(false);
  const [receivedPhoneOtp, setReceivedPhoneOtp] = useState();
  const [verified, setVerified] = useState(false);

  const send = () => {
    console.log(phone.phone);
    axios
      .post(restaurantContactOtpURL, phone, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setReceivedPhoneOtp(res.data.otp);
        setConf({ msg: "OTP sent", variant: "success" });
        console.log("received", receivedPhoneOtp);
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
      });
  };
  useEffect(() => {
    if (sendOtp) send();
  }, [sendOtp]);

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>owner details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Kindly provide restaurant onwer details.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            defaultValue={restaurantProfile.owner?.name}
            variant="standard"
            name="name"
            onChange={(event) =>
              handleChange(event, editOwnerDetails, setEditOwnerDetails)
            }
          />
          <div style={{ display: "flex" }}>
            <TextField
              autoFocus
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              defaultValue={restaurantProfile.owner?.email}
              name="email"
              onChange={(event) =>
                handleChange(event, editOwnerDetails, setEditOwnerDetails)
              }
            />
            <Button
              style={{ marginLeft: "1rem" }}
              onClick={(event) => {
                event.preventDefault();
                const Inputemail = editOwnerDetails?.email;
                if (Inputemail !== "") {
                  setEmail({
                    ...email,
                    email: Inputemail,
                  });
                  setEmailFlag(!emailFlag);
                } else {
                  setConf({
                    msg: "Please enter email.",
                    variant: "warning",
                  });
                }
              }}
              disabled={emailVerified}
            >
              {emailVerified ? "Verified" : "Verify"}
            </Button>
          </div>
          {emailFlag && (
            <div className="form-outline flex-fill mb-4">
              <OtpVerifier
                setFlag={setEmailFlag}
                receivedOtp={receivedEmailOtp}
                setVerified={setEmailVerified}
              />
            </div>
          )}
          <div style={{ display: "flex" }}>
            <TextField
              autoFocus
              margin="dense"
              label="Phone"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={restaurantProfile.owner?.phone_number}
              name="phone_number"
              onChange={(event) =>
                handleChange(event, editOwnerDetails, setEditOwnerDetails)
              }
            />
            <Button
              style={{ marginLeft: "1rem" }}
              onClick={(event) => {
                event.preventDefault();
                const phoneInput = editOwnerDetails?.phone_number;
                if (phoneInput !== "") {
                  setPhone({
                    ...phone,
                    phone: `+91${phoneInput}`,
                  });
                  setSendOtp(!sendOtp);
                } else {
                  setConf({
                    msg: "Please enter Contact.",
                    variant: "warning",
                  });
                }
              }}
              disabled={verified}
            >
              {verified ? "Verified" : "Verify"}
            </Button>
          </div>
          {sendOtp && (
            <div className="form-outline flex-fill mb-4">
              <OtpVerifier
                setFlag={setSendOtp}
                receivedOtp={receivedPhoneOtp}
                setVerified={setVerified}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleEditOwnerDetails()}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default OwnerDetails;
