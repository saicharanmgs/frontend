import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../features/auth/authSlice.js";

// CSS styles for the login page
const styles = {
  container: {
    backgroundImage: 'url("https://wallpapercave.com/wp/wp2939910.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  card: {
    width: "320px", // Increased width
    padding: "2.5rem 1.5rem", // Increased padding
    textAlign: "center",
    background: "#2a2b38",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  field: {
    marginTop: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5em",
    backgroundColor: "#1f2029",
    borderRadius: "4px",
    padding: "0.5em 1em",
  },
  inputIcon: {
    height: "1em",
    width: "1em",
    fill: "#ffeba7",
  },
  inputField: {
    background: "none",
    border: "none",
    outline: "none",
    width: "100%",
    color: "#d3d3d3",
  },
  title: {
    marginBottom: "1rem",
    fontSize: "1.5em",
    fontWeight: "500",
    color: "#f5f5f5",
  },
  btn: {
    margin: "1rem",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    fontSize: "0.8em",
    textTransform: "uppercase",
    padding: "0.6em 1.2em",
    backgroundColor: "#ffeba7",
    color: "#5e6681",
    boxShadow: "0 8px 24px 0 rgb(255 235 167 / 20%)",
    transition: "all 0.3s ease-in-out",
  },
  btnLink: {
    color: "#f5f5f5",
    display: "block",
    fontSize: "0.75em",
    transition: "color 0.3s ease-out",
  },
};

export function EmployeeLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);

  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    userId: "",  // Changed to lowercase to match input field name
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetErrors, setResetErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const { userId, password } = formData;

    if (!userId.trim()) {
      newErrors.userId = "User ID is required.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    dispatch(loginRequest());
    try {
      const response = await axios.post(
        "http://localhost:9090/api/v1/login",
        formData
      );
      console.log("Form submitted:", response.data);

      dispatch(
        loginSuccess({
          userId: response.data.employeeId,
          managerId: response.data.managerId,
          designation: response.data.designation,
        })
      );

      const dashboardPath = getDashboardPath(response.data.designation);
      navigate(dashboardPath);
      toast.success("Login success");
      setMessage("Login success");
    } catch (error) {
      dispatch(loginFailure("User ID or password is incorrect"));
      toast.error("User ID or password is incorrect");
      setMessage("User ID or password is incorrect");
    }
  };

  // this will be called when send email is clicked
  const handleForgotPassword = async () => {
    if (!resetEmail.trim()) {
      setResetErrors({ email: "Email is required." });
      return;
    }
  
    try {
      await axios.post("http://localhost:9090/api/v1/forgot-password/send-code", null, {
        params: {
          email: resetEmail,
        },
      });
      toast.success("Verification code sent to your email.");
      setShowForgotPassword(false);
    } catch (error) {
      toast.error("Failed to send verification code.");
    }
  };
  

  const handleResetChange = (event) => {
    setResetEmail(event.target.value);
  };

  const getDashboardPath = (designation) => {
    switch (designation.toLowerCase()) {
      case "employee":
        return "/employeedashboard";
      case "manager":
        return "/managerdashboard";
      case "travel agent":
        return "/travel-agent-dashboard-v2";
      case "director":
        return "/directordashboard";
      default:
        return "/employeedashboard";
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h4 className="title" style={styles.title}>
          Log In!
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="field" style={styles.field}>
            <svg
              className="input-icon"
              style={styles.inputIcon}
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z"></path>
            </svg>
            <input
              autoComplete="on"
              id="userId"
              placeholder="User ID"
              className="input-field"
              name="userId"
              type="text"
              value={formData.userId}
              onChange={handleChange}
              style={styles.inputField}
            />
          </div>
          <div className="field" style={styles.field}>
            <svg
              className="input-icon"
              style={styles.inputIcon}
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"></path>
            </svg>
            <input
              autoComplete="off"
              id="logpass"
              placeholder="Password"
              className="input-field"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.inputField}
            />
          </div>
          <br />
          <button type="submit" className="btn" style={styles.btn}>
            Log In
          </button>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeLoginPage;
