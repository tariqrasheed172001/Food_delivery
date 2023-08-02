import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import useNotification from "../snackbars/SnackBar";
import { useDispatch } from "react-redux";
import { setFlagg } from "../../Redux/Actions/flagAction";

function ResetPassword({ setLoading }) {
  const { user_id, token } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [conf, setConf] = useNotification();
  const [verificationStatus, setVerificationStatus] = useState("");
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordUpdation, setPasswordUpdation] = useState(false);

  const verifyResetToken = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_API}/reset-password/${user_id}/${token}`)
        .then((res) => {
          setVerificationStatus(res.data);
        });
    } catch (error) {
      console.error("Error verifying reset token:", error);
    }
  };

  useEffect(() => {
    verifyResetToken();
  }, [user_id, token]);

  const handleUpdate = (event) => {
    event.preventDefault();
    if (password.newPassword === password.confirmPassword) {
      try {
        axios
          .post(
            `${process.env.REACT_APP_API}/update-password/${user_id}/${token}`,
            password
          )
          .then((res) => {
            if (res.status === 201) {
              setConf({ msg: res?.data?.message, variant: "warning" });
            } else {
              setConf({ msg: res?.data?.message, variant: "success" });
              dispatch(setFlagg(false));
              setPasswordUpdation(true);
            }
          });
      } catch (error) {
        console.error("Error verifying reset token:", error);
      }
    } else {
      setConf({ msg: "Passwords do NOT match.", variant: "error" });
    }
  };

  useEffect(() => {
    if (passwordUpdation) navigate("/login");
  }, [passwordUpdation]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [setLoading]);

  return (
    <div>
      {verificationStatus === "Verified" ? (
        <section className="vh-100">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">
                <div className="card" style={{ borderRadius: "1rem" }}>
                  <div className="row g-0">
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                      <div className="card-body p-4 p-lg-5 text-black">
                        <form method="POST">
                          <h5
                            className="fw-normal mb-3 pb-3"
                            style={{ letterSpacing: "1px" }}
                          >
                            Update your password
                          </h5>

                          <div className="form-outline mb-5">
                            <input
                              required
                              placeholder="Password"
                              type="password"
                              id="form2Example17"
                              className="form-control form-control-lg"
                              name="newPassword"
                              onChange={(event) => {
                                event.preventDefault();
                                setPassword({
                                  ...password,
                                  [event.target.name]: event.target.value,
                                });
                              }}
                            />
                          </div>

                          <div className="form-outline mb-5">
                            <input
                              required
                              placeholder="Confirm Password"
                              type="password"
                              id="form2Example27"
                              className="form-control form-control-lg"
                              name="confirmPassword"
                              onChange={(event) => {
                                event.preventDefault();
                                setPassword({
                                  ...password,
                                  [event.target.name]: event.target.value,
                                });
                              }}
                            />
                          </div>

                          <div className="pt-1 mb-4 mb-lg-4">
                            <button
                              type="submit"
                              className="btn btn-primary btn-lg"
                              onClick={(event) => handleUpdate(event)}
                            >
                              Update
                            </button>
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
      ) : (
        <PageNotFound />
      )}
    </div>
  );
}

export default ResetPassword;
