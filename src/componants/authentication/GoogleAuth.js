import React from "react";
import GoogleLogin from "@leecheuk/react-google-login";
import GoogleButton from "react-google-button";
import Cookies from "js-cookie";

function GoogleAuth({ setUserData, setFlag }) {
  const onSuccess = (res) => {
    console.log(res);
    Cookies.set("token", res.accessToken, { expires: 1 });
    setUserData(res.profileObj);
    setFlag(true);
  };

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
