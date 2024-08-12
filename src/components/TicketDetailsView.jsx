import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TicketDetailsView = () => {
  const { requestId } = useParams(); // Extract requestId from URL parameters
  const [ticketDetails, setTicketDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (requestId) {
      // Fetch ticket details when requestId is available
      const fetchTicketDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:9090/api/tickets/${requestId}`);
          setTicketDetails(response.data);
          setError(null); // Clear any previous errors
        } catch (error) {
          console.error('Error fetching ticket details', error);
          setError('Error fetching ticket details');
        }
      };

      fetchTicketDetails();
    }
  }, [requestId]); // Re-run the effect when requestId changes

  // Inline styles
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    padding: '20px',
    backgroundColor: '#f0f0f0', // Light gray background to contrast with white card
  };

  const cardStyle = {
    width: '200px',
    height: '200px',
    padding: '1rem',
    background: '#2c3e50', // Darker background for the card
    borderRadius: '8px',
    backdropFilter: 'blur(5px)',
    borderBottom: '3px solid rgba(255, 255, 255, 0.440)',
    borderLeft: '2px rgba(255, 255, 255, 0.545) outset',
    boxShadow: '-40px 50px 30px rgba(0, 0, 0, 0.280)',
    transform: 'skewX(10deg)',
    transition: '.4s',
    overflow: 'hidden',
    color: 'white',
    position: 'relative',
  };

  const cardHoverStyle = {
    height: '380px',
    width:'400px',
    transform: 'skew(0deg)',
  };

  const alignStyle = {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'row',
    gap: '5px',
    alignSelf: 'flex-start',
  };

  const redStyle = {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#ff605c',
    boxShadow: '-5px 5px 5px rgba(0, 0, 0, 0.280)',
  };

  const yellowStyle = {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#ffbd44',
    boxShadow: '-5px 5px 5px rgba(0, 0, 0, 0.280)',
  };

  const greenStyle = {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#00ca4e',
    boxShadow: '-5px 5px 5px rgba(0, 0, 0, 0.280)',
  };

  const titleStyle = {
    textAlign: 'center',
    margin: '1.3rem',
    color: 'rgb(218, 244, 237)',
    textShadow: '-10px 5px 10px rgba(0, 0, 0, 0.573)',
  };

  // Determine if card is hovered based on state
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={containerStyle}>
      <div
        style={{
          ...cardStyle,
          ...(isHovered && cardHoverStyle),
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card content */}
        <div style={alignStyle}>
          <div style={redStyle} />
          <div style={yellowStyle} />
          <div style={greenStyle} />
        </div>
        <h1 style={titleStyle}>Ticket Details</h1>
        <div style={{ padding: '1rem' }}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {ticketDetails ? (
            <div style={{ color: 'white' }}>
              <p><strong>Start Date & Time:</strong> {new Date(ticketDetails.startDateTime).toLocaleString()}</p>
              <p><strong>End Date & Time:</strong> {new Date(ticketDetails.endDateTime).toLocaleString()}</p>
              <p><strong>Travel Name:</strong> {ticketDetails.travelName}</p>
              <p><strong>Seat Number:</strong> {ticketDetails.seatNumber}</p>
              <p><strong>Other Details:</strong> {ticketDetails.otherDetails}</p>
            </div>
          ) : (
            <p style={{ color: 'white' }}>Ticket Not Generated Yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsView;
