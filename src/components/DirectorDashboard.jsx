// components/EmployeeDashboard.jsx

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function DirectorDashboard() {
 
  const userId = useSelector((state) => state.auth.userId);
  const managerId = useSelector((state) => state.auth.managerId);


  return (
    <>
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <div className="text-center">
          <h1>Welcome, Director!</h1>
          {userId ? <p>Your ID is: {userId}</p> : <p>Loading...</p>}
        </div>
      </div>
    </>
  );
}

export default DirectorDashboard;
