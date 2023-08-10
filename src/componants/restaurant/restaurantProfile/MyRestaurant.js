import React from "react";
import "./myRestaurant.css";
import Iframe from "react-iframe";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";

function MyRestaurant() {
  const mapUrl = `https://www.google.com/maps/embed/v1/search?key=${process.env.REACT_APP_Google_API_KEY}&q=Hazratbal, Srinagar, Jammu and Kashmir 190006&zoom=16&maptype=satellite`;
  const restaurantProfile = useSelector((state)=>state.restaurantProfile)
  console.log(restaurantProfile)
  return (
    <div className="contain">
      <div>
        <div className="card map-card">
          <div className="card-body">
            <h5 className="card-title">Restaurant Location</h5>
            <Divider />
            <Iframe
              src={mapUrl}
              allowFullScreen
              width="100%"
              styles={{ marginTop: "10px", borderRadius: "4px" }}
              height="91%"
            />
          </div>
        </div>
      </div>
      <div className="card-columns">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Information</h5>
            <div className="divider">
              <Divider />
            </div>
            <form>
              <div className="form-group row align-items-start">
                <div className="mb-3">
                  <label for="Name" className="col-sm-12 col-form-label">
                    Name
                  </label>
                  <input
                    class="form-control "
                    type="text"
                    value={restaurantProfile.restaurant.name}
                    aria-label="readonly input example"
                    readonly
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="mb-3">
                  <label for="Address" className="col-sm-12 col-form-label">
                    Address
                  </label>
                  <input
                    class="form-control "
                    type="text"
                    value={restaurantProfile.restaurant.address}
                    aria-label="readonly input example"
                    readonly
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="mb-3">
                  <label for="Contact" className="col-sm-12 col-form-label">
                    Contact
                  </label>
                  <input
                    class="form-control "
                    type="text"
                    value={restaurantProfile.restaurant.phone_number}
                    aria-label="readonly input example"
                    readonly
                  />
                </div>
              </div>
              <button
                type="button"
                style={{ border: "1px solid" }}
                className="btn btn-outline-primary"
              >
                Edit
              </button>
            </form>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Owner</h5>
            <div className="divider">
              <Divider />
            </div>
            <form>
              <div className="form-group row">
                <div className="mb-3">
                  <label for="Name" className="col-sm-12 col-form-label">
                    Name
                  </label>
                  <input
                    class="form-control "
                    type="text"
                    value={restaurantProfile.owner.name}
                    aria-label="readonly input example"
                    readonly
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="mb-3">
                  <label for="Email" className="col-sm-12 col-form-label">
                    Email
                  </label>
                  <input
                    class="form-control "
                    type="text"
                    value={restaurantProfile.owner.email}
                    aria-label="readonly input example"
                    readonly
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="mb-3">
                  <label for="Phone" className="col-sm-12 col-form-label">
                    Phone
                  </label>
                  <input
                    class="form-control "
                    type="text"
                    value={restaurantProfile.owner.phone_number}
                    aria-label="readonly input example"
                    readonly
                  />
                </div>
              </div>
              <button
                type="button"
                style={{ border: "1px solid" }}
                className="btn btn-outline-primary"
              >
                Edit
              </button>
            </form>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Bank details</h5>
            <div className="divider">
              <Divider />
            </div>
            <form>
              <div className="form-group row">
                <div className="mb-3">
                  <label
                    for="account-number"
                    className="col-sm-12 col-form-label"
                  >
                    Account Number
                  </label>
                  <input
                    class="form-control "
                    type="text"
                    value="Readonly input here..."
                    aria-label="readonly input example"
                    readonly
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="mb-3">
                  <label
                    for="Bank-name-and-address"
                    className="col-lg-12 col-form-label"
                  >
                    Bank name and Address
                  </label>
                  <input
                    class="form-control "
                    type="text"
                    value="Readonly input here..."
                    aria-label="readonly input example"
                    readonly
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="mb-3">
                  <label for="Phone" className="col-sm-12 col-form-label">
                    Bank code/IFSC code
                  </label>
                  <input
                    class="form-control "
                    type="text"
                    value="Readonly input here..."
                    aria-label="readonly input example"
                    readonly
                  />
                </div>
              </div>
              <button
                type="button"
                style={{ border: "1px solid" }}
                className="btn btn-outline-primary"
              >
                Edit
              </button>
            </form>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Timing</h5>
            <div className="divider">
              <Divider />
            </div>
            <form>
              <div className="form-group row">
                <div className="mb-3">
                  <label for="Opening" className="col-sm-12 col-form-label">
                    Opening
                  </label>
                  <input
                    class="form-control "
                    type="text"
                    value={restaurantProfile.timings.opening_time}
                    aria-label="readonly input example"
                    readonly
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="mb-3">
                  <label for="Closing" className="col-sm-12 col-form-label">
                    Closing
                  </label>
                  <input
                    class="form-control "
                    type="text"
                    value={restaurantProfile.timings.closing_time}
                    aria-label="readonly input example"
                    readonly
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="mb-3">
                  <label for="open-days" className="col-sm-12 col-form-label">
                    Open days
                  </label>
                  <input
                    class="form-control "
                    type="text"
                    value={restaurantProfile.timings.working_days}
                    aria-label="readonly input example"
                    readonly
                  />
                </div>
              </div>
              <button
                type="button"
                style={{ border: "1px solid" }}
                className="btn btn-outline-primary"
              >
                Edit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyRestaurant;
