import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";

function Timing({ handleNextPage, handlePrevPage, classes }) {
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
                        Select the opening ours and working days. 
                      </p>
                      <div className="form-outline flex-fill mb-4">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["MobileTimePicker"]}>
                            <DemoItem label="Opens at">
                              <MobileTimePicker
                                defaultValue={dayjs("2022-04-17T15:30")}
                              />
                            </DemoItem>
                            <DemoItem label="Closes at">
                              <MobileTimePicker
                                defaultValue={dayjs("2022-04-17T15:30")}
                              />
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </div>
                      <div className="form-outline flex-fill mb-4">
                        <div className="container">
                          <h3>Working days</h3>
                          <p className="small text-muted" >Do not forget to uncheck the off days!</p>
                          <div className="row">
                            <div className="col-md-6">
                              {Object.keys(weekdays).slice(0, 4).map((day) => (
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
                              {Object.keys(weekdays).slice(4).map((day) => (
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
                            <Button className={classes.button} variant="primary" onClick={handlePrevPage}>
                              Previous
                            </Button>
                            <Button
                              variant="success"
                              onClick={() => alert("Form submitted!")}
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
