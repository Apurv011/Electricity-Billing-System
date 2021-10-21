import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function LogInPage() {
  let history = useHistory();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  function loginUser(event) {
    axios.post("http://localhost:5000/user/login", user).then((response) => {
      console.log(response.data);
      console.log("Role " + response.data.user.role);
      localStorage.clear();
      localStorage.setItem("userData", JSON.stringify(response.data));
      if (response.data.user.role === "admin") {
        history.push("/adminHome");
      } else {
        history.push("/userHome");
      }
    });

    setUser({
      email: "",
      password: ""
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
  }

  return (
    <div className="container">
      <h1
        className="text-dark"
        style={{ fontSize: "75px", textAlign: "center", marginTop: "5rem" }}
      >
        Log In
      </h1>
      <div className="row justify-content-center">
        <div className="col-md-9 col-lg-12 col-xl-10">
          <div className="card shadow-lg o-hidden border-0 my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-flex">
                  <div
                    className="flex-grow-1 bg-login-image"
                    style={{
                      backgroundImage:
                        "url(https://st3.depositphotos.com/9881890/15397/i/600/depositphotos_153977506-stock-photo-vintage-light-bulb.jpg)"
                    }}
                  ></div>
                </div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h4 className="">Welcome Back!</h4>
                    </div>
                    <form className="user">
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
                          type="password"
                          id="examplePasswordInput"
                          placeholder="Password"
                          name="password"
                          value={user.password}
                        />
                      </div>
                      <button
                        onClick={loginUser}
                        className="btn btn-primary d-block btn-user w-100"
                        type="submit"
                      >
                        Login
                      </button>
                      <hr />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogInPage;
