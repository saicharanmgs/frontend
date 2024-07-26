import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function AddEmployee() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    designation: "",
    mail: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("WDrrrrrrrrrrrrrrrrrrd  " , userId);
    try {
      console.log("Submitting form with data:", formData);
      const response = await axios.post("http://localhost:9090/api/v1/save", {
        ...formData,
        managerId: userId,
      });
      console.log("Response received:", response.data);
      toast.success("Profile created successfully! with id " + response.data.employeeId);
      setMessage("Employee added successfully! with id " + response.data.employeeId);
    } catch (error) {
      console.error("Submission error:", error);
      setMessage("Failed to add employee. Please try again.");
      toast.error("Failed to add employee. Please try again.");
    }
  };

  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <div className="w-25">
          <h3 className="alert alert-primary text-center">
            Employee Registration
          </h3>
          <hr />

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Designation</label>
              <select
                className="form-control"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              >
                <option value="">Select designation</option>
                <option value="Employee">Employee</option>
                <option value="Travel Agent">Travel Agent</option>
              </select>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                name="mail"
                value={formData.mail}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div className="form-group">
              <input
                type="submit"
                value="Add employee"
                className="btn btn-primary btn-lg w-100"
              />
            </div>
          </form>
          <br />

          <h6>{message}</h6>
        </div>
      </div>
    </>
  );
}

export default AddEmployee;
