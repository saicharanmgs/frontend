import React from "react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: `url('https://www.pixelstalk.net/wp-content/uploads/images6/Travel-Wallpaper-Free-Download.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        color: "#fff",
        fontFamily: "'Roboto', sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
       
      }}

    >
      <div>
        <h2 style={{ fontSize: "2.5em", fontWeight: "bold", marginBottom: "20px", color : "#39273d" }}>
          Welcome to the Employee <br/>Travel Request App
        </h2>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Link
          to="/employeelogin"
          className="btn"
          style={{
            fontSize: "1.5em",
            padding: "10px 20px",
            backgroundColor: "rgb(221 243 219 / 13%)", // Change button color to red
            color: "#fff", // Ensure text color is white for contrast
            border: "none", // Remove default border
            borderRadius: "5px", // Optional: rounded corners
          }}
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Home;
