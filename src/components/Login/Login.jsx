import React from "react";
import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../AuthContext";
import styles from "./Login.module.css";

const Login = () => {
  const { logIn } = useAuth;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await logIn(email, password); // Attempt to log in
    } catch (error) {
      console.error(error.message);
    }
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((credential) => console.log(credential))
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

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
          <button
            type="submit"
            className={styles.formBtn}
            // onClick={handleLogin}
          >
            Log In
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
