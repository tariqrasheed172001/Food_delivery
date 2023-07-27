
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useNotification from "../snackbars/SnackBar";
import axios from "axios";
import "./otp.css";



function Otp() {
  const location = useLocation();

  const [conf, setConf] = useNotification();
  const [flag, setFlag] = useState(false);

  const receivedData = location.state;

  const navigate = useNavigate();

  // const url = "http://localhost:8000/register";
  // const otpUrl = "http://localhost:8000/send-otp";
  const url = "https://hungrezy-api-tariqrasheed172001.onrender.com/register";
  const otpUrl = "https://hungrezy-api-tariqrasheed172001.onrender.com/send-otp";

  const [otpVerification, setOtpVerification] = useState(false);
  const [resended,setResended] = useState(false);

  const inputsRef = useRef([]);

  const sendOtpAgain = () =>{
    axios
      .post(otpUrl, { phoneNumber: `+91${receivedData?.formData?.phone}` },{withCredentials:true})
      .then((res) => {
        console.log(res);
        receivedData.otp = res.data.otp;
        setResended(true);
        setConf({msg:'A code has been resended',variant:'success'});
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
      });
  }

  const registerUser = () => {
    axios.post(url, receivedData?.formData,{withCredentials:true})
    .then((res) => {
      console.log(res);
      setConf({ msg: res.data.message, variant: "success" });
      setFlag(true);
    })
    
};

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value) {
      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  let phoneNumber = receivedData?.formData?.phone;
  phoneNumber = phoneNumber?.replace(/.(?=.{4})/g, '*'); //regular expression to mask firs 6 digits of a number.

  const handleClick = (event) => {
    event.preventDefault();
    const enteredOtp = inputsRef.current.map((input) => input.value).join("");
    console.log(enteredOtp);
    console.log(receivedData);
    if (enteredOtp == receivedData?.otp) {
      setOtpVerification(true);
    } else {
      setConf({ msg: "Wrong otp", variant: "error" });
      setOtpVerification(false);
    }
  };

  useEffect(() => {
    if (otpVerification)
      registerUser();
  }, [otpVerification]);

  useEffect(() => {
    if (flag) 
      navigate("/login");
  }, [flag]);
  return (
    <div
      style={{
        background:
          "linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2) ), url('https://images.pexels.com/photos/4281747/pexels-photo-4281747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        backgroundSize: "cover",
      }}
      className="container height-100 d-flex justify-content-center align-items-center"
    >
      <div className="position-relative">
        {/* Rest of your code */}
        <div className="position-relative">
          <div className="card cardd p-2 text-center">
            <h6>
              Please enter the one time password
              <br />
              to verify your account
            </h6>
            <div>
              <span className="success">A code has been {resended ? " resended" : " sent"} to</span>
              <small className="success">*******{phoneNumber}</small>
            </div>
            <div
              id="otp"
              className="inputs d-flex flex-row justify-content-center mt-2"
            >
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  ref={(ref) => (inputsRef.current[index] = ref)}
                  className="m-2 text-center form-control rounded"
                  type="text"
                  maxLength="1"
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
            {/* Rest of your code */}
            <div className="mt-4">
              <button
                onClick={(event) => handleClick(event)}
                className="btn btn-danger px-4 validate"
              >
                Validate
              </button>
            </div>
          </div>
          <div className="card cardd-2">
            <div className="content d-flex justify-content-center align-items-center">
              <span>Didn't get the code </span>
              <button onClick={()=>sendOtpAgain()} className="btn btn-danger btn-sm">
                Resend
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otp;
