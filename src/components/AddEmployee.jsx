import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function AddEmployee() {
  const initialFormData = {
    name: "",
    phone: "",
    designation: "",
    mail: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
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

  const validateForm = () => {
    const newErrors = {};
    const { name, phone, designation, mail, password } = formData;
    
    // Password validation rules
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Validate Name
    if (!name.trim()) newErrors.name = "Name is required.";
    else if(name.length < 5) newErrors.name = "name must contain alteast 5 characters";
    else if (!/^[a-zA-Z\s]+$/.test(name)) {
      newErrors.name = "Name must contain only alphabetic characters and spaces.";
    }
    // Validate Phone
    if (!phone.trim()) newErrors.phone = "Phone number is required.";
    else if (/[^0-9]/.test(phone)) newErrors.phone = "Phone number must only contain numeric characters.";
    else if (!/^\d{10}$/.test(phone)) newErrors.phone = "Phone number must be 10 digits.";

    // Validate Designation
    if (!designation.trim()) newErrors.designation = "Designation is required.";

    // Validate Email
    if (!mail.trim()) newErrors.mail = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(mail)) newErrors.mail = "Email format is invalid.";

    // Validate Password
    if (!password) newErrors.password = "Password is required.";
    else if (!passwordRegex.test(password)) newErrors.password = "Password must be at least 8 characters long, include at least one letter, one number, and one special character.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      console.log("Submitting form with data:", formData);
      const response = await axios.post("http://localhost:9090/api/v1/save", {
        ...formData,
        managerId: userId,
      });
      console.log("Response received:", response.data);
      toast.success("Profile created successfully! with id " + response.data.employeeId);
      setMessage("Employee added successfully! with id " + response.data.employeeId);

      // Clear the form after successful submission
      setFormData(initialFormData);  // Reset to initial state

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
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>
            <div className="form-group">
              <label>Designation</label>
              <select
                className={`form-control ${errors.designation ? 'is-invalid' : ''}`}
                name="designation"
                value={formData.designation}
                onChange={handleChange}
              >
                <option value="">Select designation</option>
                <option value="Employee">Employee</option>
                <option value="Travel Agent">Travel Agent</option>
                <option value="Manager">Manager</option>
              </select>
              {errors.designation && <div className="invalid-feedback">{errors.designation}</div>}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className={`form-control ${errors.mail ? 'is-invalid' : ''}`}
                name="mail"
                value={formData.mail}
                onChange={handleChange}
              />
              {errors.mail && <div className="invalid-feedback">{errors.mail}</div>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
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
