import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./WelcomePage.module.css";

function WelcomePage() {
  let history = useHistory();

  function login() {
    history.push("/login");
  }

  return (
    <div className={`${styles.center}`}>
      <h1
        className="text-dark"
        style={{ textAlign: "center", fontSize: "75px" }}
      >
        Electricity Bill System
      </h1>
      <p
        className="text-dark"
        style={{ fontSize: "30px", textAlign: "center", marginTop: "35px" }}
      >
        Login Now to Pay Your Bills
      </p>
      <div onClick={login} style={{ marginTop: "50px" }} className={styles.btn}>
        Login
      </div>
    </div>
  );
}

export default WelcomePage;
