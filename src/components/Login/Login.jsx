import React from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";

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
            <InputField
              value={email}
              placeholder="Email address"
              type="text"
              str="email"
              onChange={(e) => handleEmailInput(e.target.value)}
              className={styles.inputField}
            />

            <InputField
              value={password}
              placeholder="Password"
              type="password"
              str="password"
              onChange={(e) => handlePasswordInput(e.target.value)}
              className={styles.inputField}
            />
          </div>

          <Button type="primaryBtn">Log In</Button>
        </form>

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </>
  );
};

export default Login;
