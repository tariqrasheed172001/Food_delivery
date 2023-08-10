import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import useNotification from "../../snackbars/SnackBar";
import Cookies from "js-cookie";
import GoogleAuth from "../GoogleAuth";
import { useDispatch } from "react-redux";
import "./login.css";
import ProgressBar from "../../ProgressBar/ProgressBar";
import { setUserData } from "../../../Redux/Actions/userDataActions";
import { setFlagg } from "../../../Redux/Actions/flagAction";
import { ResetPasswordURL, loginURL } from "../../../BackEndURLs/Urls";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Login() {
  const [conf, setConf] = useNotification();
  const [flag, setFlag] = useState(false);
  const [forgetPasswordEmail, setForgetPasswordEmail] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const [formData, setFormData] = useState({
    email: "",
    passwordd: "",
  });

  const login = async () => {
    setLoading(true);
    await axios
      .post(loginURL, formData, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setConf({ msg: res.data.message, variant: "success" });
          dispatch(setUserData(res.data.user));
          setLoading(false);
          Cookies.set("token", res.data.token, { expires: 1 });
          setFlag(true);
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

  useEffect(() => {
    if (flag) {
      navigate("/");
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
      .post(ResetPasswordURL, forgetPasswordEmail)
      .then((res) => {
        setConf({
          msg: "Link has been sent. Check your inbox",
          variant: "success",
        });
        setLoading(false);
        handleClose();
        dispatch(setFlagg(true));
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
      {loading && <ProgressBar />}
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
                          <GoogleAuth setFlag={setFlag} />
                        </div>
                        <div>
                          <a
                            className="small text-muted"
                            variant="outlined"
                            style={{
                              cursor: "pointer",
                              textDecoration: "none",
                            }}
                            onClick={handleClickOpen}
                          >
                            Forgot password ?
                          </a>
                          <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Password Reset</DialogTitle>
                            <DialogContent>
                              <DialogContentText>
                                Enter your email address and we'll send you an
                                email with instructions to reset your password.
                              </DialogContentText>
                              <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="standard"
                                name="email"
                                onChange={(event) => {
                                  event.preventDefault();
                                  setForgetPasswordEmail({
                                    ...forgetPasswordEmail,
                                    [event.target.name]: event.target.value,
                                  });
                                }}
                              />
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose}>Cancel</Button>
                              <Button onClick={(event) => handleSend(event)}>
                                Send
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </div>

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
