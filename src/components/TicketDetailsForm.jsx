import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const TicketDetailsForm = () => {
  const { requestId } = useParams(); // Extract requestId from URL parameters
  const [ticketDetails, setTicketDetails] = useState({
    requestId: requestId || '', // Use requestId from URL if available
    startDateTime: '',
    endDateTime: '',
    travelName: '',
    seatNumber: '',
    otherDetails: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing ticket details if requestId is present
    if (requestId) {
      axios.get(`http://localhost:9090/api/tickets/${requestId}`)
        .then(response => {
          setTicketDetails(response.data);
        })
        .catch(error => {
          console.error('Error fetching ticket details:', error);
          toast.error('Error fetching ticket details.');
        });
    }
  }, [requestId]);

  const handleChange = (e) => {
    setTicketDetails({
      ...ticketDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (requestId) {
        await axios.put(`http://localhost:9090/api/tickets/saveticket/${requestId}`, ticketDetails);
        toast.success('Ticket details updated successfully');
      } else {
        await axios.post('http://localhost:9090/api/tickets/saveticket', ticketDetails);
        toast.success('Ticket details created successfully');
      }
      navigate('/travel-agent-requests-v2'); // Navigate to a success page or another route if needed
    } catch (error) {
      console.error('Error submitting ticket details:', error.response?.data || error.message);
      toast.error('Error submitting ticket details. Please check the console for more details.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px' }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', width: '100%', border: '1px solid #ccc', borderRadius: '8px', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ textAlign: 'center' }}>Ticket Details Form</h2>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Request ID:</label>
          <input
            type="text"
            name="requestId"
            value={ticketDetails.requestId}
            onChange={handleChange}
            required
            disabled={!!requestId} // Disable if editing an existing record
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Start Date & Time:</label>
          <input
            type="datetime-local"
            name="startDateTime"
            onChange={handleChange}
            value={ticketDetails.startDateTime}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>End Date & Time:</label>
          <input
            type="datetime-local"
            name="endDateTime"
            onChange={handleChange}
            value={ticketDetails.endDateTime}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Travel Type:</label>
          <select
            name="travelName"
            onChange={handleChange}
            value={ticketDetails.travelName}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          >
            <option value="">Select travel type</option>
            <option value="Flight">Flight</option>
            <option value="Train">Train</option>
            <option value="Bus">Bus</option>
            <option value="Ship">Ship</option>
          </select>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Seat Number:</label>
          <input
            type="text"
            name="seatNumber"
            onChange={handleChange}
            value={ticketDetails.seatNumber}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Other Details:</label>
          <textarea
            name="otherDetails"
            onChange={handleChange}
            value={ticketDetails.otherDetails}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', height: '100px' }}
          />
        </div>
        <button type="submit" style={{ display: 'block', width: '100%', padding: '10px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', fontSize: '16px', cursor: 'pointer' }}>
          {requestId ? 'Update Ticket Details' : 'Submit Ticket Details'}
        </button>
      </form>
    </div>
  );
};

export default TicketDetailsForm;
