import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { editRestaurantBankDetailsURL } from "../../../../BackEndURLs/Urls";
import useNotification from "../../../snackbars/SnackBar";

function BankDetails({ handleChange, restaurantProfile, getRestaurant }) {
  const [open, setOpen] = React.useState(false);
  const [conf, setConf] = useNotification();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [editBankDetails, setEditBankDetails] = useState({
    bank_id: "",
    account_number: "",
    bank_name: "",
    bank_code: "",
    restaurant_id: "",
  });

  useEffect(() => {
    setEditBankDetails({
      ...editBankDetails,
      bank_id: restaurantProfile?.bank_details?.bank_id,
      restaurant_id: restaurantProfile?.restaurant?.restaurant_id,
      account_number: restaurantProfile?.bank_details?.account_number,
      bank_name: restaurantProfile?.bank_details?.bank_name,
      bank_code: restaurantProfile?.bank_details?.bank_code,
    });
  }, [restaurantProfile]);

  const handleEditBankDetails = async () => {
    if (
      editBankDetails?.account_number === "" ||
      editBankDetails?.bank_code === "" ||
      editBankDetails?.bank_name === ""
    ) {
      setConf({ msg: "Please fill all required fields.", variant: "warning" });
    } else {
      await axios
        .post(editRestaurantBankDetailsURL, editBankDetails, {
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
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Bank details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Kindly provide restaurant bank details.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Account Number"
            type="number"
            fullWidth
            defaultValue={restaurantProfile.bank_details?.account_number}
            variant="standard"
            name="account_number"
            onChange={(event) =>
              handleChange(event, editBankDetails, setEditBankDetails)
            }
          />
          <TextField
            autoFocus
            required
            margin="dense"
            label="Bank Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={restaurantProfile.bank_details?.bank_name}
            name="bank_name"
            onChange={(event) =>
              handleChange(event, editBankDetails, setEditBankDetails)
            }
          />
          <TextField
            autoFocus
            required
            margin="dense"
            label="Bank code"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={restaurantProfile.bank_details?.bank_code}
            name="bank_code"
            onChange={(event) =>
              handleChange(event, editBankDetails, setEditBankDetails)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleEditBankDetails()}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BankDetails;
