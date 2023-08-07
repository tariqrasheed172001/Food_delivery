import React, { useEffect, useRef, useState } from "react";
import useNotification from "../../../snackbars/SnackBar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setFlagg } from "../../../../Redux/Actions/flagAction";

function OtpVerifier({ setLoading, setFlag,receivedOtp, setVerified }) {
  const [conf, setConf] = useNotification();
  const codeLength = [1, 2, 3];

  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    } else if (value && index === inputsRef.current.length - 1) {
      // If the last input field is filled, trigger handleClick
      handleClick(e);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value) {
      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    const enteredOtp = inputsRef.current.map((input) => input.value).join("");
    console.log("entered",enteredOtp);
    console.log("received",receivedOtp);
    if (enteredOtp === receivedOtp) {
        setFlag(false);
        setConf({ msg: "Verification successfully", variant: "success" });
        setVerified(true);
    } else {
      setConf({ msg: "Wrong otp", variant: "error" });
    }
  };
  return (
    <div>
      <div>
        <div>
          <div>
            <div
              id="otp"
              className="inputs d-flex flex-row justify-content-center"
            >
              {codeLength.map((index) => (
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpVerifier;
