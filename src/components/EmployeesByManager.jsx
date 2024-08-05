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

  return (
    <div className="container">
      <h3 className="alert alert-primary text-center">Employees Managed by You</h3>
      <hr />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Designation</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.employeeId}>
                <td>{employee.userId}</td>
                <td>{employee.name}</td>
                <td>{employee.phone}</td>
                <td>{employee.designation}</td>
                <td>{employee.mail}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeesByManager;
