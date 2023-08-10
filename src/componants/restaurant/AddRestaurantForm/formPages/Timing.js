import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import axios from "axios";
import useNotification from "../../../snackbars/SnackBar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRestaurantURL, getRestaurantURL } from "../../../../BackEndURLs/Urls";
import { setRestaurantProfile } from "../../../../Redux/Actions/restaurantProfileAction";

function Timing({
  handleNextPage,
  handlePrevPage,
  classes,
  setRestaurantData,
  restaurantData,
  setLoading,
}) {
  const [weekdays, setWeekdays] = useState({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: true,
  });
  const [opensAt, setOpensAt] = useState(dayjs("2022-04-17T15:30"));
  const [closesAt, setClosesAt] = useState(dayjs("2022-04-17T15:30"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [flag,setFlag] = useState(false);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setWeekdays((prevWeekdays) => ({
      ...prevWeekdays,
      [name]: checked,
    }));
  };

  useEffect(() => {
    const weekdaysString = Object.keys(weekdays)
      .filter((day) => weekdays[day]) // Filter only the true (selected) weekdays
      .join(",");

    setRestaurantData((prevData) => ({
      ...prevData,
      timings: {
        ...prevData.timings,
        working_days: weekdaysString,
      },
    }));
  }, [weekdays]);

  const handleOpenChange = (newTime) => {
    setOpensAt(newTime);
    let hour = newTime.hour(); // Get the hour
    if (hour > 12) hour -= 12;
    const minutes = newTime.minute(); // Get the minutes
    const amPm = newTime.format("A"); // Get the AM/PM format
    const openingTime = `${hour}:${minutes} ${amPm}`;
    setRestaurantData((prevData) => ({
      ...prevData,
      timings: {
        ...prevData.timings,
        opens_at: openingTime,
      },
    }));
  };
  const hanldeCloseChange = (newTime) => {
    setClosesAt(newTime);
    let hour = newTime.hour(); // Get the hour
    if (hour > 12) hour -= 12;
    const minutes = newTime.minute(); // Get the minutes
    const amPm = newTime.format("A"); // Get the AM/PM format
    const closingTime = `${hour}:${minutes} ${amPm}`;
    setRestaurantData((prevData) => ({
      ...prevData,
      timings: {
        ...prevData.timings,
        closes_at: closingTime,
      },
    }));
  };

  const [conf, setConf] = useNotification();
  const data = useSelector((state)=>state.userData);

  const getRestaurant = async () => {
    await axios
      .post(getRestaurantURL,data, { withCredentials: true })
      .then((res) => {
        if (res.status === 202) {
          dispatch(setRestaurantProfile(null));
          console.log("data is not there");
        } else {
          dispatch(setRestaurantProfile(res.data));
          console.log("data is there", res);
        }
      })
      .catch((error) => {
        console.log("User not found", error);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    await axios
      .post(addRestaurantURL, restaurantData, { withCredentials: true })
      .then((res) => {
        setConf({ msg: res.data.message, variant: "success" });
        console.log(res);
        setFlag(true);
        setLoading(false);
      })
      .catch((error) => {
        setConf({ msg: "error while adding restaurant", variant: "error" });
        setLoading(false);
      });
      
  };

  useEffect(()=>{
    getRestaurant();
    if(flag)
      navigate('/');
  },[flag]);

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
                      <h2>Restaurant timings</h2>
                      <p className="small text-muted">
                        Select the opening hours and working days.
                      </p>
                      <div className="form-outline flex-fill mb-4">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["MobileTimePicker"]}>
                            <DemoItem label="Opens at">
                              <MobileTimePicker
                                required
                                value={opensAt}
                                onChange={handleOpenChange}
                              />
                            </DemoItem>
                            <DemoItem label="Closes at">
                              <MobileTimePicker
                                required
                                value={closesAt}
                                onChange={hanldeCloseChange}
                              />
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </div>
                      <div className="form-outline flex-fill mb-4">
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
                      </div>
                      <div className={classes.navigation}>
                        <Button
                          className={classes.button}
                          variant="primary"
                          onClick={handlePrevPage}
                        >
                          Previous
                        </Button>
                        <Button
                          variant="success"
                          type="submit"
                          onClick={(event) => handleSubmit(event)}
                        >
                          Submit
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

export default Timing;
