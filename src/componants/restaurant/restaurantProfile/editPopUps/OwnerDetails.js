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
import { editRestaurantOnwerDetails } from "../../../../BackEndURLs/Urls";

function OwnerDetails({ handleChange, restaurantProfile,getRestaurant }) {
  const [open, setOpen] = React.useState(false);
  const [conf,setConf] = useNotification();
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
  };
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
