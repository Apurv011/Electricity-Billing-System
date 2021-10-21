import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function ViewBills() {
  let history = useHistory();

  const [allBills, setAllBills] = useState([]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      if (foundUser.user.role === "admin") {
        const config = {
          headers: { Authorization: "Bearer " + foundUser.token }
        };
        axios
          .get("http://localhost:5000/bill/", config)
          .then((res) => {
            setAllBills(res.data.bills);
          })
          .catch((error) => {
            history.push("/login");
          });
      } else {
        history.push("/login");
      }
    } else {
      history.push("/login");
    }
  }, []);

  return (
    <div>
      <Navbar page="View Bill" />
      <div className="container" style={{ paddingTop: "40px" }}>
        <h1>Unpaid Bills</h1>
        {allBills.filter((b) => b.status === "Not Paid").length < 1 ? (
          <h3>No Bills</h3>
        ) : (
          <table
            style={{ width: "100%" }}
            className="table table-hover table-striped table-warning"
          >
            <thead>
              <tr>
                <th style={{ width: "9%" }} scope="col">
                  ID
                </th>
                <th style={{ width: "9%" }} scope="col">
                  User ID
                </th>
                <th style={{ width: "9%" }} scope="col">
                  Zone
                </th>
                <th style={{ width: "9%" }} scope="col">
                  Month
                </th>
                <th style={{ width: "9%" }} scope="col">
                  Issue Date
                </th>
                <th style={{ width: "9%" }} scope="col">
                  Due Date
                </th>
                <th style={{ width: "9%" }} scope="col">
                  Units Consumed
                </th>
                <th style={{ width: "9%" }} scope="col">
                  Bill Amount
                </th>
                <th style={{ width: "9%" }} scope="col">
                  Status
                </th>
              </tr>
            </thead>
          </table>
        )}
        {allBills
          .filter((b) => b.status === "Not Paid")
          .map((bill, index) => {
            return (
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{ width: "100%" }}
                  className="table table-hover table-striped table-warning"
                >
                  <tbody>
                    <tr className="table-info">
                      <td style={{ width: "9%" }}>
                        <b>{bill._id.substring(0, 8)}</b>
                      </td>
                      <td style={{ width: "9%" }}>
                        <b>{bill.userId}</b>
                      </td>
                      <td style={{ width: "9%" }}>
                        <b>{bill.zoneName}</b>
                      </td>
                      <td style={{ width: "9%" }}>
                        <b>{bill.month}</b>
                      </td>
                      <td style={{ width: "9%" }}>
                        <b>{bill.issueDate}</b>
                      </td>
                      <td style={{ width: "9%" }}>
                        <b>{bill.dueDate}</b>
                      </td>
                      <td style={{ width: "9%" }}>
                        <b>{bill.unitsConsumed}</b>
                      </td>
                      <td style={{ width: "9%" }}>
                        <b>{bill.billAmount}</b>
                      </td>
                      <td style={{ width: "9%" }}>
                        <b>{bill.status}</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        <h1 style={{ marginTop: "20px" }}>Paid Bills</h1>
        {allBills.filter((b) => b.status === "Paid").length < 1 ? (
          <h3>No Bills</h3>
        ) : (
          <table
            style={{ width: "100%" }}
            className="table table-hover table-striped table-warning"
          >
            <thead>
              <tr>
                <th style={{ width: "9%" }} scope="col">
                  ID
                </th>
                <th style={{ width: "9%" }} scope="col">
                  User ID
                </th>
                <th style={{ width: "9%" }} scope="col">
                  Zone
                </th>
                <th style={{ width: "9%" }} scope="col">
                  Month
                </th>
                <th style={{ width: "9%" }} scope="col">
                  Issue Date
                </th>
                <th style={{ width: "9%" }} scope="col">
                  Due Date
                </th>
                <th style={{ width: "9%" }} scope="col">
                  Payment Date
                </th>
                <th style={{ width: "9%" }} scope="col">
                  Units Consumed
                </th>
                <th style={{ width: "9%" }} scope="col">
                  Bill Amount
                </th>
                <th style={{ width: "9%" }} scope="col">
                  Status
                </th>
              </tr>
            </thead>
          </table>
        )}
        {allBills
          .filter((b) => b.status === "Paid")
          .map((bill, index) => {
            return (
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{ width: "100%" }}
                  className="table table-hover table-striped table-warning"
                >
                  <tbody>
                    <tr className="table-info">
                      <td style={{ width: "9%" }}>
                        <b>{bill._id.substring(0, 8)}</b>
                      </td>
                      <td style={{ width: "9%" }}>
                        <b>{bill.userId}</b>
                      </td>
                      <td style={{ width: "9%" }}>
                        <b>{bill.zoneName}</b>
                      </td>
                      <td style={{ width: "9%" }}>
                        <b>{bill.month}</b>
                      </td>
                      <td style={{ width: "9%" }}>
                        <b>{bill.issueDate}</b>
                      </td>
                      <td style={{ width: "9%" }}>
                        <b>{bill.dueDate}</b>
                      </td>
                      <td style={{ width: "9%" }}>
                        <b>{bill.paymentDate}</b>
                      </td>
                      <td style={{ width: "9%" }}>
                        <b>{bill.unitsConsumed}</b>
                      </td>
                      <td style={{ width: "9%" }}>
                        <b>{bill.billAmount}</b>
                      </td>
                      <td style={{ width: "9%" }}>
                        <b>{bill.status}</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ViewBills;
