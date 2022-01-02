import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllUsers() {
  let history = useHistory();

  const [allUsers, setAllUsers] = useState([]);
  const [userInfo, setUserInfo] = useState({
    email: "",
    contactNo: "",
    address: "",
    zoneId: ""
  });
  const [userId, setUserId] = useState("");
  const [uId, setUId] = useState("");
  const [searchU, setSearchU] = useState(false);

  function handleChangeSearch(event) {
    setUId(event.target.value);
  }

  function getCurrentUser(id, email, contactNo, address, zoneId) {
    setUserInfo({
      email: email,
      contactNo: contactNo,
      address: address,
      zoneId: zoneId
    });
    setUserId(id);
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      if (foundUser.user.role === "admin") {
        const config = {
          headers: { Authorization: "Bearer " + foundUser.token }
        };
        axios
          .get("http://localhost:5000/user/", config)
          .then((res) => {
            setAllUsers(res.data.users);
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
    setUserInfo((preValues) => {
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

      const config = {
        headers: { Authorization: "Bearer " + foundUser.token }
      };
      console.log(userId);
      if (foundUser.user.role === "admin") {
        axios
          .patch(`http://localhost:5000/user/${userId}`, userInfo, config)
          .then((response) => {
            console.log(response.data);
            axios
              .get("http://localhost:5000/user/")
              .then((res) => {
                setAllUsers(res.data.users);
                toast.success("User information updated Successfully!", {
                  position: "top-center",
                  autoClose: 5000,
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
        setUserInfo({
          email: "",
          contactNo: "",
          address: "",
          zoneId: ""
        });
      } else {
        history.push("/login");
      }
    } else {
      history.push("/login");
    }
  }

  function searchUser(){
    setAllUsers((preValues) => {
      return allUsers.filter((user, index) => {
        return user.uId === uId;
      });
    });
    setSearchU(true);
  }

  function getAll(){
    const loggedInUser = localStorage.getItem("userData");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      if (foundUser.user.role === "admin") {
        const config = {
          headers: { Authorization: "Bearer " + foundUser.token }
        };
        axios
          .get("http://localhost:5000/user/", config)
          .then((res) => {
            setAllUsers(res.data.users);
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
    setSearchU(false);
  }

  function deleteUser(id) {
    const loggedInUser = localStorage.getItem("userData");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      const config = {
        headers: { Authorization: "Bearer " + foundUser.token }
      };
      axios
        .delete(`http://localhost:5000/user/${id}`, config)
        .then((response) => {
          console.log(response.data);
          axios
            .get("http://localhost:5000/user/")
            .then((res) => {
              setAllUsers(res.data.users);
              toast.success("User deleted Successfully!", {
                position: "top-center",
                autoClose: 5000,
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
    }
  }

  return (
    <div>
      <Navbar page="View User" />

        {!searchU ?
          <div className="form-inline float-right" style={{margin: "20px"}}>
            <input
              onChange={handleChangeSearch}
              className="form-control mr-sm-2"
              placeholder="Search User ID"
              name="uId"
              value={uId}
            />
            <button className="btn btn-dark my-2 my-sm-0" onClick={searchUser}>Search User</button>
          </div>
          :
          <div className="form-inline float-right" style={{margin: "20px"}}>
            <button className="btn btn-dark my-2 my-sm-0" onClick={getAll}>List All Users</button>
          </div>
      }
      <div style={{margin:"20px"}}>
      <div className="table-responsive">
      <table className="table table-hover bg-warning">
          <thead>
            <tr>
              <th scope="col">
                ID
              </th>
              <th scope="col">
                Name
              </th>
              <th scope="col">
                Email
              </th>
              <th scope="col">
                Contact Number
              </th>
              <th scope="col">
                Address
              </th>
              <th scope="col">
                Zone ID
              </th>
              <th scope="col">
                Action
              </th>
            </tr>
          </thead>
        {allUsers.map((user, index) => {
          return (
                <tbody>
                  <tr className="table-info">
                    <td>
                      <b>{user.uId}</b>
                    </td>
                    <td>
                      <b>{user.name}</b>
                    </td>
                    <td>
                      <b>{user.email}</b>
                    </td>
                    <td>
                      <b>{user.contactNo}</b>
                    </td>
                    <td>
                      <b>{user.address}</b>
                    </td>
                    <td>
                      <b>{user.zoneId}</b>
                    </td>
                    <td>
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
                          getCurrentUser(
                            user._id,
                            user.email,
                            user.contactNo,
                            user.address[0],
                            user.zoneId
                          );
                        }}
                      >
                        Edit
                      </button>
                      <button
                        style={{ marginLeft: "5px", marginBottom: "5px" }}
                        className="btn btn-sm btn-outline-dark"
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
          );
        })}

      </table>
      </div>
      </div>
      <div className="modal fade" id="exampleModalCenter">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update User Details</h5>
            </div>
            <div className="modal-body">
              <label>
                <b>Change Email</b>
              </label>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                className="form-control"
              />
              <label style={{ marginTop: "20px" }}>
                <b>Change Contact Number</b>
              </label>
              <input
                type="tel"
                name="contactNo"
                value={userInfo.contactNo}
                onChange={handleChange}
                className="form-control"
              />
              <label style={{ marginTop: "20px" }}>
                <b>Change Address</b>
              </label>
              <textarea
                rows="2"
                maxlength="50"
                type="tel"
                name="address"
                value={userInfo.address}
                onChange={handleChange}
                className="form-control"
              />
              <label style={{ marginTop: "20px" }}>
                <b>Change Zone</b>
              </label>
              <input
                type="number"
                name="zoneId"
                value={userInfo.zoneId}
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

export default AllUsers;
