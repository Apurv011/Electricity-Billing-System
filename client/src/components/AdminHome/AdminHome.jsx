import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function AdminHome() {
  let history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [adminId, setAdminId] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      if (foundUser.user.role === "admin") {
        const config = {
          headers: { Authorization: "Bearer " + foundUser.token }
        };

        axios
          .get(`http://localhost:5000/user/${foundUser.user._id}`, config)
          .then((res) => {
            setName(res.data.user.name);
            setEmail(res.data.user.email);
            setContactNo(res.data.user.contactNo);
            setAddress(res.data.user.address);
            setAdminId(res.data.user.uId);
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
  }, [history]);

  return (
    <div>
      <Navbar page="Home" />
      <h1 style={{ padding: "20px", textAlign: "center" }}> Welcome, Admin </h1>
      <div className="d-flex justify-content-center ">
        <div style={{ width: "450px" }} className="card bg-light ">
          <div className="card-header">
            <h3 className="d-flex justify-content-center">Admin Details</h3>
          </div>
          <div className="card-body">
            <h5 className="card-title">
              <form>
                <div className="form-row ">
                  <div className="col" align="center">
                    <h4>
                      <label>Name</label>
                      <br />
                      <b>{name}</b>
                    </h4>
                  </div>

                  <div className="col" align="center">
                    <h4>
                      <label>Admin ID</label>
                      <br />
                      <b>{adminId}</b>
                    </h4>
                  </div>
                </div>

                <hr />
                <div className="col">
                  <h4 className="d-flex justify-content-center">
                    <label htmlFor="trainName">Email</label>
                  </h4>
                  <h3 className="d-flex justify-content-center">
                    <b>{email}</b>
                  </h3>
                </div>

                <hr />
                <div className="col">
                  <h4 className="d-flex justify-content-center">
                    <label htmlFor="trainName">Contact Number</label>
                  </h4>
                  <h3 className="d-flex justify-content-center">
                    <b>{contactNo}</b>
                  </h3>
                </div>

                <hr />
                <div className="col">
                  <h4 className="d-flex justify-content-center">
                    <label htmlFor="inputState">Address</label>
                  </h4>
                  <h3 className="d-flex justify-content-center">
                    <b>{address}</b>
                  </h3>
                </div>
              </form>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
