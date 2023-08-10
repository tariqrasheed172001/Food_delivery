import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import useNotification from "../../../snackbars/SnackBar";
import Iframe from "react-iframe";
import Autocomplete from "react-google-autocomplete";

function Details({
  handleNextPage,
  classes,
  setRestaurantData,
  restaurantData,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRestaurantData((prevData) => ({
      ...prevData,
      restaurant: {
        ...prevData.restaurant,
        [name]: value,
      },
    }));
  };
  const [conf, setConf] = useNotification();

  const handleNext = () => {
    // Check if the required fields are filled
    const { name, address } = restaurantData?.restaurant;
    if (!name || !address) {
      setConf({ msg: "Please fill all fields.", variant: "warning" });
      return;
    } else handleNextPage();
  };

  const handleMap = () => {
    // Initialize the modal when the component mounts
    const modal = new window.bootstrap.Modal(
      document.getElementById("google-map")
    );
    modal.show(); // Show the modal immediately when the component mounts
  };

  const mapUrl = `https://www.google.com/maps/embed/v1/search?key=${process.env.REACT_APP_Google_API_KEY}&q=Hazratbal, Srinagar, Jammu and Kashmir 190006&zoom=16&maptype=satellite`;

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
                      <h2>Restaurant details</h2>
                      <p className="small text-muted">
                        Name,Address and Contact
                      </p>
                      <div className="form-outline flex-fill mb-4">
                        <input
                          required
                          placeholder="Restaurant Name"
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
                          placeholder="Full address"
                          type="text"
                          id="form2Example27"
                          className="form-control"
                          name="address"
                          onChange={handleChange}
                        />
                        <a
                          className="small text-muted"
                          style={{
                            cursor: "pointer",
                            textDecoration: "none",
                            border: "1px solid lightGrey",
                            borderRadius: "5px",
                            marginLeft: "1rem",
                          }}
                          onClick={() => handleMap()}
                        >
                          Get address
                        </a>
                        {/* forget password model start */}
                        <div
                          className="modal top fade"
                          id="google-map"
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                          data-mdb-backdrop="true"
                          data-mdb-keyboard="true"
                        >
                          <div
                            className="modal-dialog modal-xl"
                            style={{
                              width: "100%",
                              height: "100%",
                              position: "fixed",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                            }}
                          >
                            <div className="modal-content text-center">
                              <div className="modal-header h5 text-white bg-primary justify-content-center">
                                Grab your restaurant address
                              </div>
                              <Autocomplete
                                apiKey={process.env.REACT_APP_Google_API_KEY}
                                onPlaceSelected={(place) => {
                                  console.log(place);
                                }}
                              />
                              <Iframe
                                src={mapUrl}
                                allowFullScreen
                                styles={{
                                  height: "500px",
                                  borderRadius: "5px",
                                }}
                              />
                              {/* <SearchBar /> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={classes.navigation}>
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

export default Details;
