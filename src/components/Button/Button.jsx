import { useAuth } from "../../contexts/AuthContext";
import styles from "./Button.module.css";

const Button = ({ type, children, onClick, styleHolder }) => {
  const { email, password } = useAuth();
  const isEmpty = !email || !password;

  return (
    <div className={styleHolder}>
      <button
        className={`${styles[type]} ${
          isEmpty ? styles.disable : styles.active
        }`}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
