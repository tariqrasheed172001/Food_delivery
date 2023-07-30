import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="page-wrap d-flex flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center">
              <span className="display-1 d-block">404</span>
              <div className="mb-4 lead">
                The page you are looking for was not found.
              </div>
              <a onClick={() => navigate("/login")} className="btn btn-link">
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
