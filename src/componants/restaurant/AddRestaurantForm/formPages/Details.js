import React from "react";
import { Button } from "react-bootstrap";
import useNotification from "../../../snackbars/SnackBar";

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
  const [conf,setConf] = useNotification();

  const handleNext = () => {
    // Check if the required fields are filled
    const { name, address } = restaurantData?.restaurant; 
    if (!name || !address) {
      setConf({msg:"Please fill all fields.",variant:"warning"});
      return;
    }else
      handleNextPage()
  };

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
                      </div>
                      <div className={classes.navigation}>
                        <Button
                          variant="primary"
                          onClick={() => handleNext()}
                        >
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
