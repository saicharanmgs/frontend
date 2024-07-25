import "./App.css";
// import { ProfileRegistration } from "./components/ProfileRegistration";
// import { ProfileList } from "./components/ProfileList";
import { Home } from "./components/Home";
// import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EmployeeLoginPage } from "./components/EmployeeLoginPage";
import { ManagerLoginPage } from "./components/ManagerLoginPage";
import { TravelAgentLoginPage } from "./components/TravelAgentLoginPage";


// this is root component all other components goes here
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/employeelogin" element={<EmployeeLoginPage />}></Route>
          <Route path="/managerlogin" element={<ManagerLoginPage />}></Route>
          <Route path="/travelagentlogin" element={<TravelAgentLoginPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
