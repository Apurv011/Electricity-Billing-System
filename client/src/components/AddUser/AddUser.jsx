import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uniqueString from 'unique-string';

function AddUser(props) {
  let history = useHistory();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    zoneId: "",
    contactNo: "",
    address: ""
  });

  const [passGen, setPassGen] = useState(false);

  const [mail, setMail] = useState({
    to: "",
    subject: "Account Registered Successfully",
    text: ""
  });

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");
    if (!loggedInUser) {
      history.push("/login");
    }
    const foundUser = JSON.parse(loggedInUser);
    if (foundUser.user.role !== "admin") {
      history.push("/login");
    }
  });

  function registerUser(event) {
    axios.post("http://localhost:5000/user/sendMail", mail).then((response) => {
      console.log(response.data);
    });
    axios.post("http://localhost:5000/user/signup", user).then((response) => {
      history.push("/adminHome");
      toast.success("User registered Successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    });
    setUser({
      name: "",
      email: "",
      password: "",
      zoneId: "",
      contactNo: "",
      address: ""
    });
    event.preventDefault();
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((preValues) => {
      return {
        ...preValues,
        [name]: value
      };
    });
    if (name === "email") {
      setMail((preValues) => {
        return {
          ...preValues,
          to: value
        };
      });
    }
  }

  function getPassword(){
    const pass = uniqueString().substring(0,12);
    setUser((preValues) => {
      return {
        ...preValues,
        password: pass
      };
    });
    var text = `Your Account is registered Successfully
Your password is ${pass}
Login to your account and change your password.`;
    setMail((preValues) => {
      return {
        ...preValues,
        text: text
      };
    });
    setPassGen(true);
  }

  return (
    <div>
      <Navbar page="Add User" />
      <div className="container">
        <h1
          className="text-dark"
          style={{ fontSize: "65px", textAlign: "center", marginTop: "5rem" }}
        >
          Register New User
        </h1>
        <div className="card shadow-lg o-hidden border-0 my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-flex">
                <div
                  className="flex-grow-1 bg-register-image"
                  style={{
                    backgroundImage:
                      "url(https://st3.depositphotos.com/9881890/15397/i/600/depositphotos_153977506-stock-photo-vintage-light-bulb.jpg)"
                  }}
                ></div>
              </div>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h4 className="text-dark mb-4">Create an Account!</h4>
                  </div>
                  <form className="user">
                    <div className="row mb-3">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          onChange={handleChange}
                          className="form-control form-control-user"
                          type="text"
                          id="exampleFirstName"
                          placeholder="Name"
                          name="name"
                          value={user.name}
                        />
                      </div>
                      <div className="col-sm-6">
                        <input
                          onChange={handleChange}
                          className="form-control form-control-user"
                          type="tel"
                          id="exampleFirstName"
                          placeholder="Contact Number"
                          name="contactNo"
                          value={user.contactNo}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <input
                        onChange={handleChange}
                        className="form-control form-control-user"
                        type="email"
                        id="exampleFirstName"
                        placeholder="Email"
                        name="email"
                        value={user.email}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        onChange={handleChange}
                        className="form-control form-control-user"
                        type="text"
                        id="exampleFirstName"
                        placeholder="Zone ID"
                        name="zoneId"
                        value={user.zoneId}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        onChange={handleChange}
                        className="form-control form-control-user"
                        type="text"
                        id="examplePasswordInput"
                        placeholder="Address"
                        name="address"
                        value={user.address}
                      />
                    </div>
                    <div className="mb-3">
                    <span>Password</span>
                       {passGen ? <span className="ml-2"> Password Generated! </span> :
                      <button className="ml-2 btn btn-outline-dark" onClick={getPassword}>Generate Password</button>}
                    </div>
                    <button
                      onClick={registerUser}
                      className="btn btn-primary d-block btn-user w-100"
                      type="submit"
                    >
                      Register Account
                    </button>
                    <hr />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddUser;
