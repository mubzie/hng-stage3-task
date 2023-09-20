import React from "react";
import { useState } from "react";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div className={styles.heading}>HNG Stage3 Task</div>
          <div className={styles.subHeading}>Drag&Drop</div>
        </div>

        <form>
          <div className={styles.inputContainer}>
            <input
              className={styles.login}
              type="text"
              placeholder="Email address"
            ></input>
            <input
              className={styles.login}
              type="password"
              placeholder="Password"
            ></input>
          </div>
          <button className={styles.formBtn}>Log In</button>
        </form>
      </div>
    </>
  );
};

export default Login;
