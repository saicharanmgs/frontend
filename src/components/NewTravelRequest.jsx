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

  const handleSubmit = async (event) => {
    event.preventDefault();
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
                className="form-control"
                name="fromLocation"
                value={formData.fromLocation} // Corrected from formData.from to formData.fromLocation
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Destination</label>
              <input
                type="text"
                className="form-control"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                className="form-control"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                className="form-control"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Reason</label>
              <textarea
                className="form-control"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                className="form-control"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                min="0" // Optional: to prevent negative values
              />
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
