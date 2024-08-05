import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function NewTravelRequest() {
  const initialFormData = {
    destination: "",
    fromLocation: "",
    startDate: "",
    endDate: "",
    reason: "",
    amount: ""
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const userId = useSelector((state) => state.auth.userId);
  const managerId = useSelector((state) => state.auth.managerId);
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
    const { destination, fromLocation, startDate, endDate, reason, amount } = formData;
    const currentDate = new Date().toISOString().split('T')[0];

    if (!fromLocation.trim()) newErrors.fromLocation = "From location is required.";
    if (!destination.trim()) newErrors.destination = "Destination is required.";
    if(fromLocation == destination) newErrors.destination = "from location and destiation should not be same";
    if (!startDate) newErrors.startDate = "Start date is required.";
    if (startDate && startDate < currentDate + 1) newErrors.startDate = "Start date must be a future date.";
    if (!endDate) newErrors.endDate = "End date is required.";
    if (startDate && endDate && startDate > endDate) newErrors.dateRange = "Start date cannot be after end date.";
    if (startDate && endDate && startDate === endDate) newErrors.dateRange = "Start date and end date should not be same";
    if (!reason.trim()) newErrors.reason = "Reason is required.";
    if (amount === "" || amount < 0) newErrors.amount = "Amount must be a non-negative number.";
    if(amount < 100) newErrors.amount = "Amount less than 100 is not allowed";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const requestDate = new Date().toISOString().split('T')[0];
    try {
      console.log("Submitting travel request:", formData);
      const response = await axios.post("http://localhost:9090/api/v1/new-travel-request", {
        requestDate,
        ...formData,
        employeeId: userId,
        managerId: managerId,
      });
      console.log("Response received:", response.data);
      
      // Show success message
      toast.success("Travel request submitted successfully!");
      setMessage("Travel request submitted successfully!");

      // Clear the form
      setFormData(initialFormData);  // Reset to initial state

    } catch (error) {
      console.error("Submission error:", error);
      setMessage("Failed to submit travel request. Please try again.");
      toast.error("Failed to submit travel request. Please try again.");
    }
  };

  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <div className="w-25">
          <h3 className="alert alert-primary text-center">New Travel Request</h3>
          <hr />

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>From</label>
              <input
                type="text"
                className={`form-control ${errors.fromLocation ? 'is-invalid' : ''}`}
                name="fromLocation"
                value={formData.fromLocation}
                onChange={handleChange}
              />
              {errors.fromLocation && <div className="invalid-feedback">{errors.fromLocation}</div>}
            </div>
            <div className="form-group">
              <label>Destination</label>
              <input
                type="text"
                className={`form-control ${errors.destination ? 'is-invalid' : ''}`}
                name="destination"
                value={formData.destination}
                onChange={handleChange}
              />
              {errors.destination && <div className="invalid-feedback">{errors.destination}</div>}
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
              {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                className={`form-control ${errors.endDate || errors.dateRange ? 'is-invalid' : ''}`}
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
              {errors.endDate && <div className="invalid-feedback">{errors.endDate}</div>}
              {errors.dateRange && <div className="invalid-feedback">{errors.dateRange}</div>}
            </div>
            <div className="form-group">
              <label>Reason</label>
              <textarea
                className={`form-control ${errors.reason ? 'is-invalid' : ''}`}
                name="reason"
                value={formData.reason}
                onChange={handleChange}
              ></textarea>
              {errors.reason && <div className="invalid-feedback">{errors.reason}</div>}
            </div>
            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                min="0" // Optional: to prevent negative values
              />
              {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
            </div>
            <br />
            <div className="form-group">
              <input
                type="submit"
                value="Submit Request"
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

export default NewTravelRequest;
