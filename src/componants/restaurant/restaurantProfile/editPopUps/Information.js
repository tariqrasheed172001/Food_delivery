import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { editRestaurantInfoURL } from "../../../../BackEndURLs/Urls";
import useNotification from "../../../snackbars/SnackBar";
import axios from "axios";

function Information({ handleChange, restaurantProfile,getRestaurant }) {
  const [open, setOpen] = React.useState(false);
  const [conf,setConf] = useNotification();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [editInfo, setEditInfo] = useState({
    restaurant_id: "",
    name: "",
    address: "",
    phone_number: "",
    user_id: "",
  });
  useEffect(() => {
    setEditInfo({
      ...editInfo,
      restaurant_id: restaurantProfile?.restaurant?.restaurant_id,
      name: restaurantProfile?.restaurant?.name,
      address: restaurantProfile?.restaurant?.address,
      phone_number: restaurantProfile?.restaurant?.phone_number,
      user_id: restaurantProfile?.restaurant?.user_id,
    });
  }, [restaurantProfile]);
  const handleEditInfo = async () => {
    await axios
      .post(editRestaurantInfoURL, editInfo, {
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
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Kindly provide restaurant info...
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            defaultValue={restaurantProfile.restaurant?.name}
            variant="standard"
            name="name"
            onChange={(event) => handleChange(event, editInfo, setEditInfo)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={restaurantProfile.restaurant?.address}
            name="address"
            onChange={(event) => handleChange(event, editInfo, setEditInfo)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Contact"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={restaurantProfile.restaurant?.phone_number}
            name="phone_number"
            onChange={(event) => handleChange(event, editInfo, setEditInfo)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleEditInfo()}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Information;
