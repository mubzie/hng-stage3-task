import React from "react";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("1Password");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("clicked");

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("inside try block");
      console.log(user);

      navigate("/gallery");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div className={styles.heading}>HNG Stage3 Task</div>
          <div className={styles.subHeading}>Drag&Drop</div>
        </div>

        <form onSubmit={handleLogin}>
          <div className={styles.inputContainer}>
            <input
              className={styles.login}
              type="text"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              className={styles.login}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button type="submit" className={styles.formBtn}>
            Log In
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
