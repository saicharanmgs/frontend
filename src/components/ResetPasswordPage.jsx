import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    verificationCode: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const { email, verificationCode, newPassword } = formData;

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    }
    if (!verificationCode.trim()) {
      newErrors.verificationCode = "Verification code is required.";
    }
    if (!newPassword.trim()) {
      newErrors.newPassword = "New password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:9090/api/v1/reset-password", null, {
        params: {
          email: formData.email,
          verificationCode: formData.verificationCode,
          newPassword: formData.newPassword,
        },
      });
      toast.success("Password reset successfully.");
      navigate("/");
    } catch (error) {
      toast.error("Failed to reset password.");
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
    color: 'aliceblue'
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
          Reset Password
        </h3>
        <hr />

        <form onSubmit={handleSubmit} style={formstyle}>
          <div className="form-group">
            <label>Enter Email</label>
            <input
              type="email"
              className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <br />

          <div className="form-group">
            <label>Enter Verification Code</label>
            <input
              type="text"
              className={`form-control form-control-lg ${errors.verificationCode ? 'is-invalid' : ''}`}
              name="verificationCode"
              value={formData.verificationCode}
              onChange={handleChange}
            />
            {errors.verificationCode && <div className="invalid-feedback">{errors.verificationCode}</div>}
          </div>
          <br />

          <div className="form-group">
            <label>Enter New Password</label>
            <input
              type="password"
              className={`form-control form-control-lg ${errors.newPassword ? 'is-invalid' : ''}`}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
            {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
          </div>
          <br />

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary btn-lg w-100"
            >
              Reset Password
            </button>
          </div>
          <br />

          <button
            type="button"
            className="btn btn-link"
            onClick={() => navigate('/')}
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
