import React from "react";
import { Button } from "react-bootstrap";

function OwnerDetails({handleNextPage,handlePrevPage,classes}) {
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
                      <h2>Owner details</h2>
                      <p className="small text-muted">
                       Name,email,phone
                      </p>
                      <div className="form-outline flex-fill mb-4">
                        <input
                          required
                          placeholder="Name of owner"
                          type="test"
                          id="form2Example17"
                          className="form-control"
                          name="name"
                        />
                      </div>
                      <div className="form-outline flex-fill mb-4">
                        <input
                          required
                          placeholder="email address of owner"
                          type="email"
                          id="form2Example27"
                          className="form-control"
                          name="email"
                        />
                      </div>
                      <div className="form-outline flex-fill mb-4">
                        <input
                          required
                          placeholder="Mobile number of owner"
                          type="number"
                          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                          id="form3Example4cd"
                          className="form-control"
                          name="phone"
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

export default OwnerDetails;
