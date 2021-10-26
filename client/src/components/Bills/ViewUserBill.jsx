import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import UserNavbar from "../Navbar/UserNavbar";
import StripeCheckout from "react-stripe-checkout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ViewUserBill() {
  let history = useHistory();

  const [allBills, setAllBills] = useState([]);
  const [billId, setBillId] = useState("");
  const [billAmt, setBillAmt] = useState(0);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      if (foundUser.user.role === "user") {
        const config = {
          headers: { Authorization: "Bearer " + foundUser.token }
        };
        axios
          .get(`http://localhost:5000/bill/user/${foundUser.user.uId}`, config)
          .then((res) => {
            if (res.data.bills.length > 0) {
              setAllBills(res.data.bills);
            } else {
              console.log("A");
            }
          })
          .catch((error) => {
            console.log("B");
            history.push("/login");
          });
      } else {
        console.log("C");
        history.push("/login");
      }
    } else {
      console.log("D");
      history.push("/login");
    }
  }, []);

  async function handleToken(token) {
    var response = await axios.post("http://localhost:5000/user/payment", {
      token,
      billAmt
    });

    if (response.data.status === "success") {
      const loggedInUser = localStorage.getItem("userData");

      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);

        const config = {
          headers: { Authorization: "Bearer " + foundUser.token }
        };
        if (foundUser.user.role === "user") {
          var future = new Date();

          let date = ("0" + future.getDate()).slice(-2);
          let month = ("0" + (future.getMonth() + 1)).slice(-2);
          let year = future.getFullYear();

          date = date + "-" + month + "-" + year;

          const status = {
            status: "Paid",
            paymentDate: date
          };
          axios
            .patch(`http://localhost:5000/bill/${billId}`, status, config)
            .then((response) => {
              console.log(response.data);
              axios
                .get(
                  `http://localhost:5000/bill/user/${foundUser.user.uId}`,
                  config
                )
                .then((res) => {
                  if (res.data.bills.length > 0) {
                    setAllBills(res.data.bills);
                  } else {
                    console.log("A");
                  }
                })
                .catch((error) => {
                  history.push("/login");
                });
            });
          setBillAmt(0);
          setBillId("");
        } else {
          history.push("/login");
        }
        toast.success("Payment Successful!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      } else {
        toast.error("Payment Failed", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      }
    }
  }

  function getCurrentBill(amt, id) {
    setBillAmt(amt);
    setBillId(id);
  }

  return (
    <div>
      <UserNavbar page="View Bill" />
      <div style={{ margin: "40px" }}>
        {allBills.filter((b) => b.status !== "Paid").length < 1 ? (
          <h1 style={{ textAlign: "center" }}>No Bills</h1>
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
                  Units Consumed
                </th>
                <th scope="col">
                  Bill Amount
                </th>
                <th scope="col">
                  Status
                </th>
                <th scope="col">
                  Action
                </th>
              </tr>
            </thead>
        {allBills.filter((b) => b.status !== "Paid").length < 1 ? (
          <h1></h1>
        ) : (
          allBills
            .filter((b) => b.status !== "Paid")
            .map((bill, index) => {
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
                          <b>{bill.unitsConsumed}</b>
                        </td>
                        <td>
                          <b>{bill.billAmount}</b>
                        </td>
                        <td>
                          <b>{bill.status}</b>
                        </td>
                        <td>
                          <button
                            style={{
                              marginLeft: "5px",
                              marginRight: "5px",
                              marginBottom: "5px"
                            }}
                            className="btn btn-sm btn-outline-success"
                            data-toggle="modal"
                            data-target="#exampleModalCenter1"
                            onClick={() =>
                              getCurrentBill(bill.billAmount, bill._id)
                            }
                          >
                            Pay
                          </button>
                        </td>
                      </tr>
                    </tbody>
              );
            })
        )}
      </table>
    </div>
  )}
      </div>
      <div className="modal fade" id="exampleModalCenter1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div style={{ textAlign: "center" }} className="modal-header">
              <h5 className="modal-title">Pay Bill</h5>
            </div>
            <div className="modal-body">
              <p>Bill Amount: {billAmt}</p>
            </div>
            <div className="modal-footer">
              <StripeCheckout
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                token={handleToken}
                billingAddress
                shippingAddress
                amount={billAmt*100}
              >
                <button
                  style={{ marginRight: "5px" }}
                  type="button"
                  className="btn btn-outline-success"
                  data-dismiss="modal"
                >
                  Pay
                </button>
              </StripeCheckout>

              <button
                style={{ marginLeft: "5px" }}
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
      <ToastContainer />
    </div>
  );
}

export default ViewUserBill;
