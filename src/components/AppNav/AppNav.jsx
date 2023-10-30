import React from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./AppNav.module.css";

const AppNav = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  // handle sign out interaction
  const handleUserSignOut = async (e) => {
    e.preventDefault();

    try {
      await signOut(auth);
      dispatch({ type: "user/loggedout" });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.logo}>Drag&Drop</div>

      <div className={styles.btnContainer}>
        <Button type="secondaryBtn" onClick={handleUserSignOut}>
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default AppNav;
