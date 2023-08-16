import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import useNotification from "../../../snackbars/SnackBar";
import OtpVerifier from "./OtpVerifier";
import axios from "axios";
import { restaurantContactOtpURL } from "../../../../BackEndURLs/Urls";

function Contact({
  handleNextPage,
  handlePrevPage,
  classes,
  setRestaurantData,
  restaurantData,
}) {
  const [conf, setConf] = useNotification();
  const [sendOtp, setSendOtp] = useState(false);
  const [phone, setPhone] = useState({
    phone: "",
  });
  const [receivedOtp,setReceivedOtp] = useState();
  const [verified,setVerified] = useState(false);

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

  const send = () =>{
    console.log(phone.phone)
    axios
      .post(restaurantContactOtpURL, phone, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setReceivedOtp(res.data.otp);
        setConf({msg:"OTP sent",variant:"success"})
        console.log("received",receivedOtp);
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
      });
  }
  useEffect(()=>{
    if(sendOtp)
      send();
  },[sendOtp]);

 

  const handleNext = (event) => {
    if(verified)
      handleNextPage(event);
    else{
      setConf({msg:"Please verify phone number",variant:"warning"});
    }
  }

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
                      <h2>Restuarant Contact</h2>
                      <p className="small text-muted">
                        For queries,customer will call on this number
                      </p>
                      <div className="form-outline flex-fill mb-2">
                        <input
                          required
                          placeholder="Contact"
                          type="number"
                          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                          id="form3Example4cd"
                          className="form-control"
                          name="phone"
                          onChange={handleChange}
                          disabled={verified}
                        />
                        <button
                          style={{ marginLeft: "1rem" }}
                          onClick={(event) => {
                            event.preventDefault();
                            const phoneInput = event.target.previousSibling;
                            if (phoneInput.value.trim() !== "") {
                              setPhone({
                                ...phone,
                                phone: `+91${phoneInput.value.trim()}`,
                              });
                              setSendOtp(!sendOtp);
                            } else {
                              setConf({
                                msg: "Please enter Contact.",
                                variant: "warning",
                              });
                            }
                          }}
                          className="btn btn-outline-primary"
                          disabled={verified}
                        >
                          {verified ? "Verified" : "Verify"}
                        </button>
                      </div>
                      {sendOtp && (
                        <div className="form-outline flex-fill mb-4">
                          <OtpVerifier
                            setFlag={setSendOtp}
                            receivedOtp={receivedOtp}
                            setVerified={setVerified}
                          />
                        </div>
                      )}

                      <div className={classes.navigation}>
                        <Button
                          className={classes.button}
                          variant="primary"
                          onClick={handlePrevPage}
                        >
                          Previous
                        </Button>
                        <Button variant="primary" onClick={handleNext}>
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

export default Contact;
