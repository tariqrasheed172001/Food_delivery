import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import useNotification from "../snackbars/SnackBar";
import GoogleAuth from "./GoogleAuth";
import { useDispatch, useSelector } from "react-redux";

const otpUrl = `${process.env.REACT_APP_API}/send-otp`;
const emailExistingUrl = `${process.env.REACT_APP_API}/checkExistingEmail`;

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [conf, setConf] = useNotification();

  const [flag, setFlag] = useState(false);
  const [userData, setUserData] = useState("");

  const [otp, setOtp] = useState("");
  const [otpFlag, setOtpFlag] = useState(false);

  const [compPassword, setCompPassword] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    passwordd: "",
    phone: "",
  });

  const sendOtp = () => {
    axios
      .post(
        otpUrl,
        { phoneNumber: `+91${data.phone}`, email: `${data.email}` },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        setOtp(res.data.otp);
        dispatch({ type: "SET_OTP_FLAG", payload: true });
        setOtpFlag(true);
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // preventing the default page reload

    // checking if email already exists

    if (data.passwordd === compPassword) {
      axios
        .post(
          emailExistingUrl,
          { email: data.email },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          sendOtp();
        })
        .catch((error) => {
          console.error("Error checking Existing Url:", error);
          setConf({ msg: error.response.data.message, variant: "warning" });
        });
    } else {
      setConf({ msg: "Passwords do NOT match.", variant: "error" });
    }
  };

  useEffect(() => {
    if (otpFlag)
      navigate("/send-otp", {
        state: {
          otp: otp,
          formData: data,
        },
      });
  }, [otpFlag, otp, navigate]);

  useEffect(() => {
    if (flag) {
      navigate("/", { state: userData });
    }
  }, [flag, navigate]);

  return (
    <section
      className="vh-100"
      style={{
        background:
          "linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2) ), url('https://img.freepik.com/free-photo/top-view-circular-food-frame_23-2148723455.jpg?w=1800&t=st=1690031370~exp=1690031970~hmac=c12c351c50673109e0fe0f99893e9f3b6a09668e1da503d7288cb8e82bc47f8a')",
        backgroundSize: "contain",
      }}
    >
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>

                    <form
                      onSubmit={(event) => {
                        handleSubmit(event);
                      }}
                      method="POST"
                      className="mx-1 mx-md-4"
                    >
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          {/* <label className="form-label" for="form3Example1c">
                            Your Name
                          </label> */}
                          <input
                            required
                            placeholder="Your Name"
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            name="name"
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          {/* <label className="form-label" for="form3Example3c">
                            Your Email
                          </label> */}
                          <input
                            required
                            placeholder="Your Email"
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            name="email"
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          {/* <label className="form-label" for="form3Example4cd">
                            phone
                          </label> */}
                          <input
                            required
                            placeholder="phone"
                            type="number"
                            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                            id="form3Example4cd"
                            className="form-control"
                            name="phone"
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          {/* <label className="form-label" for="form3Example4c">
                            Password
                          </label> */}
                          <input
                            required
                            placeholder="Password"
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            name="passwordd"
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          {/* <label className="form-label" for="form3Example4cd">
                            Repeat your password
                          </label> */}
                          <input
                            required
                            placeholder="Repeat your password"
                            type="password"
                            id="form3Example4cd"
                            className="form-control"
                            onChange={(event) => {
                              event.preventDefault();
                              setCompPassword(event.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          required
                          className="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example3c"
                        />
                        <label className="form-check-label" for="form2Example3">
                          I agree all statements in{" "}
                          <a href="#!">Terms of service</a>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          SignUp
                        </button>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <GoogleAuth
                          setUserData={setUserData}
                          setFlag={setFlag}
                        />
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">
                        Have already an account?{" "}
                        <a
                          href="#!"
                          className="fw-bold text-body"
                          onClick={() => navigate("/login")}
                        >
                          <u>Login here</u>
                        </a>
                      </p>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://s1.1zoom.me/big0/372/Meat_products_Shashlik_French_fries_White_521249_1280x866.jpg"
                      className="img-fluid"
                      alt="Sample image"
                    />
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

export default Register;
