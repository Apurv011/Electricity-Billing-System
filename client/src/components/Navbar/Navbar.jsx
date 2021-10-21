import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Navbar(props) {
  let history = useHistory();

  function logout() {
    localStorage.clear();
    history.push("/login");
  }

  function addUser() {
    history.push("/addUser");
  }

  function viewUsers() {
    history.push("/allUsers");
  }

  function createBill() {
    history.push("/createBill");
  }

  function viewBills() {
    history.push("/viewBills");
  }

  function createZone() {
    history.push("/createZone");
  }

  function updateZone() {
    history.push("/updateZone");
  }

  function home() {
    history.push("/adminHome");
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
              {props.page !== "Add User" && (
                <button onClick={addUser} className="nav-link btn">
                  Add User
                </button>
              )}
            </li>
            <li className="nav-item">
              {props.page !== "View User" && (
                <button onClick={viewUsers} className="nav-link btn">
                  View Users
                </button>
              )}
            </li>

            <li className="nav-item">
              {props.page !== "Create Bill" && (
                <button onClick={createBill} className="nav-link btn">
                  Create Bill
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
              {props.page !== "Update Zone" && (
                <button onClick={updateZone} className="nav-link btn">
                  Update Zone
                </button>
              )}
            </li>
            <li className="nav-item">
              {props.page !== "Create Zone" && (
                <button onClick={createZone} className="nav-link btn">
                  Create Zone
                </button>
              )}
            </li>
            <li className="nav-item">
              <button onClick={logout} className="nav-link btn">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
