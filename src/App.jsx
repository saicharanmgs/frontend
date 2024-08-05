import "./App.css";
// import { ProfileRegistration } from "./components/ProfileRegistration";
// import { ProfileList } from "./components/ProfileList";
import { Home } from "./components/Home";
// Add this at the top of your main JavaScript file (e.g., index.js)
import 'bootstrap/dist/css/bootstrap.min.css';

// import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EmployeeLoginPage } from "./components/EmployeeLoginPage";
import { ManagerLoginPage } from "./components/ManagerLoginPage";
import { TravelAgentLoginPage } from "./components/TravelAgentLoginPage";
import { ManagerDashboard } from "./components/ManagerDashboard";
import { EmployeeDashboard } from "./components/EmployeeDashboard";
import { EmployeeNavbar } from "./components/EmployeeNavbar";
import { DirectorDashboard } from "./components/DirectorDashboard";
import { DirectorNavbar } from "./components/DirectorNavbar";
import { DirectorTravelRequests } from "./components/DirectorTravelRequests";
import { AddEmployee } from "./components/AddEmployee";
import { ManagerNavbar } from "./components/ManagerNavbar";
import { NewTravelRequest } from "./components/NewTravelRequest";
import { MyTravelRequests } from "./components/MyTravelRequests";
import { ManagerTravelRequests} from "./components/ManagerTravelRequests"
import EmployeesByManager from "./components/EmployeesByManager";
import TravelAgentDashboard from "./components/TravelAgentDashboard";
import TravelAgentNavbar from "./components/TravelAgentNavbar";
import TravelAgentDashboardV2 from "./components/TravelAgentDashboardV2";
import TravelAgentNavbarV2 from "./components/TravelAgentNavbarV2";
import TravelAgentRequestsV2  from "./components/TravelAgentRequestsV2";
import TravelAgentRequests from "./components/TravelAgentRequests";
<com></com>

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
          <Route path="/travel-agent-dashboard-v2" element={<><TravelAgentNavbarV2 /><TravelAgentDashboardV2/></>} />
          <Route path="/travel-agent-requests-v2" element={<><TravelAgentNavbarV2 /><TravelAgentRequestsV2/></>} />

          <Route path="/directordashboard" element={<><DirectorNavbar></DirectorNavbar><DirectorDashboard /></>} />
          <Route path="/addemployee" element={<><ManagerNavbar></ManagerNavbar><AddEmployee /></>} />
          <Route path="/employeedashboard" element={<><EmployeeNavbar/><EmployeeDashboard /></>} />
          <Route path="/new-travelrequest" element={<><EmployeeNavbar/><NewTravelRequest /></>} />
          <Route path="/my-travel-requests" element={<><EmployeeNavbar /><MyTravelRequests /></>} />
          <Route path="/manager-travel-requests" element={<><ManagerNavbar /><ManagerTravelRequests /></>} />
          <Route path="/director-travel-requests" element={<><DirectorNavbar /><DirectorTravelRequests /></>} />
          <Route path="/myemployees" element={<><ManagerNavbar /><EmployeesByManager/></>} />
          <Route path="/travel-agent-dashboard" element={<><TravelAgentNavbar /><TravelAgentDashboard/></>} />
          <Route path="/travel-agent-requests" element={<><TravelAgentNavbar /><TravelAgentRequests/></>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
