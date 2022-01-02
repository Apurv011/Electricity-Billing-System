import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import UserNavbar from "../Navbar/UserNavbar";

function PaymentHistory() {
  let history = useHistory();

  const [allBills, setAllBills] = useState([]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      if (foundUser.user.role === "user") {
        const config = {
          headers: { Authorization: "Bearer " + foundUser.token }
        };
        axios
          .get(
            `http://localhost:5000/bill/paid/user/${foundUser.user.uId}`,
            config
          )
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
      <UserNavbar page="Payment History" />
      <div className="container">
        <h1 style={{ marginTop: "20px" }}>Paid Bills</h1>
        {allBills.length < 1 ? (
          <h3>No Bills</h3>
        ) : (
          <div className="table-responsive">
          <table className="table table-hover bg-warning">
            <thead>
              <tr>
                <th scope="col">
                  ID
                </th>
                <th scope="col">
                  Zone
                </th>
                <th scope="col">
                  Month
                </th>
                <th scope="col">
                  Issue Date
                </th>
                <th scope="col">
                  Due Date
                </th>
                <th scope="col">
                  Payment Date
                </th>
                <th scope="col">
                  Units Consumed
                </th>
                <th scope="col">
                  Bill Amount
                </th>
                <th scope="col">
                  Status
                </th>
              </tr>
            </thead>
        {allBills.map((bill, index) => {
          return (
                <tbody>
                  <tr className="table-info">
                    <td>
                      <b>{bill._id.substring(0, 8)}</b>
                    </td>
                    <td>
                      <b>{bill.zoneName}</b>
                    </td>
                    <td>
                      <b>{bill.month}</b>
                    </td>
                    <td>
                      <b>{bill.issueDate}</b>
                    </td>
                    <td>
                      <b>{bill.dueDate}</b>
                    </td>
                    <td>
                      <b>{bill.paymentDate}</b>
                    </td>
                    <td>
                      <b>{bill.unitsConsumed}</b>
                    </td>
                    <td>
                      <b>{bill.billAmount}</b>
                    </td>
                    <td>
                      <b>{bill.status}</b>
                    </td>
                  </tr>
                </tbody>
          );
        })}
        </table>
      </div>
    )}
      </div>
    </div>
  );
}

export default PaymentHistory;
