import { useAuth } from "../../contexts/AuthContext";
import styles from "./Button.module.css";
import PropTypes from "prop-types";

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

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.element,
  onClick: PropTypes.func,
  styleHolder: PropTypes.string,
};

export default Button;
