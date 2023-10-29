import React from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const {
    isLoading,
    email,
    password,
    error,
    handleEmailInput,
    handlePasswordInput,
    dispatch,
  } = useAuth();
  const navigate = useNavigate();

  //handle user login
  const handleUserLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "loading" });

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        dispatch({ type: "user/loggedin" });
        navigate("/gallery");
      }
    } catch (error) {
      dispatch({
        type: "error/rejected",
        error: `Error Logging in: ${error.message}`,
      });
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div className={styles.heading}>HNG Stage3 Task</div>
          <div className={styles.subHeading}>Drag&Drop</div>
        </div>

        <form onSubmit={handleUserLogin}>
          <div className={styles.inputContainer}>
            <input
              className={styles.login}
              type="text"
              id="email"
              name="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => handleEmailInput(e.target.value)}
            ></input>
            <input
              className={styles.login}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => handlePasswordInput(e.target.value)}
            ></input>
          </div>
          <button type="submit" className={styles.formBtn}>
            Log In
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </>
  );
};

export default Login;
