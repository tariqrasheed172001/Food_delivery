import React, { useEffect, useState } from "react";
import GoogleLogin from "@leecheuk/react-google-login";
import GoogleButton from "react-google-button";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUserData } from "../../Redux/Actions/userDataActions";
import { emailExistingURL, registerURL } from "../../BackEndURLs/Urls";
import useNotification from "../snackbars/SnackBar";
import axios from "axios";

function GoogleAuth({ setFlag, setLoading }) {
  const [conf, setConf] = useNotification();

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  function generateString(length) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const [data, setData] = useState({
    name: "",
    email: "",
    passwordd: "",
    phone: "",
  });

  const [auth,setAuth] = useState('');

  const dispatch = useDispatch();
  const onSuccess = (res) => {
    setData((prevData) => ({
      ...prevData,
      name: res.profileObj.name,
      email: res.profileObj.email,
      passwordd: generateString(10),
    }));
    setAuth(res.accessToken);
    Cookies.set("token", res.accessToken, { expires: 1 });
    setFlag(true);
  };

  const registerUser = () => {
    setLoading(true);
    axios.post(registerURL, data, { withCredentials: true }).then((res) => {
      console.log(res);
      dispatch(setUserData(res?.data?.result)); 
      setFlag(true);
      setConf({ msg: res.data.message, variant: "success" });
      setLoading(false);
    });
  };

  const authenticate = () => {
    if (data) {
      axios
        .post(
          emailExistingURL,
          { email: data.email },
          { withCredentials: true }
        )
        .then((res) => {
          registerUser();
        })
        .catch((error) => {
          console.error("Error checking Existing Url:", error);
          setLoading(false);
          setConf({ msg: "logged in successfully", variant:"success" });
        });
    }
  };

  
  useEffect(()=>{
    if(auth){
      authenticate();
    }
  },[auth]);

  console.log(data);

  const onFailure = (res) => {
    console.log(res);
  };

  return (
    <div className="pt-1 mb-4 mb-lg-4">
      <GoogleLogin
        buttonText="google"
        clientId={process.env.REACT_APP_Google_Client_ID}
        render={(renderProps) => (
          <GoogleButton
            style={{ borderRadius: "10px" }}
            type="light"
            label="Continue with Google"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          />
        )}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={false}
      />
    </div>
  );
}

export default GoogleAuth;
