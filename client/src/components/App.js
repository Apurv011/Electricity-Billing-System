import "../styles.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LogInPage from "./LogInPage/LogInPage";
import AdminHome from "./AdminHome/AdminHome";
import AddUser from "./AddUser/AddUser";
import AllUsers from "./AllUsers/AllUsers";
import CreateBill from "./Bills/CreateBill";
import UserHome from "./UserHome/UserHome";
import ViewBills from "./Bills/ViewBills";
import CreateZone from "./Zones/CreateZone";
import UpdateZone from "./Zones/UpdateZone";
import ViewUserBill from "./Bills/ViewUserBill";
import WelcomePage from "./WelcomePage/WelcomePage";
import PaymentHistory from "./PaymentHistory/PaymentHistory";

export default function App() {
  return (
    <Router>
      <Route path="/" exact>
        <WelcomePage />
      </Route>

      <Route path="/login" exact>
        <LogInPage />
      </Route>

      <Route path="/adminHome" exact>
        <AdminHome />
      </Route>

      <Route path="/userHome" exact>
        <UserHome />
      </Route>

      <Route path="/addUser" exact>
        <AddUser />
      </Route>

      <Route path="/allUsers" exact>
        <AllUsers />
      </Route>

      <Route path="/createBill" exact>
        <CreateBill />
      </Route>

      <Route path="/viewBills" exact>
        <ViewBills />
      </Route>

      <Route path="/createZone" exact>
        <CreateZone />
      </Route>

      <Route path="/updateZone" exact>
        <UpdateZone />
      </Route>

      <Route path="/myBills" exact>
        <ViewUserBill />
      </Route>

      <Route path="/paidBills" exact>
        <PaymentHistory />
      </Route>
    </Router>
  );
}
