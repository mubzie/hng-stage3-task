import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
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

  // handle error message display
  const handleShowError = () => {
    const timer = setTimeout(() => {
      dispatch({ type: "error/clear" });
    }, 4000);

    return () => clearTimeout(timer);
  };

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
      const errorMessage = error.message;
      const removeParts = errorMessage.split("(auth/");
      const errorCode = removeParts[1].split(")")[0].replace(/-/g, " ");

      dispatch({
        type: "error/rejected",
        error: `Error Logging in: ${errorCode}`,
      });
    }

    handleShowError();
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
            />

            <InputField
              value={password}
              placeholder="Password"
              type="password"
              str="password"
              onChange={(e) => handlePasswordInput(e.target.value)}
            />
          </div>

          <Button type="primaryBtn">
            {isLoading ? <ClipLoader color="fff" size={15} /> : "Log In"}
          </Button>
        </form>

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </>
  );
};

export default Login;
