import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import useNotification from "../../snackbars/SnackBar";
import Cookies from "js-cookie";
import GoogleAuth from "../GoogleAuth";
import { useDispatch } from "react-redux";
import './login.css';
import ProgressBar from "../../ProgressBar/ProgressBar";

const url = `${process.env.REACT_APP_API}/login`;

function Login() {
  const [conf, setConf] = useNotification();
  const [flag, setFlag] = useState(false);
  const [userData, setUserData] = useState("");
  const [forgetPasswordEmail, setForgetPasswordEmail] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const [formData, setFormData] = useState({
    email: "",
    passwordd: "",
  });

  const login = () => {
    setLoading(true);
    axios
      .post(url, formData, { withCredentials: true })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setConf({ msg: res.data.message, variant: "success" });
          setFlag(true);
          dispatch({ type: "SET_LOGIN_FLAG", payload: true });
          setUserData(res.data.user);

          console.log(res.data.user.name);
          setLoading(false);
          Cookies.set("token", res.data.token, { expires: 1 });
        } else if (res.status === 201) {
          setLoading(false);
          setConf({ msg: res.data.message, variant: "error" });
        }
      })
      .catch((error) => {
        setConf({ msg: "User not found", variant: "error" });
        setLoading(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };
  console.log(userData);

  useEffect(() => {
    if (flag) {
      navigate("/", { state: userData });
    }
  }, [flag, navigate]);


  const handleResetButton = () => {
    // Initialize the modal when the component mounts
    const modal = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
    modal.show(); // Show the modal immediately when the component mounts
  };

  const handleSend = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API}/reset-password`, forgetPasswordEmail)
      .then((res) => {
        setConf({
          msg: "Link has been sent. Check your inbox",
          variant: "success",
        });
        setLoading(false);
        dispatch({ type: "SET_RESET_PASSWORD_LINK_FLAG", payload: true });
        navigate("/login");
      })
      .catch((error) => {
        setLoading(false);
        setConf({ msg: error.response.data.message, variant: "error" });
      });
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); 
    }, 1000); 
  }, [setLoading]);

  return (
    <>
      {loading && (
        <ProgressBar />
      )}
      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row justify-content-center">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://images.unsplash.com/photo-1654922207993-2952fec328ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form
                        method="POST"
                        onSubmit={(event) => {
                          handleSubmit(event);
                        }}
                      >
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: "#ff6219" }}
                          ></i>
                          <span className="h1 fw-bold mb-0">Logo</span>
                        </div>
                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Sign into your account
                        </h5>
                        <div className="form-outline flex-fill mb-4">
                          <input
                            required
                            placeholder="Email address"
                            type="email"
                            id="form2Example17"
                            className="form-control"
                            name="email"
                            onChange={(event) => {
                              event.preventDefault();
                              setFormData({
                                ...formData,
                                [event.target.name]: event.target.value,
                              });
                            }}
                          />
                        </div>
                        <div className="form-outline flex-fill mb-4">
                          <input
                            required
                            placeholder="Password"
                            type="password"
                            id="form2Example27"
                            className="form-control"
                            name="passwordd"
                            onChange={(event) => {
                              event.preventDefault();
                              setFormData({
                                ...formData,
                                [event.target.name]: event.target.value,
                              });
                            }}
                          />
                        </div>
                        <div className="pt-1 mb-4 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            login
                          </button>
                        </div>
                        <div className="form-outline flex-fill mb-4">
                          <GoogleAuth
                            setUserData={setUserData}
                            setFlag={setFlag}
                          />
                        </div>
                        <a
                          className="small text-muted"
                          style={{
                            cursor: "pointer",
                            textDecoration: "none",
                          }}
                          onClick={() => handleResetButton()}
                        >
                          Forgot password
                        </a>
                        {/* forget password model start */}
                        <div
                          className="modal top fade"
                          id="exampleModal"
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                          data-mdb-backdrop="true"
                          data-mdb-keyboard="true"
                        >
                          <div
                            className="modal-dialog"
                            style={{
                              width: "300px",
                              position: "fixed",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                            }}
                          >
                            <div className="modal-content text-center">
                              <div className="modal-header h5 text-white bg-primary justify-content-center">
                                Password Reset
                              </div>
                              <div className="modal-body px-5">
                                <p className="py-2">
                                  Enter your email address and we'll send you an
                                  email with instructions to reset your
                                  password.
                                </p>
                                <div className="form-outline">
                                  <input
                                    type="email"
                                    id="typeEmail"
                                    className="form-control my-3"
                                    placeholder="Email"
                                    name="email"
                                    onChange={(event) => {
                                      event.preventDefault();
                                      setForgetPasswordEmail({
                                        ...forgetPasswordEmail,
                                        [event.target.name]: event.target.value,
                                      });
                                    }}
                                  />
                                </div>
                                <a
                                  onClick={(event) => handleSend(event)}
                                  href="#"
                                  className="btn btn-primary w-100"
                                >
                                  Send
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* forget password model end */}

                        <p
                          classNameName="mb-5 pb-lg-2"
                          style={{ textDecoration: "none" }}
                        >
                          Don't have an account?{" "}
                          <a
                            onClick={() => navigate("/register")}
                            style={{ color: "#393f81", cursor: "pointer" }}
                          >
                            Register here
                          </a>
                        </p>
                        <a href="#!" className="small text-muted">
                          Terms of use.
                        </a>
                        <a href="#!" className="small text-muted">
                          Privacy policy
                        </a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
