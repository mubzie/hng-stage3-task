import styles from "./InputField.module.css";
import PropTypes from "prop-types";

const InputField = ({ value, onChange, placeholder, str, type }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      id={str}
      name={str}
      autoComplete={str}
      className={styles.inputField}
      required
    ></input>
  );
};

InputField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  str: PropTypes.string,
  type: PropTypes.string,
};

export default InputField;
