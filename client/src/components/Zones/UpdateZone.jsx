import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateZone() {
  let history = useHistory();

  const [allZones, setAllZones] = useState([]);
  const [zoneCost, setZoneCost] = useState({
    cost: ""
  });
  const [zoneId, setZoneId] = useState("");

  function getCurrentZone(id) {
    setZoneId(id);
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser.user.role);
      if (foundUser.user.role === "admin") {
        const config = {
          headers: { Authorization: "Bearer " + foundUser.token }
        };
        axios
          .get("http://localhost:5000/zone/", config)
          .then((res) => {
            setAllZones(res.data.zones);
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

  function handleChange(event) {
    const { name, value } = event.target;
    setZoneCost((preValues) => {
      return {
        ...preValues,
        [name]: value
      };
    });
  }

  function update() {
    const loggedInUser = localStorage.getItem("userData");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      if (foundUser.user.role === "admin") {
        const config = {
          headers: { Authorization: "Bearer " + foundUser.token }
        };

        axios
          .patch(`http://localhost:5000/zone/${zoneId}`, zoneCost, config)
          .then((response) => {
            console.log(response.data);
            axios
              .get("http://localhost:5000/zone/")
              .then((res) => {
                setAllZones(res.data.zones);
                toast.success("Zone updated Successfully!", {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined
                });
              })
              .catch((error) => {
                history.push("/login");
              });
          });
        setZoneCost({
          cost: ""
        });
      } else {
        history.push("/login");
      }
    } else {
      history.push("/login");
    }
  }

  return (
    <div>
      <Navbar page="Update Zone" />
      <div className="container" style={{ paddingTop: "40px" }}>
        <table
          style={{ width: "100%" }}
          className="table table-hover table-striped table-warning"
        >
          <thead>
            <tr>
              <th style={{ width: "25%" }} scope="col">
                Zone ID
              </th>
              <th style={{ width: "25%" }} scope="col">
                Zone Name
              </th>
              <th style={{ width: "25%" }} scope="col">
                Cost
              </th>
              <th style={{ width: "25%" }} scope="col">
                Action
              </th>
            </tr>
          </thead>
        </table>
        {allZones.map((zone, index) => {
          return (
            <div style={{ overflowX: "auto" }}>
              <table className="table table-hover table-striped table-warning">
                <tbody>
                  <tr className="table-info">
                    <td style={{ width: "25%" }}>
                      <b>{zone.zoneId}</b>
                    </td>
                    <td style={{ width: "25%" }}>
                      <b>{zone.zoneName}</b>
                    </td>
                    <td style={{ width: "25%" }}>
                      <b>{zone.cost}</b>
                    </td>
                    <td style={{ width: "25%" }}>
                      <button
                        style={{
                          marginLeft: "5px",
                          marginRight: "5px",
                          marginBottom: "5px"
                        }}
                        className="btn btn-sm btn-outline-dark"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                        onClick={() => {
                          getCurrentZone(zone._id);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
      <div className="modal fade" id="exampleModalCenter">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Zone</h5>
            </div>
            <div className="modal-body">
              <label>
                <b>Change Cost</b>
              </label>
              <input
                type="email"
                name="cost"
                value={zoneCost.cost}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={update}
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
      <ToastContainer />
    </div>
  );
}

export default UpdateZone;
