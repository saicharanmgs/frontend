import React from "react";
import { useSelector, useDispatch } from "react-redux";
export function ManagerDashboard() {
    const userId = useSelector((state) => state.auth.userId);

  return (
    <>
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <div className="text-center">
          <h1>Welcome, Manager!</h1>
          {userId ? <p>Your ID is: {userId}</p> : <p>Loading...</p>}
        </div>
      </div>
    </>
  );
}

export default ManagerDashboard;
