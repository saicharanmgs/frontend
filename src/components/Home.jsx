import React from "react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="text-center mb-5">
            <h2>Welcome to Employee Travel Request App</h2>
            <p className="lead">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              pharetra elit ut justo pulvinar, sed ullamcorper felis tempor.
              Nulla facilisi.
            </p>
            <p className="lead">
                This app is completely developed by me Lorem ipsum dolor sit amet.
            </p>
            <Link to="/employeelogin" className="btn btn-primary">
              Employee and Manager Login
            </Link>
            <p className="lead">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              pharetra elit ut justo pulvinar, sed ullamcorper felis tempor.
              Nulla facilisi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, consectetur?
            </p>
            <Link to="/travelagentlogin" className="btn btn-primary">
               Travel Agent Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
