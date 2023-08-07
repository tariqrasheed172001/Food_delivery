import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import useNotification from "../../../snackbars/SnackBar";
import OtpVerifier from "./OtpVerifier";
import axios from "axios";

function OwnerDetails({
  handleNextPage,
  handlePrevPage,
  classes,
  setRestaurantData,
  restaurantData,
  setLoading,
}) {
  const [conf, setConf] = useNotification();
  const [phoneFlag, setPhoneFlag] = useState(false);
  const [emailFlag, setEmailFlag] = useState(false);
  const [emailVerified,setEmailVerified] = useState(false);
  const [phoneVerified,setPhoneVerified] = useState(false);
  const [email, setEmail] = useState({
    email: "",
  });
  const [phone, setPhone] = useState({
    Phone: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRestaurantData((prevData) => ({
      ...prevData,
      owner: {
        ...prevData.owner,
        [name]: value,
      },
    }));
  };
  const [receivedOtp, setReceivedOtp] = useState();
  const [endPoint, setEndPoint] = useState();
  const url = `${process.env.REACT_APP_API}/${endPoint}`;
  const sendOtp = (data) => {
    console.log(data);
    axios
      .post(url, data, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setReceivedOtp(res.data.otp);
        setConf({msg:"OTP sent",variant:"success"})
        console.log("received", receivedOtp);
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
      });
  };
  useEffect(() => {
    if (emailFlag) {
      console.log(url);
      // console.log(email);
      sendOtp(email);
    }
  }, [emailFlag]);
  useEffect(() => {
    if (phoneFlag) {
      console.log(url);
      sendOtp(phone);
    }
  }, [phoneFlag]);

  const handleNext = () => {
  
    if(phoneVerified && emailVerified){
      const { name } = restaurantData?.owner; 
      if (!name) {
        setConf({msg:"Please fill all fields.",variant:"warning"});
        return;
      }else
        handleNextPage()
    }else{
      if(!phoneVerified && !emailVerified)
        setConf({msg:"Please verify Mobile and email",variant:"warning"});
      else if(!phoneVerified)
        setConf({msg:"Please verify phone",variant:"warning"});
      else if(!emailVerified)
        setConf({msg:"Please verify email address",variant:"warning"});
    }
  }

  useEffect(()=>{
    if(phoneVerified){
      setLoading(true)
      setTimeout(() => {
        setLoading(false);
        setConf({msg:"Verification successfull",variant:"success"});
      }, 1000);
    }
  },[phoneVerified])
  
  useEffect(()=>{
    if(emailVerified){
      setLoading(true)
      setTimeout(() => {
        setLoading(false);
        setConf({msg:"Verification successfull",variant:"success"});
      }, 1000);
    }
  },[emailVerified])

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
                      <h2>Owner details</h2>
                      <p className="small text-muted">Name,email,phone</p>
                      <div className="form-outline flex-fill mb-4">
                        <input
                          required
                          placeholder="Name of owner"
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
                          placeholder="Email address of owner"
                          type="email"
                          id="form2Example27"
                          className="form-control"
                          name="email"
                          onChange={handleChange}
                          disabled={emailVerified}
                        />
                        <button
                          style={{ marginLeft: "1rem" }}
                          onClick={(event) => {
                            event.preventDefault();
                            const emailInput = event.target.previousSibling;
                            if (emailInput.value.trim() !== "") {
                              setEmail({
                                ...email,
                                email: emailInput.value.trim(),
                              });
                              setEndPoint("send-owner-email-otp");
                              setEmailFlag(!emailFlag);
                            } else {
                              setConf({
                                msg: "Please enter an email address.",
                                variant: "warning",
                              });
                            }
                          }}
                          className="btn btn-outline-primary"
                          disabled={emailVerified}
                        >
                          {emailVerified ? "Verified" : "Verify"}

                        </button>
                      </div>
                      {emailFlag && (
                        <div className="form-outline flex-fill mb-4">
                          <OtpVerifier
                            setFlag={setEmailFlag}
                            setLoading={setLoading}
                            receivedOtp={receivedOtp}
                            setVerified={setEmailVerified}
                          />
                        </div>
                      )}

                      <div className="form-outline flex-fill mb-4">
                        <input
                          required
                          placeholder="Mobile number of owner"
                          type="number"
                          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                          id="form3Example4cd"
                          className="form-control"
                          name="phone"
                          onChange={handleChange}
                          disabled={phoneVerified}
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
                              setEndPoint("send-owner-phone-otp");
                              setPhoneFlag(!phoneFlag);
                            } else {
                              setConf({
                                msg: "Please enter Mobile number.",
                                variant: "warning",
                              });
                            }
                          }}
                          className="btn btn-outline-primary"
                          disabled={phoneVerified}
                        >
                           {phoneVerified ? "Verified" : "Verify"}
                        </button>
                      </div>
                      {phoneFlag && (
                        <div className="form-outline flex-fill mb-4">
                          <OtpVerifier
                            setFlag={setPhoneFlag}
                            setLoading={setLoading}
                            receivedOtp={receivedOtp}
                            setVerified={setPhoneVerified}
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

export default OwnerDetails;
