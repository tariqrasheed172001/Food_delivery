import React from "react";
import { Button } from "react-bootstrap";

function Contact({
  handleNextPage,
  handlePrevPage,
  classes,
  setRestaurantData,
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
                      <h2>Restuarant Contact</h2>
                      <p className="small text-muted">
                        For queries,customer will call on this number
                      </p>
                      <div className="form-outline flex-fill mb-4">
                        <input
                          required
                          placeholder="Contact"
                          type="number"
                          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                          id="form3Example4cd"
                          className="form-control"
                          name="phone"
                          onChange={handleChange}
                        />
                      </div>
                      <div className={classes.navigation}>
                        <Button
                          className={classes.button}
                          variant="primary"
                          onClick={handlePrevPage}
                        >
                          Previous
                        </Button>
                        <Button variant="primary" onClick={handleNextPage}>
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

export default Contact;
