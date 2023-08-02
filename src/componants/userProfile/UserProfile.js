import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFlagg } from "../../Redux/Actions/flagAction";

function UserProfile({setLoading}) {
  const userData = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let imageUrl = userData?.imageUrl;

  const handleLogout = (event) => {
    setLoading(true);
    Cookies.remove("token");
    console.clear();
    setTimeout(() => {
        setLoading(false);
        navigate('/');
      }, 2000);
    localStorage.clear('userData');
    dispatch(setFlagg(false));
  };

  useEffect(()=>{
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
    }, 1000);    
  },[])

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-md-9 col-lg-7 col-xl-5">
            <div className="card" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4">
                <div className="d-md-flex text-black"> {/* Use d-md-flex to show items in a row on medium and above */}
                  {/* Display the image only on smaller screens (below medium) */}
                  {imageUrl && (
                    <div className="flex-shrink-0 d-md-none mb-3">
                      <img
                        src={imageUrl}
                        alt="image"
                        className="img-fluid"
                        style={{ width: "4rem", borderRadius: "10px;" }}
                      />
                    </div>
                  )}

                  <div className="flex-grow-1 ms-md-3">
                    <h5 className="mb-1">{userData?.name}</h5>
                    <p className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>
                      {userData.email}
                    </p>
                    <p className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>
                      {userData.phone}
                    </p>
                    <div
                      className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: "#efefef" }}
                    ></div>
                    <div className="d-flex pt-1">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="btn btn-primary flex-grow-1"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                  
                  {/* Display the image only on medium and above screens */}
                  {imageUrl && (
                    <div className="flex-shrink-0 d-none d-md-block ms-3">
                      <img
                        src={imageUrl}
                        alt="image"
                        className="img-fluid"
                        style={{ width: "10rem", borderRadius: "50%" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
