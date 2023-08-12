import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { editRestaurantTimingsURL } from "../../../../BackEndURLs/Urls";
import axios from "axios";
import useNotification from "../../../snackbars/SnackBar";

function Timings({ restaurantProfile, getRestaurant }) {
  const [open, setOpen] = React.useState(false);
  const [conf, setConf] = useNotification();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [editTimings, setEditTimings] = useState({
    timing_id: "",
    opening_time: "",
    closing_time: "",
    working_days: "",
    restaurant_id: "",
  });

  useEffect(() => {
    setEditTimings({
      ...editTimings,
      timing_id: restaurantProfile?.timings?.timing_id,
      opening_time: restaurantProfile?.timings?.opening_time,
      closing_time: restaurantProfile?.timings?.closing_time,
      working_days: restaurantProfile?.timings?.working_days,
      restaurant_id: restaurantProfile?.restaurant?.restaurant_id,
    });
  }, [restaurantProfile]);

  const handleEditTimings = async () => {
    if (
      editTimings?.opening_time === "" ||
      editTimings?.closing_time === "" ||
      editTimings?.working_days === ""
    ) {
      setConf({
        msg: "Please pick time and working days.",
        variant: "warning",
      });
    } else {
      await axios
        .post(editRestaurantTimingsURL, editTimings, {
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

  const [weekdays, setWeekdays] = useState({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: true,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setWeekdays((prevWeekdays) => ({
      ...prevWeekdays,
      [name]: checked,
    }));
  };

  const [opensAt, setOpensAt] = useState(dayjs("2022-04-17T15:30"));
  const [closesAt, setClosesAt] = useState(dayjs("2022-04-17T15:30"));

  const handleOpenChange = (newTime) => {
    setOpensAt(newTime);
    let hour = newTime.hour(); // Get the hour
    if (hour > 12) hour -= 12;
    const minutes = newTime.minute(); // Get the minutes
    const amPm = newTime.format("A"); // Get the AM/PM format
    const openingTime = `${hour}:${minutes} ${amPm}`;
    setEditTimings(() => ({
      ...editTimings,
      opening_time: openingTime,
    }));
    console.log(opensAt);
  };

  useEffect(() => {
    const weekdaysString = Object.keys(weekdays)
      .filter((day) => weekdays[day]) // Filter only the true (selected) weekdays
      .join(",");

    setEditTimings(() => ({
      ...editTimings,
      working_days: weekdaysString,
    }));
  }, [weekdays]);

  console.log(editTimings);
  const hanldeCloseChange = (newTime) => {
    setClosesAt(newTime);
    let hour = newTime.hour(); // Get the hour
    if (hour > 12) hour -= 12;
    const minutes = newTime.minute(); // Get the minutes
    const amPm = newTime.format("A"); // Get the AM/PM format
    const closingTime = `${hour}:${minutes} ${amPm}`;
    setEditTimings(() => ({
      ...editTimings,
      closing_time: closingTime,
    }));
    console.log(closesAt);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Timings</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ marginBottom: "1rem" }}>
            Change your restaurant timing.
          </DialogContentText>
          <div className="container" style={{ marginBottom: "2rem" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker"]}>
                <TimePicker
                  label="Opening"
                  onChange={handleOpenChange}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                />
              </DemoContainer>
              <DemoContainer components={["TimePicker"]}>
                <TimePicker
                  label="Closing"
                  onChange={hanldeCloseChange}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="container">
            <h3>Working days</h3>
            <p className="small text-muted">
              Do not forget to uncheck the off days!
            </p>
            <div className="row">
              <div className="col-md-6">
                {Object.keys(weekdays)
                  .slice(0, 4)
                  .map((day) => (
                    <div key={day} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`checkbox-${day}`}
                        name={day}
                        checked={weekdays[day]}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`checkbox-${day}`}
                      >
                        {day}
                      </label>
                    </div>
                  ))}
              </div>
              <div className="col-md-6">
                {Object.keys(weekdays)
                  .slice(4)
                  .map((day) => (
                    <div key={day} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`checkbox-${day}`}
                        name={day}
                        checked={weekdays[day]}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`checkbox-${day}`}
                      >
                        {day}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleEditTimings()}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Timings;
