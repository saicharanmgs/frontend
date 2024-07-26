import "./App.css";
// import { ProfileRegistration } from "./components/ProfileRegistration";
// import { ProfileList } from "./components/ProfileList";
import { Home } from "./components/Home";
// import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EmployeeLoginPage } from "./components/EmployeeLoginPage";
import { ManagerLoginPage } from "./components/ManagerLoginPage";
import { TravelAgentLoginPage } from "./components/TravelAgentLoginPage";
import { ManagerDashboard } from "./components/ManagerDashboard";
import { EmployeeDashboard } from "./components/EmployeeDashboard";
import { EmployeeNavbar } from "./components/EmployeeNavbar";
import { AddEmployee } from "./components/AddEmployee";
import { ManagerNavbar } from "./components/ManagerNavbar";
import { NewTravelRequest } from "./components/NewTravelRequest";
import { MyTravelRequests } from "./components/MyTravelRequests";

// this is root component all other components goes here
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/employeelogin" element={<EmployeeLoginPage />}/>
          <Route path="/managerlogin" element={<ManagerLoginPage />}/>
          <Route path="/travelagentlogin" element={<TravelAgentLoginPage />}/>
          <Route path="/managerdashboard" element={<><ManagerNavbar></ManagerNavbar><ManagerDashboard /></>} />
          
          <Route path="/addemployee" element={<><ManagerNavbar></ManagerNavbar><AddEmployee /></>} />
          <Route path="/employeedashboard" element={<><EmployeeNavbar/><EmployeeDashboard /></>} />
          <Route path="/new-travelrequest" element={<><EmployeeNavbar/><NewTravelRequest /></>} />
          <Route path="/my-travel-requests" element={<><EmployeeNavbar /><MyTravelRequests /></>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
