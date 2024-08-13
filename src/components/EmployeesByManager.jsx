import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export function EmployeesByManager() {
  const [employees, setEmployees] = useState([]);
  const managerId = useSelector((state) => state.auth.userId); // Assume this is the manager's ID

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/api/v1/manager/${managerId}/employees`);
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees", error);
      }
    };

    fetchEmployees();
  }, [managerId]);

  // Inline styles for the container
  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center'
  };

  // Inline styles for individual cards
  const cardStyle = {
    width: '300px',
    height : '250px',
    padding: '1rem',
    backgroundColor: 'rgb(245, 245, 245)', // Slightly lighter dark background for cards
    border: '1px solid #555', // Lighter border for visibility
    backdropFilter: 'blur(20px)',
    borderRadius: '0.7rem',
    transition: 'all ease 0.3s',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
  };

  const cardHoverStyle = {
    boxShadow: '0px 0px 20px 1px rgba(255, 87, 34, 0.5)', // Orange shadow
    border: '1px solid red', // Orange border on hover
  };

  // Applying hover effect manually
  const handleMouseEnter = (e) => {
    e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
    e.currentTarget.style.border = cardHoverStyle.border;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.boxShadow = '';
    e.currentTarget.style.border = '';
  };

  return (
    <div className="container">
      <h3 className="alert alert-primary text-center">Employees Managed by You</h3>
      <hr />
      <div style={containerStyle}>
        {employees.length > 0 ? (
          employees.map((employee) => (
            <div
              key={employee.employeeId}
              style={cardStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="title" style={{ fontSize: '1.5rem', fontWeight: 500, letterSpacing: '0.1em' }}>
                {employee.name}
              </div>
              <div>
                <strong>User ID:</strong>
                <p style={{ margin: 0, fontSize: '0.9em', fontWeight: 300, letterSpacing: '0.1em' }}>
                  {employee.userId}
                </p>
                <strong>Phone:</strong>
                <p style={{ margin: 0, fontSize: '0.9em', fontWeight: 300, letterSpacing: '0.1em' }}>
                  {employee.phone}
                </p>
                <strong>Designation:</strong>
                <p style={{ margin: 0, fontSize: '0.9em', fontWeight: 300, letterSpacing: '0.1em' }}>
                  {employee.designation}
                </p>
                <strong>Email:</strong>
                <p style={{ margin: 0, fontSize: '0.9em', fontWeight: 300, letterSpacing: '0.1em' }}>
                  {employee.mail}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No employees found.</p>
        )}
      </div>
    </div>
  );
}

export default EmployeesByManager;
