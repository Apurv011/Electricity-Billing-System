import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";

function UserNavbar(props) {
  let history = useHistory();

  const [password, setPassword] = useState({
    password: ""
  });

  const [b, setB] = useState(false);

  function logout() {
    localStorage.clear();
    history.push("/login");
  }

  function viewBills() {
    history.push("/myBills");
  }

  function home() {
    history.push("/userHome");
  }

  function paidBills() {
    history.push("/paidBills");
  }

  function handleChange(event) {
    const value = event.target.value;
    setPassword({
      password: value
    });
  }

  function updatePassword() {
    const loggedInUser = localStorage.getItem("userData");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      const config = {
        headers: { Authorization: "Bearer " + foundUser.token }
      };

      axios
        .patch(
          `http://localhost:5000/user/pass/${foundUser.user._id}`,
          password,
          config
        )
        .then((response) => {
          console.log(response.data);
        });
      setPassword({
        password: ""
      });
    } else {
      history.push("/login");
    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button className="navbar-brand btn">Electricity Billing System</button>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {props.page !== "Home" && (
                <button onClick={home} className="nav-link btn">
                  Home
                </button>
              )}
            </li>
            <li className="nav-item">
              {props.page !== "View Bill" && (
                <button onClick={viewBills} className="nav-link btn">
                  View Bills
                </button>
              )}
            </li>
            <li className="nav-item">
              {props.page !== "Payment History" && (
                <button onClick={paidBills} className="nav-link btn">
                  Payment History
                </button>
              )}
            </li>
            <li className="nav-item">
              <button
                data-toggle="modal"
                data-target="#exampleModalCenter"
                className="nav-link btn"
              >
                Change Password
              </button>
            </li>
            <li className="nav-item">
              <button onClick={logout} className="nav-link btn">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="modal fade" id="exampleModalCenter">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Change your Password</h5>
            </div>
            <div className="modal-body">
              <label>
                <b>Enter new Password</b>
              </label>
              <div className="form-inline">
                <input
                  type={!b ? "password" : "text"}
                  name="password"
                  value={password.password}
                  onChange={handleChange}
                  className="form-control mr-sm-2"
                />
                {!b ? (
                  <i style={{ position: "relative" }}>
                    {" "}
                    <BsFillEyeFill onClick={() => setB(!b)} />
                  </i>
                ) : (
                  <i style={{ position: "relative" }}>
                    <BsFillEyeSlashFill onClick={() => setB(!b)} />
                  </i>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={updatePassword}
                data-dismiss="modal"
              >
                Done
              </button>
              <button
                type="button"
                className="btn btn-outline-dark"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserNavbar;
