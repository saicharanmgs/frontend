import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [resetEmail, setResetEmail] = useState("");
  const [resetErrors, setResetErrors] = useState({});

  const handleResetChange = (event) => {
    setResetEmail(event.target.value);
  };

  const handleForgotPassword = async () => {
    if (!resetEmail.trim()) {
      setResetErrors({ email: "Email is required." });
      return;
    }

    try {
      const response = await axios.post("http://localhost:9090/api/v1/forgot-password/send-code", null, {
        params: {
          email: resetEmail,
        },
      });
      console.log(response);
      if(response.data == "Email does not exist in database."){
        toast.error("Enter correct email id.");
      }
      else if(response.data == "Error sending verification code."){
        toast.error("Internal server error");
      }
      else{
        navigate("/reset-password");
        toast.success("Verification code sent to your email.");
      }
    } catch (error) {
      toast.error("Failed to send verification code.");
    }
  };

  const containerStyle = {
    backgroundImage: 'url("https://wallpapercave.com/wp/wp2939910.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const formstyle = {
    color : 'aliceblue'
  }

  const loginBoxStyle = {
    backgroundColor: 'rgb(255 255 255 / 0%)',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '300px',
    height: 'auto',
  };
const headingStyle = {
  backgroundColor: '#452f1200',
  color: 'aliceblue',
  borderColor: '#3e3e3e'
}

  return (
    <div style={containerStyle}>
      <div style={loginBoxStyle}>
        <h3 className="alert alert-primary text-center" style={headingStyle}>
          Forgot Password
        </h3>
        <hr />

        <form style={formstyle}>
          <div className="form-group">
            <label>Enter Email</label>
            <input
              type="email"
              className={`form-control form-control-lg ${resetErrors.email ? 'is-invalid' : ''}`}
              name="resetEmail"
              value={resetEmail}
              onChange={handleResetChange}
            />
            {resetErrors.email && <div className="invalid-feedback">{resetErrors.email}</div>}
          </div>
          <br />

          <div className="form-group">
            <button
              type="button"
              className="btn btn-primary btn-lg w-100"
              onClick={handleForgotPassword}
            >
              Send Verification Code
            </button>
          </div>
          <br />

          <button
            type="button"
            className="btn btn-link"
            onClick={() => navigate('/employeelogin')}
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
